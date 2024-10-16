<template>
  <Input v-model="page" type="shadcn" placeholder="Email" />
  <custom-select
    v-model="selectedValue"
    :options="selectOptions"
    :visible-options="5"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useRouteQuery } from '@vueuse/router';
import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/CustomSelect.vue';

// 使用 useRouteQuery 來綁定 URL 的 query 參數
const page = useRouteQuery('page', '1', { transform: Number });

const selectedValue = ref('');
const selectOptions = ref([
  { value: 'option1', label: '選項1' },
  { value: 'option2', label: '選項2' },
  { value: 'option3', label: '選項3' },
  { value: 'option4', label: '選項4' },
  { value: 'option5', label: '選項5' },
  { value: 'option6', label: '選項6' },
  { value: 'option7', label: '選項7' },
  { value: 'option8', label: '選項8' },
  { value: 'option9', label: '選項9' },
  { value: 'option10', label: '選項10' },
]);

const handleChange = (value) => {
  console.log('選中的值：', value);
};
</script>

<style scoped>
input {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
