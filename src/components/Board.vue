<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import BoardColumn from './BoardColumn.vue'

/*
const props = defineProps({
  cols: { type: Number, required: true },
  rows: { type: Number, required: true }
})
*/

const gameStore = useGameStore()

//const state = reactive({});
</script>

<template>
  <div class="board">
      <BoardColumn v-for="col in gameStore.cols" :col="col-1"/>
  </div>
</template>

<style scoped>
.board {
  max-width: 6000px;
  width: 100%;
}
</style>
