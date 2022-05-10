<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import GameBoardColumnCell from './GameBoardColumnCell.vue'

const gameStore = useGameStore()

const props = defineProps({
  columnIndex: { type: Number, required: true }
})

const color = computed(() => {
    return gameStore.whosTurn == 1 ? 'red' : 'yellow'
})

function onColumnClick() {
    if (!gameStore.gameOver) {
      gameStore.insertChecker(props.columnIndex);
    }
}

</script>

<template>
  <div class="board-column" @click="onColumnClick">
    <svg
      v-show="!gameStore.gameOver"
      class="next"
      viewBox="0 0 100 100"
    >
        <circle
          :fill="color"
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
        />
    </svg>

    <GameBoardColumnCell
      v-for="rowIndex in gameStore.dimension.rows"
      :key="rowIndex"
      :columnIndex="columnIndex"
      :rowIndex="gameStore.dimension.rows - rowIndex"
    />
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
