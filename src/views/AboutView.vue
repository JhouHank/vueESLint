<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ a }}</h2>
    <h3>{{ iconUrl }}</h3>
    <IconComponent />
  </div>
</template>
<script setup name="about">
  import {ref} from 'vue';
  import iconUrl from '../assets/logo2.svg?url';
  // import iconRaw from '../assets/logo2.svg?raw';
  import IconComponent from '../assets/logo2.svg?component';

  const a = ref(0);
</script>

<style>
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
