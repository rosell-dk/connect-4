<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { useGameStore } from '../stores/GameStore.js'
import dynamics from 'dynamics.js'

import AppKeyDownEventListener from './AppKeyDownEventListener.vue'
import AppMouseDownEventListener from './AppMouseDownEventListener.vue'

const gameStore = useGameStore()

//const activeColumn = ref(Math.floor((gameStore.dimension.cols+1)/2))
const activeColumn = ref(-1)   // start outside board

const userInteractedWithPage = ref(false)  // only play sounds when user has interacted

const show = ref(true)

const columnStyle = computed(() => {
    return {'width':(100/gameStore.dimension.cols) + '%'}
})

function insertDisc(columnIndex:number):void {
  if (!gameStore.gameOver) {
    gameStore.insertDisc(columnIndex);
  }
}

/*
watch(gameStore.discs, () => {
  console.log('hello')
})*/


function onKeyDown(event:any):void {
  userInteractedWithPage.value = true;

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
    case 'ArrowUp':
      gameStore.undoLastMove();
      break
  }

  // Pressing digit drops it on the corresponding slot
  let digitTest = /^[1-9]$/;
  if (digitTest.test(event.key)) {
    let colIndex = parseInt(event.key, 10) - 1
    insertDisc(colIndex)
  }
}

// Called when a new disc enters the game
function onDiscEnter(el:any, b:any) {

  // For some reason, dynamics.js does not allow animating the cy attribute directly
  // (It results in the following error: "Cannot set property cx of #<SVGCircleElement> which has only a getter")
  // So, as a workaround, we let dynamics.js animate a reactive variable, which we watch, so
  // we can call "setAttribute" ourselves

  let animateThis = reactive({cy:0})
  watch(animateThis, (a:any) => {
    el.setAttribute('cy', a.cy)
  })

  dynamics.animate(
      animateThis,
      {
        cy: parseInt(el.getAttribute('data-cy'), 10)
      },
      {
        type: dynamics.gravity,
        duration: 700,
        bounciness:700
      }
  )

  if (userInteractedWithPage.value) {
    window.setTimeout(() => {
        var audio = new Audio('/sounds/coin-dropped.mp3');
        audio.play();
      }, 200
    )

  }
}

function onDiscLeave(el:any, b:any) {

  let animateThis = reactive({cy:parseInt(el.getAttribute('data-cy'), 10)})
  watch(animateThis, (a:any) => {
    el.setAttribute('cy', a.cy)
  })

  dynamics.animate(
      animateThis,
      {
        cy: -200
      },
      {
        type: dynamics.gravity,
        duration: 500,
        bounciness:1
      }
  )
  window.setTimeout(() => {
      var audio = new Audio('/sounds/suck.mp3');
      audio.play();
    }, 10
  )

}
</script>

<template>
  <div class="game-board">
    <div class="game-board-actual">
      <svg
        :viewBox="'0 -100 ' + (100 * gameStore.dimension.cols) + ' ' + (100 * gameStore.dimension.rows + 100)"
      >
        <!-- active column indicator -->
        <circle
          :cx="50 + 100 * activeColumn"
          :cy="-50"
          r="43"
          :fill="gameStore.whosTurn == 1 ? 'red' : 'yellow'"
          stroke="black"
          stroke-width="1"
          v-if="gameStore.gameActive"
        >
          <!--<animate
            attributeType="XML"
            attributeName="fill"
            values="#800;#f00;#800;#800"
            dur="0.8s"
            repeatCount="indefinite"
          />-->
        </circle>

        <!-- discs -->
        <!-- PS: The TransitionGroup is only used in order to get the onEnter event when a
                 disc is created - we use javascript to do the animation.
                 -->
        <TransitionGroup
          @enter="onDiscEnter"
          @leave="onDiscLeave"
          :duration="{ enter: 0, leave: 1000 }"
          appear
        >
          <circle
            v-for="disc in gameStore.discs"
            :key="disc.col*100+disc.row"
            :cx="50 + 100 * disc.col"
            cy="0"
            :data-cy="50 + 100 * (gameStore.dimension.rows - 1 - disc.row)"
            r="43"
            :fill="(disc.player == 1 ? 'red' : 'yellow')"
            stroke="black"
            stroke-width="1"
            class="disc" />
        </TransitionGroup>
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
      <div
        v-show="gameStore.gameActive"
        class="column-hover-sensor"
      >
        <div
          v-for="colIndex in gameStore.dimension.cols"
          @mouseover="activeColumn = colIndex-1"
          @click="insertDisc(colIndex-1)"
          :style="columnStyle"
          :class="(activeColumn == colIndex-1 ? 'active-column' : '')"
        />
      </div>
    </div>
    <AppKeyDownEventListener @keydown="onKeyDown"/>
    <AppMouseDownEventListener @mousedown="userInteractedWithPage = true"/>
  </div>
</template>

<style scoped lang="scss">

.v-leave-active {
  transition: opacity 5s ease;
}

.v-leave-to {
  opacity: 0;
}
/*
.v-enter-from {
  transform: translate(0,-200px);
}
.v-enter-to {
  transform: translate(0,0);
}*/

.game-board {
  max-width: 600px;
  width: 100%;

  .game-board-actual {
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
}
</style>
