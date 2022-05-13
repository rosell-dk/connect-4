<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NButton } from 'naive-ui'

import { useGameStore } from '../stores/GameStore.js'
import MuteButton from './MuteButton.vue'

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
    <MuteButton v-model="gameStore.muted" class="mute-button"/>
    <p>
      <n-button @click="onResetClick">Restart game</n-button>
    </p>
    <p>
      <n-button
        @click="onUndoClick"
        :disabled="!gameStore.canUndo">Undo last move
      </n-button>
      <br>
    </p>
  </div>
</template>

<style scoped lang="scss">
.action-bar {
  width: 160px;
  text-align: left;

  & > .mute-button {
    text-align: right;
  }
}

@media (max-width: 600px) {
  .action-bar {
    width: auto;

    & > p {
      display: inline-block;
      margin-right: 20px;
      margin-bottom: 0;
    }
  }
}
</style>
