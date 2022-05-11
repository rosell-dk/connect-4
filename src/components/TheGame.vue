<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
        <div class="board-container">
          <GameBoard />
        </div>
      </div>
      <ActionBar />
    </div>
</template>

<style scoped lang="scss">
.connect-game {
  display: flex;

  & > div:first-child {
    flex-grow: 1;
  }

  & .win-banner {
    font-size: 30px;
    font-weight: bold;
  }
}
@media (max-width: 600px) {
  .connect-game {
    flex-wrap: wrap;
  }
}

</style>
