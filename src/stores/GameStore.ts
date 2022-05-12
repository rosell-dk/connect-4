import { defineStore } from 'pinia'

interface BoardDimension {
  cols: number;
  rows: number;
}

interface Disc {
  row: number;     // the row position (0 = bottom)
  col: number;     // the column position (0 = left)
  player: number;  // the player index (1 = player 1)
}

interface GameData {
  dimension: BoardDimension;
  board: number[][];    // array of columns of rowCount of numbers
  discs: Disc[];
  whosTurn: number;
  whoWon: number;
  requiredToWin: number;
  muted: boolean;
  history: number[];    // list of all moves in the game,
                        // ie [4, 3] meaning that first coin was put in slot 4 and second in slot 3
}

export const useGameStore = defineStore('GameStore', {
  state: () => {

    let board = [];
    let colCount:number = 7;
    let rowCount:number = 6;

    for (var c=0; c<colCount; c++) {
      //board[c] = new Array(rowCount)
      board[c] = []
    }
    const data:GameData = {
      dimension: {
        cols: colCount,
        rows: rowCount
      },
      board: board,
      discs: [],
      whosTurn: 1,
      whoWon: 0,
      requiredToWin: 4,    // number of connected required to win
      muted: false,
      history: [],
    }
    return data
  },
  persist: true,
  getters: {
    canUndo: (state) => {
      return (state.history.length > 0)
    },
    gameOver: (state) => {
      return (state.whoWon > 0)
    },
    gameActive: (state) => {
      return (state.whoWon == 0)
    },

  },
  actions: {
    getCellValue(col:number, row:number):number {
      if ((col < 0) || (row < 0) || (col>this.dimension.cols -1) || (row>this.dimension.rows - 1)) {
        return -1
      }
      let val = this.board[col][row]
      if (!val) {
        return 0
      }
      return val
    },

    // return next available position in column, or -1 (if no position is available)
    getNextAvailablePosition(col:number):number {
      let row = 0;
      while (this.getCellValue(col, row) != 0) {
        row++
        if (row >= this.dimension.rows) {
          return -1
        }
      }
      return row;
    },

    toggleWhosTurn():void {
      if (this.whosTurn == 1) {
        this.whosTurn = 2
      } else {
        this.whosTurn = 1
      }
    },

    // drop disc in column. Returns true on success, false otherwise
    insertDisc(col:number):boolean {
      let row = this.getNextAvailablePosition(col)
      if (row == -1) {
        return false
      }
      this.board[col][row] = this.whosTurn
      this.discs.push({row:row, col:col, player:this.whosTurn});
      this.history.push(col)

      this.checkIfWon(col, row)
      this.toggleWhosTurn()

      return true
    },

    // remove disc from top of col
    removeDiscAtTopOfCol(col:number):boolean {
      let row = this.getNextAvailablePosition(col)
      if (row == 0) {
        return false
      }
      if (row == -1) {
        row = this.dimension.rows;
      }
      row--
      this.board[col][row] = 0
      return true
    },

    undoLastMove():void {
      if (this.history.length == 0) {
        return
      }
      this.discs.pop()
      let col:number = (this.history.pop() as number)
      this.removeDiscAtTopOfCol(col)
      this.whoWon = 0
      this.toggleWhosTurn()
    },

    // Checks if a cell is part of a wining sequence
    checkIfWon(col:number, row:number):void {
      let who = this.getCellValue(col, row)
      let me = this;

      // Return the number of connected discs in a direction
      function same(dx:number, dy:number):number {
        //console.log(dx, dy, col, row, me.getCellValue(col+dx*1, row+dy*1))
        //return 0;

        let num1:number = 1
        while (me.getCellValue(col+dx*num1, row+dy*num1) == who) {
          num1++
        }
        let num2:number = 1
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
        this.whoWon = who
      }
      /*
      this.debug.sameHorizontal = same(1, 0);
      this.debug.sameVertical = same(0, 1);
      this.debug.sameDiagonal1 = same(1, 1);
      this.debug.sameDiagonal2 = same(1, -1);*/
    }
  }
})
