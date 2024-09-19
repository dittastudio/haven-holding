<script lang="ts" setup>
import { wait } from '@/utilities/helpers'

const coverVisible = ref(true)
const logoVisible = ref(false)
const isCoverFinished = useState('isCoverFinished')
const backgroundIndex = useCookie<number>('backgroundIndex')
const backgroundClass = useCookie<string>('backgroundClass')
const backgroundClasses = ['bg-lavender', 'bg-sky', 'bg-river']
const currentIndex = backgroundIndex.value

if (import.meta.server) {
  backgroundIndex.value = currentIndex != null && currentIndex < 2 ? currentIndex + 1 : 0
  backgroundClass.value = backgroundClasses[currentIndex] || backgroundClasses[0]
}

onMounted(async () => {
  await wait(1000)
  logoVisible.value = true
  await wait(2800)
  isCoverFinished.value = true
  coverVisible.value = false
})
</script>

<template>
  <div
    class="core-cover"
    :class="[
      { 'is-active': coverVisible },
      backgroundClass,
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
  </div>
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
