<script setup>
  // import {ref} from 'vue';
  import {RouterLink, RouterView} from 'vue-router';
  // import HelloWorld from './components/HelloWorld.vue';
  // const a = ref('123');
</script>

<template>
  <header class="h-[85px] p-[25px] bg-blue-200">
    <p>123</p>
  </header>
  <div class="flex gap-4">
    <aside class="w-[250px] h-[calc(100vh-85px)] bg-red-200">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </aside>
    <div class="flex-1 h-[calc(100vh-85px)] overflow-auto bg-yellow-200">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
