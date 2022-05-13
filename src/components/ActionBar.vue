<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NButton, NSelect } from 'naive-ui'

import { useGameStore } from '../stores/GameStore.js'
import MuteButton from './MuteButton.vue'

const gameStore = useGameStore()

const colorOptions = [
  {label: 'Red', value: 'red'},
  {label: 'Yellow', value: 'yellow'},
  {label: 'Green', value: 'green'},
  {label: 'Orange', value: 'orange'},
  {label: 'Purple', value: 'purple'},
]

const inputMethods = [
  {label: 'Any', value: 0},
  {label: 'Mouse', value: 1},
  {label: 'Keyboard', value: 2},
]

function onNewGameClick() {
    let activeElement:any = document.activeElement
    activeElement.blur()  // Let go of focus
    gameStore.newGame()
}

function onUndoClick() {
    gameStore.undoLastMove();
}
</script>

<template>
  <div class="action-bar">
    <MuteButton v-model="gameStore.muted" class="mute-button"/>
    <p>
      <n-button @click="onNewGameClick">New game</n-button>
    </p>
    <p>
      <n-button
        @click="onUndoClick"
        :disabled="!gameStore.canUndo">Undo last move
      </n-button>
      <br>
    </p>
    <div v-for="(player,index) in gameStore.players" class="actionbar-players">
      <h3>Player {{ index+1 }}</h3>
      <div>
        <label>Color</label>
        <n-select v-model:value="gameStore.players[index].color" :options="colorOptions" />
      </div>
      <div>
        <label>Input</label>
        <n-select v-model:value="gameStore.players[index].inputMethod" :options="inputMethods" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.action-bar {
  width: 160px;
  text-align: left;

  & > .mute-button {
    text-align: right;
    position: absolute;
    right: 20px;
    top: 20px;
  }

  & label {
    line-height: 2;
  }

  .actionbar-players {
    & > div {
      display: flex;
      margin-bottom: 5px;

      & > label {
        width: 80px;
      }
    }
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
