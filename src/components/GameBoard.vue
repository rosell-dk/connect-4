<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import AppKeyDownEventListener from './AppKeyDownEventListener.vue'
import GameBoardColumn from './GameBoardColumn.vue'

const gameStore = useGameStore()

//const activeColumn = ref(Math.floor((gameStore.dimension.cols+1)/2))
const activeColumn = ref(-1)   // start outside board

const columnStyle = computed(() => {
    return {'width':(100/gameStore.dimension.cols) + '%'}
})

function insertDisc(columnIndex:number):void {
  if (!gameStore.gameOver) {
    gameStore.insertDisc(columnIndex);
  }
}

function onKeyDown(event:any):void {
  switch (event.key) {
    case 'ArrowLeft':
      activeColumn.value = Math.max(activeColumn.value-1, -1);  // allow out of board
      break
    case 'ArrowRight':
      activeColumn.value = Math.min(activeColumn.value+1, gameStore.dimension.cols);
      break
    case 'ArrowDown':
      if ((activeColumn.value >= 0) && (activeColumn.value < gameStore.dimension.cols)) {
        insertDisc(activeColumn.value)
      }
      break
  }

  // Pressing digit drops it on the corresponding slot
  let digitTest = /^[1-9]$/;
  if (digitTest.test(event.key)) {
    let colIndex = parseInt(event.key,0) - 1
    insertDisc(colIndex)
  }
}
</script>

<template>
  <div class="board">
      <GameBoardColumn
        v-for="columnIndex in gameStore.dimension.cols"
        :key="columnIndex"
        :active="(columnIndex-1) == activeColumn"
        :columnIndex="columnIndex-1"
        :style="columnStyle"
      />
      <AppKeyDownEventListener @keydown="onKeyDown"/>
  </div>
</template>

<style scoped lang="scss">
.board {
  max-width: 600px;
  width: 100%;
  display: flex;
}
</style>
