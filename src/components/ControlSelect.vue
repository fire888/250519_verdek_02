<template>
  <label class="flex items-center gap-2">
    <span class="w-32 shrink-0">{{ label }}</span>

    <select v-model="model" class="flex-1 border rounded p-1">
      <option
        v-for="opt in options"
        :key="opt"
        :value="opt"
      >
        {{ opt }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

/** Явная типизация входных пропсов */
interface Props {
  modelValue: string
  label: string
  options: string[]
}

/* runtime-часть пропсов получаем через defineProps */
const props = defineProps<Props>()
/* чтобы обращаться к prop-ам напрямую в шаблоне,
   выносим их в отдельные ref-ы */
const { label, options } = toRefs(props)

/* объявляем событийный интерфейс для emit */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

/* &laquo;двустороннее&raquo; значение для v-model */
const model = computed<string>({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>