<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/GameStore.js'

import AppKeyDownEventListener from './AppKeyDownEventListener.vue'

const gameStore = useGameStore()

//const activeColumn = ref(Math.floor((gameStore.dimension.cols+1)/2))
const activeColumn = ref(-1)   // start outside board

const columnStyle = computed(() => {
    return {'width':(100/gameStore.dimension.cols) + '%'}
})

function insertDisc(columnIndex:number):void {
  if (!gameStore.gameOver) {
    gameStore.insertDisc(columnIndex);
  }
}

function onKeyDown(event:any):void {
  switch (event.key) {
    case 'ArrowLeft':
      activeColumn.value = Math.max(activeColumn.value-1, -1);  // allow out of board
      break
    case 'ArrowRight':
      activeColumn.value = Math.min(activeColumn.value+1, gameStore.dimension.cols);
      break
    case 'ArrowDown':
      if ((activeColumn.value >= 0) && (activeColumn.value < gameStore.dimension.cols)) {
        insertDisc(activeColumn.value)
      }
      break
  }

  // Pressing digit drops it on the corresponding slot
  let digitTest = /^[1-9]$/;
  if (digitTest.test(event.key)) {
    let colIndex = parseInt(event.key,0) - 1
    insertDisc(colIndex)
  }
}

function onHover() {
  console.log('hover!')
}
</script>

<template>
  <div class="board">
      <svg
        :viewBox="'0 -100 ' + (100 * gameStore.dimension.cols) + ' ' + (100 * gameStore.dimension.rows + 100)"
      >
        <!-- active column indicator -->
        <circle
          :cx="50 + 100 * activeColumn"
          :cy="-50"
          r="40"
          :fill="gameStore.whosTurn == 1 ? 'red' : 'yellow'"
          stroke="black"
          stroke-width="1"

        />

        <!-- discs -->
        <circle
          v-for="disc in gameStore.discs"
          :cx="50 + 100 * disc.col"
          :cy="50 + 100 * (gameStore.dimension.rows - 1 - disc.row)"
          r="40"
          :fill="(disc.player == 1 ? 'red' : 'yellow')"
          stroke="black"
          stroke-width="1"
        />
        <defs>
          <mask id="wholes">
            <!-- white pixels makes visible -->
            <rect x="0" y="0" width="100%" height="100%" fill="white"  />

            <!-- black pixels makes invisible -->
            <template v-for="colIndex in gameStore.dimension.cols">
              <circle
                v-for="rowIndex in gameStore.dimension.rows"
                :cx="50 + 100 * (colIndex - 1)"
                :cy="50 + 100 * (rowIndex - 1)"
                r="40"
                fill="black"
              />
            </template>
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="blue" mask="url(#wholes)" />
        <!--
        if we want black stroke...?
        <circle
          v-for="rowIndex in gameStore.dimension.rows"
          cx="50"
          :cy="50+100*(rowIndex-1)"
          r="40"
          fill="transparent"
          stroke="black"
          stroke-width="2"
        />-->
      </svg>
      <div class="column-hover-sensor">
        <div
          v-for="colIndex in gameStore.dimension.cols"
          @mouseover="activeColumn = colIndex-1"
          @click="insertDisc(colIndex-1)"
          :style="columnStyle"
          :class="(activeColumn == colIndex-1 ? 'active-column' : '')"
        />
      </div>
      <AppKeyDownEventListener @keydown="onKeyDown"/>
  </div>
</template>

<style scoped lang="scss">
.board {
  max-width: 600px;
  width: 100%;
  position: relative;

  .board-svg {
    width: 100%;
  }

  .column-hover-sensor {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    div {
      height: 100%;
      display: inline-block;
    }
    div.active-column {
      background-color: white;
      opacity: 30%;
    }
  }
}
</style>
