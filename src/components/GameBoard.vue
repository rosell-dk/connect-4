<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import GameBoardColumn from './GameBoardColumn.vue'

const gameStore = useGameStore()

const columnStyle = computed(() => {
    return {'width':(100/gameStore.dimension.cols) + '%'}
})
</script>

<template>
  <div class="board">
      <GameBoardColumn
        v-for="columnIndex in gameStore.dimension.cols"
        :columnIndex="columnIndex-1"
        :key="columnIndex"
        :style="columnStyle"
      />
  </div>
</template>

<style scoped lang="scss">
.board {
  max-width: 600px;
  width: 100%;
  display: flex;
}
</style>
