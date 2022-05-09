import { defineStore } from 'pinia'

export const useGameStore = defineStore('GameStore', {
  state: () => {

    let board = [];
    let cols = 7;
    let rows = 6;

    for (var c=0; c<cols; c++) {
      //board[c] = new Array(rows)
      board[c] = []
    }
    return {
      cols: cols,
      rows: rows,
      board: board,
      whosTurn: 1,
      whoWon: 0,
      requiredToWin: 4,    // number of connected required to win
      history: [],
      debug: {

      }
    }
  },
  getters: {
    canUndo: (state) => {
      return (state.history.length > 0)
    },
    gameOver: (state) => {
      return (state.whoWon > 0)
    }

  },
  actions: {
    getCellValue(col, row) {
      if ((col < 0) || (row < 0) || (col>this.cols -1) || (row>this.rows - 1)) {
        return -1
      }
      let val = this.board[col][row]
      if (!val) {
        return 0
      }
      return val
    },
    // return next available position in column, or -1 (if no position is available)
    getNextAvailablePosition(col) {
      let row = 0;
      while (this.getCellValue(col, row) != 0) {
        row++
        if (row >= this.rows) {
          return -1
        }
      }
      return row;
    },

    toggleWhosTurn() {
      if (this.whosTurn == 1) {
        this.whosTurn = 2
      } else {
        this.whosTurn = 1
      }
    },

    // insert
    insertChecker(col) {
      let row = this.getNextAvailablePosition(col)
      if (row == -1) {
        return false
      }
      this.board[col][row] = this.whosTurn
      this.history.push(col)

      this.checkIfWon(col, row)
      this.toggleWhosTurn()

      return true
    },

    // remove checker from top of col
    removeCheckerAtTopOfCol(col) {
      let row = this.getNextAvailablePosition(col)
      if (row == 0) {
        return false
      }
      if (row == -1) {
        row = this.rows;
      }
      row--
      this.board[col][row] = 0
    },

    undoLastMove() {
      let col = this.history.pop()
      this.removeCheckerAtTopOfCol(col)
      this.whoWon = 0
      this.toggleWhosTurn()
    },

    // Checks if a cell is part of a wining sequence
    checkIfWon(col, row) {
      let who = this.getCellValue(col, row)
      let me = this;
      function same(dx, dy) {
        //console.log(dx, dy, col, row, me.getCellValue(col+dx*1, row+dy*1))
        //return 0;

        let num1 = 1
        while (me.getCellValue(col+dx*num1, row+dy*num1) == who) {
          num1++
        }
        let num2 = 1
        while (me.getCellValue(col-dx*num2, row-dy*num2) == who) {
          num2++
        }
        return num1 + num2 - 1
      }
      if (
        (same(1, 0) >= this.requiredToWin) ||   // checks horizontally
        (same(0, 1) >= this.requiredToWin) ||   // checks vertically
        (same(1, 1) >= this.requiredToWin) ||   // checks diagonally (45 degrees)
        (same(1, -1) >= this.requiredToWin)     // checks diagonally (-45 degrees)
      ) {
        this.whoWon = 1
      }
      this.debug.sameHorizontal = same(1, 0);
      this.debug.sameVertical = same(0, 1);
      this.debug.sameDiagonal1 = same(1, 1);
      this.debug.sameDiagonal2 = same(1, -1);
    }
  }
})
