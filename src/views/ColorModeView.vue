<template>
  <div class="flex gap-5">
    <Button @click="toggleDark()">Toggle Dark Mode</Button>
    <Button @click="toggleTheme('theme-orange')">Toggle Orange Theme</Button>
  </div>
</template>
<script setup>
  import { Button } from '@/components/ui/button';
  import { useDark, useToggle } from '@vueuse/core';

  const isDark = useDark({ disableTransition: false });
  const toggleDark = useToggle(isDark);

  const toggleTheme = (theme) => {
    let root = document.querySelector(':root');
    const currentTheme = root.classList.contains(theme);

    root.classList.remove(theme);
    if (!currentTheme) root.classList.add(theme);
  };
</script>
<style scoped></style>
