<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#${props.name}`" />
  </svg>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
