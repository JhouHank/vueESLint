<template>
  <div class="flex gap-5">
    <Button variant="outline" @click="useFetch">
      <Icon name="logo2" class="icon" />
    </Button>
    <Button variant="outline" @click="useFetchMock">Fetch mock Data</Button>
  </div>
  <div class="flex flex-col gap-5 mt-10">
    <p>Title: {{ fetchData.title }}</p>
    <p>Body: {{ fetchData.body }}</p>
    <p>MockData: {{ mockData }}</p>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { Button } from '@/components/ui/button';

  const fetchData = ref('');
  const useFetch = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data:', data);
      fetchData.value = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const mockData = ref('');
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
      mockData.value = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
</script>

<style>
  .icon {
    font-size: 30px;
  }
</style>
