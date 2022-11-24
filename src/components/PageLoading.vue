<script setup lang="ts">
const props = defineProps<{ background: string }>();
const { background } = props;
</script>

<template>
  <div w-auto h-100vh fcc :style="{ background }" />
</template>
