<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import Board from './Board.vue'

const props = defineProps({
  cols: Number,
  rows: Number
})

const gameStore = useGameStore()

function onResetClick() {
    gameStore.$reset();
}

function onUndoClick() {
    gameStore.undoLastMove();
}

</script>

<template>
    <div class="connect-game">
      <div>
        <div v-if="gameStore.gameOver" class="win-banner">
          <div v-if="gameStore.whoWon == 1">
            RED WINS
          </div>
          <div v-else-if="gameStore.whoWon == 2">
            YELLOW WINS
          </div>
        </div>
        <div class="board">
            <Board />
        </div>
      </div>
      <div class="action-bar">
        <p>
          <button @click="onResetClick">Restart game</button>
        </p>
        <p>
          <button @click="onUndoClick" :disabled="!gameStore.canUndo">Undo last move</button><br>
        </p>
      </div>
    </div>
</template>

<style scoped>
    .connect-game {
      display: flex;
    }
    .board {
    }
    .action-bar {
      width: 200px;
      text-align: right;
    }
    .win-banner {
      font-size: 30px;
      font-woight: bold;
    }
    @media (max-width: 600px) {
      .connect-game {
        /*display: block;*/
        flex-wrap: wrap;
      }
      .action-bar {
        width: auto;
      }
      .action-bar > p {
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 0;
      }

    }

</style>
