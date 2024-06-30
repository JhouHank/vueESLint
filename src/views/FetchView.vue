<template>
  <div class="about">
    <Button variant="outline" @click="useFetch">
      <Icon name="logo2" class="icon" />
    </Button>
    <p>Title: {{ fetchData.title }}</p>
    <p>Body: {{ fetchData.body }}</p>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { Button } from '@/components/ui/button';

  const fetchData = ref('');

  onMounted(() => {
    console.log(123);
    console.log(' import.meta.env.MODE: ', import.meta.env.MODE);
    console.log(' import.meta.env.BASE_URL: ', import.meta.env.BASE_URL);
    console.log(' import.meta.env.PROD: ', import.meta.env.PROD);
    console.log(' import.meta.env.DEV: ', import.meta.env.DEV);
    console.log(' import.meta.env.SSR: ', import.meta.env.SSR);
  });

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
</script>

<style>
  .icon {
    font-size: 30px;
  }
</style>
