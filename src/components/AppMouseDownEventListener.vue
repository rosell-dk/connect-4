<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['mousedown'])

function mouseDownEventListener(event:any):void {
  emit('mousedown', event);
}

onMounted(function() {
  window.addEventListener("mousedown", mouseDownEventListener)
})

onUnmounted(function() {
  window.removeEventListener("mousedown", mouseDownEventListener)
})
</script>

<template>
  <div />
</template>
