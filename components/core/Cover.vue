<script lang="ts" setup>
import IconLogoSymbol from '@/assets/icons/logo-symbol.svg'
import { wait } from '@/utilities/helpers'

const coverVisible = ref(true)
const logoVisible = ref(false)

onMounted(async () => {
  await wait(1000)
  logoVisible.value = true
  await wait(2800)
  coverVisible.value = false
})
</script>

<template>
  <div
    class="core-cover"
    :class="[{ 'is-active': coverVisible }]"
  >
    <div class="wrapper flex items-center justify-center h-full">
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
html {
  &.is-storyblok-editor {
    .core-cover {
      display: none;
    }
  }
}

.core-cover {
  pointer-events: none;

  position: fixed;
  z-index: theme('zIndex.20');
  inset: 0;

  height: 100vh;
  height: 100dvh;

  color: theme('colors.black');

  opacity: 0;
  background-color: theme('colors.lavender');

  transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');

  &.is-active {
    pointer-events: auto;
    opacity: 1;
  }

  html:has(&.is-active) {
    overflow: hidden;
  }

  &__logo {
    opacity: 0;
    transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

    &.is-active {
      opacity: 1;
    }
  }

  /* &__logo {
    --logo-responsive-width: 15vw;

    width: var(--logo-responsive-width);
    height: auto;
  } */
}
</style>
