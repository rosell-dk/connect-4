<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '../stores/GameStore.js'

import { useAudioPlay } from '../composables/audioPlay.js'

import GameBoard from './GameBoard.vue'
import ActionBar from './ActionBar.vue'

const gameStore = useGameStore()
const audio = useAudioPlay()

const { gameActive } = storeToRefs(gameStore)

watch(gameActive, () => {
  if (!gameActive.value) {
    audio.play('/sounds/win.mp3')
  }
})
audio.play('/sounds/win.mp3')

</script>

<template>
    <div class="connect-game">
      <div>
        <div v-if="gameStore.gameOver" class="win-banner">
          Player {{ gameStore.whoWon }} WINS
        </div>
        <div class="board-container">
          <GameBoard />
        </div>
      </div>
      <ActionBar />
      <!--
      <audio autoplay controls>
        <source src="../assets/sounds/coin-dropped.mp3" type="audio/mpeg">
      </audio>-->

    </div>
</template>

<style scoped lang="scss">
.connect-game {
  display: flex;
  max-width: 800px;

  & > div:first-child {
    flex-grow: 1;
  }

  & .win-banner {
    font-size: 30px;
    font-weight: bold;
  }
}
@media (max-width: 600px) {
  .connect-game {
    flex-wrap: wrap;
    display: block;
  }
}

</style>
