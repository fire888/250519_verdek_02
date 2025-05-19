<template>
  <label class="flex items-center gap-2">
    <span class="w-32 shrink-0">{{ label }}</span>
    <input type="range"
           class="flex-1"
           v-model.number="model"
           :min="min" :max="max" :step="step" />
    <span class="w-12 text-right">{{ model }}</span>
  </label>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: Number,
    label:      String,
    min:        Number,
    max:        Number,
    step:       { type: Number, default: 1 }
  })

  const emit = defineEmits(['update:modelValue'])

  const model = computed({
    get: () => props.modelValue,
    set: v  => emit('update:modelValue', Number(v))
  })
</script>