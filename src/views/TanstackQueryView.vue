<template>
  <div>
    <Button variant="outline" @click="refetchUserInfo">Fetch User Info</Button>
    <Button variant="outline" @click="refetchOtherInfo">
      Fetch Other Info
    </Button>
    <Button variant="outline" @click="fetchGoLangInfo">
      Fetch Golang Info
    </Button>

    <div>
      <div v-if="isFetchingUserInfo">載入中...</div>
      <div v-else-if="isErrorUserInfo">
        <p>用戶訊息錯誤：{{ errorUserInfo.message }}</p>
      </div>
      <div v-else-if="dataUserInfo">
        <div v-for="user in dataUserInfo.data.users" :key="user.id">
          <h1>{{ user.username }}</h1>
        </div>
      </div>
    </div>

    <div>
      <div v-if="isFetchingOtherInfo">載入中...</div>
      <div v-else-if="isErrorOtherInfo">
        <p>其他訊息錯誤：{{ errorOtherInfo.message }}</p>
      </div>
      <div v-else-if="dataOtherInfo">
        <p>{{ dataOtherInfo.title }}</p>
      </div>
    </div>

    <div>
      <p>{{ goMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

// 查詢用戶資訊的函數
const fetchUserInfo = async () => {
  const response = await fetch('/mock/getUserInfo');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// 查詢其他資訊的函數
const fetchOtherInfo = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const goMessage = ref('');
const fetchGoLangInfo = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/hello');
    const data = await response.json();
    goMessage.value = data.message;
  } catch (error) {
    console.error('Error fetching message:', error);
  }
};

// 使用 useQuery 來查詢用戶資訊
const {
  data: dataUserInfo,
  error: errorUserInfo,
  isFetching: isFetchingUserInfo,
  isError: isErrorUserInfo,
  refetch: refetchUserInfo,
} = useQuery({
  queryKey: ['data.users.id'],
  queryFn: fetchUserInfo,
  enabled: false, // 預設不自動執行
});

// 使用 useQuery 來查詢其他資訊
const {
  data: dataOtherInfo,
  error: errorOtherInfo,
  isFetching: isFetchingOtherInfo,
  isError: isErrorOtherInfo,
  refetch: refetchOtherInfo,
} = useQuery({
  queryKey: ['id'],
  queryFn: fetchOtherInfo,
  enabled: false, // 預設不自動執行
});
</script>

<style scoped>
/* 可以添加一些樣式來美化你的頁面 */
</style>
