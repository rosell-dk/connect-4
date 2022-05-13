<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NSlider } from 'naive-ui'

import { useGameStore } from '../stores/GameStore.js'

const gameStore = useGameStore()
</script>

<template>
  <div class="game-rules">
    <h2>Game rules</h2>

    <div>
      <label>Required connections to win:</label>
      <n-slider v-model:value="gameStore.requiredToWin" :min="1" :max="7" class="slider"/>
    </div>

  </div>
</template>

<style scoped lang="scss">
.game-rules {
  & > div {
    display: flex;
    margin-bottom: 5px;

    & > label {
      width: 220px;
    }
    & > .slider {
      max-width: 100px;
    }
  }
}

</style>
