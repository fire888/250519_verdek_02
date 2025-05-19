<script setup lang="ts">
  import { reactive } from 'vue'
  import BoxControls   from './components/BoxControls.vue'
  import ThreeCanvas   from './components/ThreeCanvas.vue'
  import { BOX_DATA } from './threeViewer/CONSTANTS/CONSTANTS'

  const boxScheme = reactive({ ...BOX_DATA })
</script>

<template>
  <BoxControls v-model="boxScheme" />
  <ThreeCanvas />
</template>
