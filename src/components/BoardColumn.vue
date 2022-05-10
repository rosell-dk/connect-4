<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import BoardCell from './BoardCell.vue'

const gameStore = useGameStore()

const props = defineProps({
  col: { type: Number, required: true }
})

const color = computed(() => {
    return gameStore.whosTurn == 1 ? 'red' : 'yellow'
})

function onColumnClick() {
    if (!gameStore.gameOver) {
      gameStore.insertChecker(props.col);
    }
}

</script>

<template>
  <div class="board-column" @click="onColumnClick">
    <svg class="next" viewBox="0 0 100 100" v-show="!gameStore.gameOver">
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" :fill="color" />
    </svg>

    <BoardCell v-for="row in gameStore.rows" :col="col" :row="gameStore.rows-row"/>
  </div>
</template>

<style scoped>
.board-column {
    display: block;
}
.board-column .next {
  visibility: hidden;
}

.board-column:hover .next {
  visibility: visible;
}
</style>
