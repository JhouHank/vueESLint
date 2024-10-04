<template>
  <div>
    <Button class="mb-3" @click="isShow = !isShow">toggle</Button>

    <RadioGroup v-model="mode" class="mb-3" default-value="in-out">
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="option-one" value="in-out" />
        <Label for="option-one">in-out</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="option-two" value="out-in" />
        <Label for="option-two">out-in</Label>
      </div>
    </RadioGroup>

    <div>
      <transition name="fade" :mode="mode">
        <div v-if="isShow" class="block">Block 1</div>
        <div v-else class="block block-2">Block 2</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
  import { Button } from '@/components/ui/button';
  import { Label } from '@/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
  import { ref } from 'vue';

  const mode = ref('in-out');
  const isShow = ref(false);
</script>

<style scoped>
  .block {
    display: block;
    width: 150px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    background-color: #0f0;
  }
  .block-2 {
    background-color: #00f;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.75s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
</style>
