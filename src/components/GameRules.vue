<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NInputNumber } from 'naive-ui'

import { useGameStore } from '../stores/GameStore.js'

const gameStore = useGameStore()
</script>

<template>
  <div class="game-rules">
    <h2>Game rules</h2>

    <div>
      <label>Required connections to win:</label>
      <n-input-number v-model:value="gameStore.requiredToWin" :min="1" :max="7"  class="required-connections-input"/>
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
      line-height: 2.4;
    }
    & .required-connections-input {
      max-width: 80px;
    }
  }
}

</style>
