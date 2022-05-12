<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

/*
I considered generalizing the class with an "eventType" property.
But defineEmits cannot take dynamic properties, as it is handled at compile time (!)
I could cercumvent this by emitting a generic "windowsEvent" event instead of
the "keydown" event. - but I prefer to have a specific "keydown" event triggered

Also, code gets simpler to read when it is not generalized

const props = defineProps({
  eventType: { type: String, required: true },
})*/

const emit = defineEmits(['keydown'])

function keydownEventListener(event:any):void {
  emit('keydown', event)
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
