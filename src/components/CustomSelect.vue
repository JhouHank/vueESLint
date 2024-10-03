<template>
  <div class="custom-select" :style="{ '--visible-options': visibleOptions }">
    <div class="select-styled" @click="toggleDropdown">
      {{ selectedLabel || 'Select an option' }}
    </div>
    <ul class="select-options" :class="{ active: isOpen }">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
        :class="{ selected: option.value === modelValue }"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  defineModel,
  onMounted,
} from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  visibleOptions: {
    type: Number,
    default: 5,
  },
});

const modelValue = defineModel();
const emit = defineEmits(['change']);

const isOpen = ref(false);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(
    (option) => option.value === modelValue.value,
  );
  return selectedOption ? selectedOption.label : '';
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(value) {
  modelValue.value = value;
  isOpen.value = false;
  emit('change', value);
}

onMounted(() => {
  console.log('options:', props.options);
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 200px;
  font-family: Arial, sans-serif;
  --option-height: 36px;
}

.select-styled {
  position: relative;
  background-color: #fff;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  height: var(--option-height);
  display: flex;
  align-items: center;
}

.select-styled::after {
  content: '\25BC';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
}

.select-options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: calc(var(--visible-options) * var(--option-height));
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.select-options::-webkit-scrollbar {
  display: none;
}

.select-options.active {
  display: block;
}

.select-options li {
  padding: 10px 15px;
  cursor: pointer;
  height: var(--option-height);
  display: flex;
  align-items: center;
}

.select-options li:hover,
.select-options li.selected {
  background-color: #f0f0f0;
}
</style>
