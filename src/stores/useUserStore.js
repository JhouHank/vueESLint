import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // State 定義
  const userInfo = ref({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 25,
  });

  const isAuthenticated = ref(false);

  // Getters 定義
  const userName = computed(() => userInfo.value.name);
  const userEmail = computed(() => userInfo.value.email);
  const userAge = computed(() => userInfo.value.age);
  const isAdult = computed(() => userInfo.value.age >= 18);

  // Actions 定義
  function login(name, email) {
    userInfo.value.name = name;
    userInfo.value.email = email;
    isAuthenticated.value = true;
  }

  function logout() {
    userInfo.value = { name: '', email: '', age: 0 };
    isAuthenticated.value = false;
  }

  function updateAge(newAge) {
    userInfo.value.age = newAge;
  }

  return {
    userInfo,
    isAuthenticated,
    userName,
    userEmail,
    userAge,
    isAdult,
    login,
    logout,
    updateAge,
  };
});
