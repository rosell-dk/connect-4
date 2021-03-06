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

interface Player {
  color: string;
  inputMethod: number;    // 0=any, 1=mouse only, 2=keyboard only
}

interface GameData {
  api: number;
  dimension: BoardDimension;
  board: number[][];    // array of columns of rowCount of numbers
  discs: Disc[];
  whosTurn: number;
  whoWon: number;
  gameActive: boolean;
  requiredToWin: number;
  muted: boolean;
  history: number[];    // list of all moves in the game,
                        // ie [4, 3] meaning that first coin was put in slot 4 and second in slot 3
  players: Player[];
}

export const useGameStore = defineStore('GameStore', {
  state: () => {

    let board = [];
    let colCount:number = 7;
    let rowCount:number = 6;

    for (let c=0; c<colCount; c++) {
      //board[c] = new Array(rowCount)
      board[c] = []
    }
    const data:GameData = {
      api: 1,
      dimension: {
        cols: colCount,
        rows: rowCount
      },
      board: board,
      discs: [],
      whosTurn: 1,        // beware: this is 1-indexed (TODO: change to zero-index)
      whoWon: 0,
      gameActive: true,
      requiredToWin: 4,    // number of connected required to win
      muted: false,
      history: [],
      players: [
        {color: 'red', inputMethod: 0},
        {color: 'yellow', inputMethod: 0}
      ],
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
  },
  actions: {
    // Note: zero-based
    getPlayerColor(playerIndex:number) {
      if (playerIndex >= this.players.length) {
        return '#999'
      }
      return this.players[playerIndex].color
    },
    getCurrentPlayerColor() {
      return this.getPlayerColor(this.whosTurn - 1)
    },
    getDiscColor(disc:Disc) {
      return this.getPlayerColor(disc.player - 1)
    },

    getInputMethod(playerIndex:number) {
      if (playerIndex >= this.players.length) {
        return 0
      }
      return this.players[playerIndex].inputMethod
    },
    getCurrentInputMethod() {
      return this.getInputMethod(this.whosTurn - 1)
    },
    isKeyboardAllowdForCurrentPlayer() {
      return (this.getCurrentInputMethod() != 1)
    },
    isMouseAllowdForCurrentPlayer() {
      return (this.getCurrentInputMethod() != 2)
    },

    clearBoard() {
      let newBoard = []
      for (let col=0; col<this.dimension.cols; col++) {
        newBoard[col] = []
      }
      this.board = newBoard
      this.discs = []
      this.whosTurn = 1
      this.whoWon = 0
      this.gameActive = true
      this.history = []
    },
    newGame() {
      this.clearBoard();
      //this.$reset();
    },
    addPlayer() {
      this.players.push(
        {color: 'green', inputMethod: 0}
      )
    },
    removePlayer() {
      this.players.pop()
      if (this.whosTurn > this.players.length) {
        this.whosTurn = 1
      }
    },
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
      if (this.whosTurn >= this.players.length) {
        this.whosTurn = 1
      } else {
        this.whosTurn++
      }
      return true
    },

    // remove disc from top of col (only in board)
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
      this.gameActive = true
      if (this.whosTurn == 1) {
        this.whosTurn = this.players.length
      } else {
        this.whosTurn--
      }
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
        this.gameActive = false
      }
      /*
      this.debug.sameHorizontal = same(1, 0);
      this.debug.sameVertical = same(0, 1);
      this.debug.sameDiagonal1 = same(1, 1);
      this.debug.sameDiagonal2 = same(1, -1);*/
    }
  }
})
