import { ref, onMounted, onUnmounted } from 'vue'

// For registering if user has interacted with the page
// Can for example be used before trying to play sounds
export function useInteractedWithPage() {

  const userInteractedWithPage = ref(false)

  function onPageInteraction(event: any) {
    userInteractedWithPage.value = true
  }

  onMounted(() => {
    window.addEventListener('mousemove', onPageInteraction)
    window.addEventListener('mousedown', onPageInteraction)
    window.addEventListener('keydown', onPageInteraction)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onPageInteraction)
    window.removeEventListener('mousedown', onPageInteraction)
    window.removeEventListener('keydown', onPageInteraction)
  })

  return userInteractedWithPage
}
