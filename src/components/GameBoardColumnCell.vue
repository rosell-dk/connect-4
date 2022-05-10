<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

const props = defineProps({
  col: { type: Number, required: true },
  row: { type: Number, required: true }
})

const gameStore = useGameStore()

const cellColor = computed(() => {
    return ['white', 'red', 'yellow'][gameStore.getCellValue(props.col, props.row)];
})
</script>

<template>
    <div>
        <svg
          class="board-cell"
          viewBox="0 0 100 100"
        >
            <rect
              width="100"
              height="100"
              fill="blue"
            />
            <circle
              :fill="cellColor"
              cx="50"
              cy="50"
              r="40"
              stroke="black"
              stroke-width="3"
            />
        </svg>
    </div>
</template>

<style scoped>
.board-cell {
    /*width: 70px;
    height: 70px;*/
    width: 100%;
    display: block;
}
</style>
