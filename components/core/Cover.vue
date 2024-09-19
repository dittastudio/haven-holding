<script lang="ts" setup>
// import { wait } from '@/utilities/helpers'

// const coverVisible = ref(true)
// const logoVisible = ref(false)

// const isCoverFinished = useState('isCoverFinished')

// const currentBackgroundClass = ref<string>('')
// if (import.meta.server) {

// const randomiseBackgroundClass = () => {

//   return newClass
// }

// const newClass = randomiseBackgroundClass()

// lastBackgroundClass.value = newClass
// }

// const backgroundClasses = ['bg-lavender', 'bg-sky', 'bg-river']
// const setCookie = useCookie('1')
// // const availableClasses = backgroundClasses.filter(bgClass => bgClass !== lastBackgroundClass.value)
// const randomIndex = String(Math.floor(Math.random() * 100))
// setCookie.value = randomIndex
// // const newClass = availableClasses[randomIndex]
// // currentBackgroundClass.value = newClass

// // currentBackgroundClass.value = lastBackgroundClass.value
// console.log('Cookie is', setCookie.value)

// onMounted(async () => {
//   await wait(1000)
//   logoVisible.value = true
//   await wait(2800)
//   isCoverFinished.value = true
//   coverVisible.value = false
// })
const counter: any = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
console.log('Counter is', counter.value)
</script>

<template>
  <div
    class="fixed inset-0 h-screen p-80"
  >
    <h1>Counter: {{ counter || '-' }}</h1>

    <button @click="counter = null">
      reset
    </button>

    <button @click="counter--">
      -
    </button>

    <button @click="counter++">
      +
    </button>
  </div>
  <!-- <div
    class="core-cover"
    :class="[
      { 'is-active': coverVisible },
    ]"
  >
    <div class="core-cover__wrapper wrapper">
      <div
        class="core-cover__logo"
        :class="[{ 'is-active': logoVisible }]"
      >
        <CoreCoverLogo />
      </div>
    </div>
  </div> -->
</template>

<style lang="postcss">
.core-cover {
  pointer-events: none;

  position: fixed;
  z-index: theme('zIndex.20');
  inset: 0;

  height: 100vh;
  height: 100dvh;

  opacity: 0;

  transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');

  &.is-active {
    pointer-events: auto;
    opacity: 1;
  }

  html:has(&.is-active) {
    overflow: hidden;
  }
}

.core-cover__logo {
  opacity: 0;
  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  &.is-active {
    opacity: 1;
  }
}

.core-cover__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
}
</style>
