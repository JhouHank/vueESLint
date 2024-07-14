<template>
  <Button variant="outline" @click="useFetchMock">Fetch Data</Button>
  <Card class="w-[350px] mt-10">
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex items-center space-x-4">
        <div v-if="!mockData" class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
        <div v-else class="space-y-2">
          <p>{{ mockData.data.users[0].username }}</p>
          <p>{{ mockData.data.users[1].username }}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6"></CardFooter>
  </Card>
</template>
<script setup>
  import { ref } from 'vue';
  import { Button } from '@/components/ui/button';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';

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
