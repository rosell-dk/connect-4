import { useInteractedWithPage } from './interactedWithPage.js'
import { useGameStore } from '../stores/GameStore.js'

export function useAudioPlay() {

  const userInteractedWithPage = useInteractedWithPage()    // only play sounds when user has interacted
  const gameStore = useGameStore()

  function play(src:string) {
    if (userInteractedWithPage.value && !gameStore.muted) {
      var audio = new Audio(src);
      audio.play();
    }
  }

  function playAfterTimeout(src:string, timeout:number) {
    window.setTimeout(() => {
      play(src)
    }, timeout)
  }

  return {play: play, playAfterTimeout:playAfterTimeout}
}
