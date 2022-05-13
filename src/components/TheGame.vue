<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '../stores/GameStore.js'

import { useAudioPlay } from '../composables/audioPlay.js'

import GameBoard from './GameBoard.vue'
import ActionBar from './ActionBar.vue'
import GameRules from './GameRules.vue'

const gameStore = useGameStore()
const audio = useAudioPlay()

const { gameActive } = storeToRefs(gameStore)

watch(gameActive, () => {
  if (!gameActive.value) {
    audio.play('sounds/win.mp3')
  }
})

</script>

<template>
  <div class="connect-game">
    <div class="main">
      <div class="left-pane">
        <div v-if="gameStore.gameOver" class="win-banner">
          Player {{ gameStore.whoWon }} WINS
        </div>
        <div class="board-container">
          <GameBoard />
        </div>
      </div>
      <ActionBar />
    </div>
    <GameRules />
  </div>
</template>

<style scoped lang="scss">
.connect-game {
  padding: 30px;

  & > .main {
    display: flex;
    max-width: 800px;

    @media (max-width: 600px) {
      display: block;
    }

    .left-pane {
      flex-grow: 1;
      position: relative;

      & .win-banner {
        font-size: 30px;
        font-weight: bold;
        max-width: 600px;
        position: absolute;
        width: 100%;
        text-align: center;
      }
      & .board-container {
        padding-right: 50px;

        @media (max-width: 600px) {
          padding-right: 0px;
        }
      }
    }
  }

}

</style>
