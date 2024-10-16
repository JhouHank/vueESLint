<template>
  <header class="h-[85px] p-[25px] bg-blue-200">
    <p>123</p>
  </header>
  <div class="flex gap-4">
    <aside class="w-[250px] h-[calc(100vh-85px)] bg-red-200 dark:bg-red-600">
      <nav class="flex flex-col">
        <RouterLink to="/">Form</RouterLink>
        <RouterLink to="/fetch">Fetch</RouterLink>
        <RouterLink to="/table">Table</RouterLink>
        <RouterLink to="/table2">Table2</RouterLink>
        <RouterLink to="/table3">Table3</RouterLink>
        <RouterLink to="/skeleton">Skeleton</RouterLink>
        <RouterLink to="/dialog">Dialog</RouterLink>
        <RouterLink to="/colorMode">ColorMode</RouterLink>
        <RouterLink to="/testPinia">testPinia</RouterLink>
        <RouterLink to="/testTransition">testTransition</RouterLink>
        <RouterLink to="/tanstackQuery">tanstackQuery</RouterLink>
        <RouterLink to="/vueuse">vueuse</RouterLink>
      </nav>
    </aside>
    <div class="flex-1 h-[calc(100vh-85px)] overflow-auto p-5 bg-gray-200">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
  import { onMounted } from 'vue';

  onMounted(() => {
    console.log('import.meta.env.MODE:', import.meta.env.MODE);
    console.log('import.meta.env.BASE_URL:', import.meta.env.BASE_URL);
    console.log('import.meta.env.PROD:', import.meta.env.PROD);
    console.log('import.meta.env.DEV:', import.meta.env.DEV);
    console.log('import.meta.env.SSR:', import.meta.env.SSR);
  });
</script>
<style scoped></style>
