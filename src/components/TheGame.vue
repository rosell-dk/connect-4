<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import GameBoard from './GameBoard.vue'
import ActionBar from './ActionBar.vue'

const gameStore = useGameStore()
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
            <GameBoard />
        </div>
      </div>
      <ActionBar />
    </div>
</template>

<style scoped>
.connect-game {
  display: flex;
}
.board {
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
}

</style>
