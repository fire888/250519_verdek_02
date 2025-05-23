<template>
  <section class="controls">
    <fieldset class="border p-3 rounded-lg">
      <ControlSelect v-model="storeBoxes.currentBox"
                     label="Номер шкафа"
                     :options="['0', '1', '2', '3', '4']"
                     />                   
    </fieldset>

    <fieldset class="border p-3 rounded-lg">
      <legend class="font-semibold mb-2">Размеры коробки</legend>

      <ControlSlider v-model="storeBoxes.boxes[+storeBoxes.currentBox].w"
                     label="Ширина (w)"
                     :min="100"
                     :max="1000"/>

      <ControlSlider v-model="storeBoxes.boxes[+storeBoxes.currentBox].d"
                     label="Высота (h)"
                     :min="100"
                     :max="1000"/>

      <ControlSlider v-model="storeBoxes.boxes[+storeBoxes.currentBox].doorRotation"
                     label="Открытие двери ()"
                     :min="0"
                     :max="170"/>
    </fieldset>

    <!-- Боковая фаска S -->
    <fieldset class="border p-3 rounded-lg">
      <legend class="font-semibold mb-2">Боковая фаска&nbsp;(S)</legend>

      <ControlSlider v-model="storeBoxes.boxes[+storeBoxes.currentBox].h"
                     label="Толщина (d)"
                     :min="20"
                     :max="40"/>

      <ControlSelect v-model="storeBoxes.boxes[+storeBoxes.currentBox].facetS.type"
                     label="Тип"
                     :options="['FACET11','FACET12','FACET13']"/>
    </fieldset>

    <!-- Верхняя фаска T -->
    <fieldset class="border p-3 rounded-lg">
      <legend class="font-semibold mb-2">Внутренняя фаска&nbsp;(T)</legend>

      <ControlSlider v-model="storeBoxes.boxes[+storeBoxes.currentBox].facetT.offsetX"
                     label="Смещение&nbsp;X"
                     :min="0"
                     :max="200"/>

      <ControlSlider v-model="storeBoxes.boxes[+storeBoxes.currentBox].facetT.offsetZ"
                     label="Смещение&nbsp;Z"
                     :min="0"
                     :max="200"/>

      <ControlSelect v-model="storeBoxes.boxes[+storeBoxes.currentBox].facetT.type"
                     label="Тип"
                     :options="['FACET22','FACET33']"/>
    </fieldset>

    <!-- Внутренние фаски -->
    <fieldset class="border p-3 rounded-lg">
      <legend class="font-semibold mb-2">Фаски зеркала</legend>

      <ControlNumber v-model="storeBoxes.boxes[+storeBoxes.currentBox].facetInner.count"
                     label="Количество"
                     :min="0" :max="3" :step="1"/>

      <ControlSelect v-model="storeBoxes.boxes[+storeBoxes.currentBox].facetInner.rotationY"
                     label="Поворот&nbsp;Y"
                     :options="['0', '90']"/>
    </fieldset>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import ControlSlider from './ControlSlider.vue'
import ControlSelect from './ControlSelect.vue'
import ControlNumber from './ControlNumber.vue'
import { storeBoxes } from '../store/store'
import { changeParams } from '../threeViewer/threeViewer'

watch(
  storeBoxes, 
  () => {
    changeParams(+storeBoxes.currentBox, storeBoxes.boxes[+storeBoxes.currentBox])
  }, 
  { deep: true, immediate: true }
)
</script>

<style scoped>
.controls {
  font-size: 16px;
  width: 200px;
  position: absolute;
  z-index: 100;
  top: 0;
  display: block;
  margin: 0;
  padding: 0;
  background-color: rgb(255, 255, 255);
}

fieldset {
  display: flex;
  flex-direction: column;
}  
</style>