<template>
  <div ref="threeWrapper" />
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { createThreeViewer, changeParams, IDataBox } from '../threeViewer/threeViewer'

  const threeWrapper = ref<HTMLElement | null>(null)
  let cleanup: (() => void) | null = null

  onMounted(() => {
    if (threeWrapper.value) {
      const { deattachThreeCanvas } = createThreeViewer(threeWrapper.value)
      cleanup = deattachThreeCanvas
    }
  })

  onBeforeUnmount(() => cleanup?.())
</script>