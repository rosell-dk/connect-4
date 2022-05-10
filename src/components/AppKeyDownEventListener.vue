<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

/*
const props = defineProps({
  eventType: { type: String, required: true },
})*/

const emit = defineEmits(['keydown'])

function keydownEventListener(event:any):void {
  emit('keydown', event);
}

onMounted(function() {
  window.addEventListener("keydown", keydownEventListener)
})

onUnmounted(function() {
  window.removeEventListener("keydown", keydownEventListener)
})

</script>

<template>
  <div />
</template>

<style scoped lang="scss">
</style>
