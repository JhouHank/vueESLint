<template>
  <div class="flex gap-5">
    <Button variant="outline" @click="fetchAPI">
      <Icon name="logo2" class="icon" />
      <span v-if="isLoadingFetch">Loading...</span>
    </Button>
    <Button variant="outline" @click="fetchMockAPI">
      Fetch mock Data
      <span v-if="isLoadingMock">Loading...</span>
    </Button>
    <Button variant="outline" @click="useFetchMock">
      Fetch mock Data2
      <span v-if="isLoadingMock">Loading...</span>
    </Button>
    <Button variant="outline" @click="fetchErrorAPI">
      Fetch Error API
      <span v-if="isLoadingError">Loading...</span>
    </Button>
  </div>
  <div class="flex flex-col gap-5 mt-10">
    <p v-if="fetchData">Title: {{ fetchData.title }}</p>
    <p v-if="fetchData">Body: {{ fetchData.body }}</p>
    <p v-if="mockData">MockData: {{ mockData }}</p>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import apiCaller from '@/lib/apiCaller';

// 使用 apiCaller 封裝的功能
const {
  isLoading: isLoadingFetch,
  results: fetchData,
  makeAPICall: fetchAPI,
} = apiCaller(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

// 有使用apiCaller
const {
  isLoading: isLoadingMock,
  results: mockData,
  makeAPICall: fetchMockAPI,
} = apiCaller(async () => {
  const response = await fetch('/mock/getUserInfo', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  console.log('data:', data);
  return data;
});

// 沒有使用apiCaller
const mockData2 = ref('');
const useFetchMock = async () => {
  try {
    const response = await fetch('/mock/getUserInfo', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('data:', data);
    mockData2.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const errorMessage = ref('');
const { isLoading: isLoadingError, makeAPICall: fetchErrorAPI } = apiCaller(
  async () => {
    const response = await fetch('/mock/errorAPI', {
      method: 'GET',
    });
    console.log('response:', response);
    errorMessage.value = response.message;

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    if (result.status === 'error') {
      throw new Error(result.message || 'Something went wrong');
    }
    return result;
  },
);

// fetchErrorAPI().catch((error) => {
//   errorMessage.value = error.message;
// });
</script>

<style>
.icon {
  font-size: 30px;
}
.text-red-500 {
  color: red;
}
</style>
