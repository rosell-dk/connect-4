<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import GameBoardColumn from './GameBoardColumn.vue'

/*
const props = defineProps({
  cols: { type: Number, required: true },
  rows: { type: Number, required: true }
})
*/

const gameStore = useGameStore()

const columnStyle = computed(() => {
    return {'width':(100/gameStore.cols) + '%'}
})

//const state = reactive({});
</script>

<template>
  <div class="board">
      <GameBoardColumn
        v-for="col in gameStore.cols"
        :col="col-1"
        :key="col"
        :style="columnStyle"
      />
  </div>
</template>

<style scoped>
.board {
  max-width: 600px;
  width: 100%;
  display: flex;

}
</style>
