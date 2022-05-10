<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import GameBoard from './GameBoard.vue'
import ActionBar from './ActionBar.vue'

const gameStore = useGameStore()

function insertDisc(columnIndex:number):void {
  if (!gameStore.gameOver) {
    gameStore.insertDisc(columnIndex);
  }
}

function keydownEventListener(ev:any):void {
  let digitTest = /^[1-9]$/;
  if (digitTest.test(ev.key)) {
    let colIndex = parseInt(ev.key,0) - 1
    insertDisc(colIndex)
  }
}

onMounted(function() {
  window.addEventListener("keydown", keydownEventListener)
})

onUnmounted(function() {
  window.removeEventListener("keydown", keydownEventListener)
})


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

<style scoped lang="scss">
.connect-game {
  display: flex;

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
