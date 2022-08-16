<script setup lang="ts">
import { useScroll } from '@vueuse/core'
const el = ref<HTMLElement | null>(null)
const { x, y, arrivedState } = useScroll(el)
const { left, right, top, bottom } = toRefs(arrivedState)
watch([left, right, top, bottom], ([isLeft, isRight, isTop, isBottom]) => {
  const options = { x: x.value, y: y.value }

  if (isLeft)
    track('scroll-left', options)
  if (isRight)
    track('scroll-right', options)
  if (isTop)
    track('scroll-top', options)
  if (isBottom)
    track('scroll-bottom', options)
})
</script>

<template>
  <div ref="el" max-h100vh min-h100vh ml-auto mr-auto bg-scroll overflow-scroll>
    <slot />
  </div>
</template>
