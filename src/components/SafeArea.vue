<script setup lang="ts">
const props = defineProps<{
  top?: Boolean
  right?: Boolean
  bottom?: Boolean
  left?: Boolean
}>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
