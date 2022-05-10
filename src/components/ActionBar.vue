<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

const gameStore = useGameStore()

function onResetClick() {
    gameStore.$reset();
}

function onUndoClick() {
    gameStore.undoLastMove();
}
</script>

<template>
  <div class="action-bar">
    <p>
      <button @click="onResetClick">Restart game</button>
    </p>
    <p>
      <button @click="onUndoClick" :disabled="!gameStore.canUndo">Undo last move</button><br>
    </p>
  </div>
</template>

<style scoped>
.action-bar {
  width: 200px;
  text-align: right;
}
@media (max-width: 600px) {
  .action-bar {
    width: auto;
  }
  .action-bar > p {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 0;
  }
}
</style>
