<template>
  <div>
    <h1>User Profile</h1>
    <p>
      <strong>Name:</strong>
      {{ userName }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ userEmail }}
    </p>
    <p>
      <strong>Age:</strong>
      {{ userAge }}
    </p>
    <p>
      <strong>Is Adult:</strong>
      {{ isAdult ? 'Yes' : 'No' }}
    </p>

    <div v-if="!isAuthenticated">
      <h3>Login</h3>
      <input v-model="inputName" placeholder="Name" />
      <input v-model="inputEmail" placeholder="Email" />
      <Button @click="login">Login</Button>
    </div>

    <div v-else>
      <Button @click="logout">Logout</Button>
    </div>

    <div v-if="isAuthenticated">
      <h3>Update Age</h3>
      <input v-model.number="inputAge" type="number" placeholder="Age" />
      <Button @click="updateAge">Update Age</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore.js';

// 使用 Pinia Store
const userStore = useUserStore();

// 本地狀態，用於處理輸入
const inputName = ref('');
const inputEmail = ref('');
const inputAge = ref(userStore.userAge);

// 將 Store 中的值綁定到組件
const userName = userStore.userName;
const userEmail = userStore.userEmail;
const userAge = userStore.userAge;
const isAdult = userStore.isAdult;
const isAuthenticated = userStore.isAuthenticated;

// 登錄操作
function login() {
  userStore.login(inputName.value, inputEmail.value);
}

// 登出操作
function logout() {
  userStore.logout();
}

// 更新年齡
function updateAge() {
  userStore.updateAge(inputAge.value);
}
</script>

<style scoped>
/* 一些基本的樣式 */
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin: 5px 0;
}

input {
  margin: 5px 0;
  padding: 5px;
  font-size: 16px;
}

button {
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
