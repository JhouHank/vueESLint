<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ a }}</h2>
    <Icon name="logo2" class="icon" />
  </div>
</template>
<script setup name="about">
  import {ref} from 'vue';

  const a = ref(777);
</script>

<style>
  .icon {
    font-size: 30px;
  }
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
