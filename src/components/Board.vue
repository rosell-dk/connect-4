<script setup>
import { ref, reactive } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import BoardColumn from './BoardColumn.vue'

const props = defineProps({
  cols: Number,
  rows: Number
})

const gameStore = useGameStore()

//const state = reactive({});
</script>

<template>
  <div class="board">
      <BoardColumn v-for="col in gameStore.cols" :col="col-1"/>
  </div>
</template>

<style scoped>
</style>
