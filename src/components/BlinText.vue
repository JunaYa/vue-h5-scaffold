<script setup lang="ts">
const props = defineProps({
  starColor: {
    type: String,
    default: 'rgb(103, 58, 183)',
  },
})
let index = 0
const interval = 1000
const starRef = ref([])

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const animate = (star: HTMLElement) => {
  star.style.setProperty('--star-left', `${rand(-10, 100)}%`)
  star.style.setProperty('--star-top', `${rand(-40, 80)}%`)

  star.style.animation = 'none'
  // eslint-disable-next-line no-unused-expressions
  star.offsetHeight
  star.style.animation = ''
}

const run = () => {
  if (starRef.value.length) {
    for (const star of starRef.value) {
      setTimeout(() => {
        animate(star)

        setInterval(() => animate(star), 1000)
      }, index++ * (interval / 5))
    }
  }
}

onMounted(() => {
  run()
})
</script>

<template>
  <div class="wrapper">
    <span class="magic">
      <span v-for="i in 3" :key="i" ref="starRef" class="magic-star">
        <svg viewBox="0 0 512 512">
          <path :fill="props.starColor" d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
        </svg>
      </span>
      <span class="magic-text"><slot /></span>
    </span>
  </div>
</template>

<style scoped>
@keyframes background-pan {
  from {
    background-position: 0% center;
  }

  to {
    background-position: -200% center;
  }
}

@keyframes scale {
  from, to {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

.wrapper {
  color: white;
  /* font-size: clamp(2em, 2vw, 4em); */
  /* font-weight: 400; */
  margin: 0;
  padding: 0;
  text-align: center;
}

.magic {
  display: inline-block;
  position: relative;
}

.magic-star {
  --size: clamp(.8em, 1.5vw, .8em);

  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

.magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}

.magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(
    to right,
    rgb(123, 31, 162),
    rgb(103, 58, 183),
    rgb(244, 143, 177),
    rgb(123, 31, 162)
  );
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}
</style>
