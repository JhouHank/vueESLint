<template>
  <div class="flex gap-5">
    <Button variant="outline" @click="fetchMockAPI">
      <span v-if="!isLoadingMock">Fetch mock Data(有使用apiCaller)</span>
      <Loader2 v-else class="w-4 h-4 animate-spin" />
    </Button>
    <Button variant="outline" @click="getMockUserInfoOrigin">
      <span v-if="!isLoading">Fetch mock Data(無使用apiCaller)</span>
      <Loader2 v-else class="w-4 h-4 animate-spin" />
    </Button>
    <Button variant="outline" @click="fetchErrorAPI">
      <span v-if="!isLoadingError">Fetch error Data</span>
      <Loader2 v-else class="w-4 h-4 animate-spin" />
    </Button>
  </div>
  <div class="flex flex-col gap-5 mt-10">
    <p v-if="mockData">MockData: {{ mockData }}</p>
    <p v-if="mockDataOrigin">mockDataOrigin: {{ mockDataOrigin }}</p>
    <p v-if="errorData">errorData: {{ errorData }}</p>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import apiCaller from '@/lib/apiCaller';
import { getMockUserInfo, getErrorAPI } from '@/api/basic';
import { ref } from 'vue';
import { Loader2 } from 'lucide-vue-next';

const {
  isLoading: isLoadingMock,
  results: mockData,
  makeAPICall: fetchMockAPI,
} = apiCaller(getMockUserInfo);

const {
  isLoading: isLoadingError,
  results: errorData,
  makeAPICall: fetchErrorAPI,
} = apiCaller(getErrorAPI);

const mockDataOrigin = ref(null);
const isLoading = ref(false);
const getMockUserInfoOrigin = async () => {
  try {
    isLoading.value = true;
    const response = await getMockUserInfo();
    mockDataOrigin.value = response;
  } catch (error) {
    console.log('getMockUserInfo的error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.icon {
  font-size: 30px;
}
.text-red-500 {
  color: red;
}
</style>
