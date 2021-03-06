<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NButton, NSelect, NSlider, NSpace } from 'naive-ui'

import { useGameStore } from '../stores/GameStore.js'
import MuteButton from './MuteButton.vue'

const gameStore = useGameStore()

const colorOptions = [
  {label: 'Red', value: 'red'},
  {label: 'Yellow', value: 'yellow'},
  {label: 'Green', value: 'green'},
  {label: 'Orange', value: 'orange'},
  {label: 'Purple', value: 'purple'},
  {label: 'White!', value: 'white'},
]

const inputMethods = [
  {label: 'Any', value: 0},
  {label: 'Mouse', value: 1},
  {label: 'Keyboard', value: 2},
]

function releaseFocus() {
  let activeElement:any = document.activeElement
  activeElement.blur()
}

function onNewGameClick() {
  releaseFocus()
  gameStore.newGame()
}

function onUndoClick() {
  releaseFocus()
  gameStore.undoLastMove()
}

function onAddPlayerClick() {
  releaseFocus()
  gameStore.addPlayer()
}

function onRemovePlayerClick() {
  releaseFocus()
  gameStore.removePlayer()
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
    <br>
    <n-space vertical>
      <n-button @click="onAddPlayerClick">Add player</n-button>
      <n-button @click="onRemovePlayerClick">Remove player</n-button>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.action-bar {
  width: 240px;
  text-align: left;
  position: relative;

  @media (max-width: 600px) {
    width: auto;
  }

  p {
    margin-top: 0;
  }
  & > .mute-button {
    text-align: right;
    position: absolute;
    right: 0px;
    top: 0px;
  }

  & label {
    line-height: 2.4;
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
</style>
