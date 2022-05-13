import { ref, onMounted, onUnmounted } from 'vue'

// For registering if user has interacted with the page
export function useInteractedWithPage() {

  const userInteractedWithPage = ref(false)

  function onPageInteraction(event: any) {
    userInteractedWithPage.value = true

    // We got an interaction and we can stop listening
    removeListeners()
  }

  function addListeners() {
    window.addEventListener('mousemove', onPageInteraction)
    window.addEventListener('mousedown', onPageInteraction)
    window.addEventListener('keydown', onPageInteraction)
  }

  function removeListeners() {
    window.removeEventListener('mousemove', onPageInteraction)
    window.removeEventListener('mousedown', onPageInteraction)
    window.removeEventListener('keydown', onPageInteraction)
  }

  onMounted(addListeners)
  onUnmounted(removeListeners)

  return userInteractedWithPage
}
