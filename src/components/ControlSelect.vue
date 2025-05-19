<template>
  <label class="flex items-center gap-2">
    <span class="w-32 shrink-0">{{ label }}</span>
    <select v-model="model" class="flex-1 border rounded p-1">
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: String,
    label:      String,
    options:    Array
  })

  const emit = defineEmits(['update:modelValue'])

  const model = computed({
    get: () => props.modelValue,
    set: v  => { emit('update:modelValue', v as string) 
      console.log('HHHkkk', v)
    }
  })
</script>