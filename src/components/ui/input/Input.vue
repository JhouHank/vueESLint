<script setup>
// import { useFormField } from '@/components/ui/form/useFormField';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';

const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
});

const emits = defineEmits(['update:modelValue']);

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

// const { error } = useFormField();
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        `flex h-10 w-full rounded-md border border-input bg-background 
        px-3 py-2 text-sm ring-offset-background 
        file:border-0 file:bg-transparent file:text-sm file:font-medium 
        placeholder:text-muted-foreground 
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50`,
        // error && 'focus-visible:ring-red-500',
        // error && 'border-red-500',
        props.class,
      )
    "
  />
</template>
