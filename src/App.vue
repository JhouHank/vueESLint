<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="h-[85px] p-[25px] bg-blue-200">
    <p>123</p>
  </header>
  <div class="flex gap-4">
    <aside class="w-[250px] h-[calc(100vh-85px)] bg-red-200">
      <nav class="flex flex-col">
        <RouterLink to="/">Form</RouterLink>
        <RouterLink to="/fetch">Fetch</RouterLink>
        <RouterLink to="/table">Table</RouterLink>
        <RouterLink to="/table2">Table2</RouterLink>
      </nav>
    </aside>
    <div class="flex-1 h-[calc(100vh-85px)] overflow-auto p-5 bg-gray-200">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
