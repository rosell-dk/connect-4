<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: Boolean },
})

function onClick() {
    emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div>
    <!-- Remix of SVG's I got here:
    https://iconscout.com/icon/unmute
    https://www.svgrepo.com/svg/74628/speaker-sound-muted
    - They are open source
    -->
    <svg height="30" width="40" @click="onClick">
      <svg height="30" viewBox="0 0 300 518" x="-5">
      	<g>
      		<path d="M257.269,78.412L91.494,196.757H26.775C12.01,196.757,0,208.844,0,223.532v71.451c0,14.765,12.087,26.774,26.775,26.774
      			h64.719l165.775,118.346c12.086,8.645,21.727,3.596,21.727-11.169V89.581C279.072,74.816,269.355,69.768,257.269,78.412z"/>
          <path v-show="modelValue" d="M452.115,260.329l62.5-62.501c5.201-5.202,5.201-13.846,0-19.048l-12.623-12.623c-5.201-5.202-13.846-5.202-19.049,0
            l-62.5,62.5l-62.041-62.042c-5.201-5.202-13.846-5.202-19.049,0l-12.623,12.623c-5.201,5.202-5.201,13.847,0,19.048l62.043,62.042
            L326.73,322.37c-5.201,5.202-5.201,13.847,0,19.049l12.623,12.622c5.203,5.202,13.848,5.202,19.049,0L420.443,292l62.041,62.041
            c5.203,5.202,13.848,5.202,19.049,0l12.623-12.622c5.201-5.202,5.201-13.847,0-19.049L452.115,260.329z"/>
      	</g>
      </svg>
      <g>
        <svg v-show="!modelValue" width="30" viewBox="0 0 24 24" x="10">
          <path d="M18.718 4.222a.75.75 0 011.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 01-1.06-1.06 9.5 9.5 0 000-13.436.75.75 0 010-1.06z"/>
          <path d="M16.243 7.757a.75.75 0 10-1.061 1.061 4.5 4.5 0 010 6.364.75.75 0 001.06 1.06 6 6 0 000-8.485z"/>
        </svg>
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
</style>
