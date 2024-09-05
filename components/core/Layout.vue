<script lang="ts" setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useIntersectionObserver } from '@vueuse/core'
import IconLogo from '@/assets/icons/logo.svg'

gsap.registerPlugin(ScrollTrigger)

const header = ref<HTMLElement | null>(null)
const logo = ref<HTMLElement | null>(null)
const tiggerContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.to(logo.value, {
    scrollTrigger: {
      trigger: tiggerContainer.value,
      markers: true,
      start: '120px bottom',
      end: '60px center',
      scrub: 0,
      onLeave: ({ progress, direction, isActive }) => {
        header.value?.classList.remove('opacity-0')
        logo.value?.classList.add('opacity-0')
        console.log(progress, direction, isActive)
      },
      onEnterBack: ({ progress, direction, isActive }) => {
        header.value?.classList.add('opacity-0')
        logo.value?.classList.remove('opacity-0')
        console.log(progress, direction, isActive)
      },
    },
    scale: 0.39,
    ease: 'power1.inOut',
  })
})

// const isVisible = ref(false)
// const anchor = ref<HTMLElement | null>(null)

// onMounted(() => {
//   console.log('MOUNTED')
//   if (!anchor.value) {
//     return
//   }

//   useIntersectionObserver(
//     anchor,
//     ([{ isIntersecting }]) => {
//       isVisible.value = isIntersecting
//       console.log('isIntersecting', isIntersecting)
//     },
//     { rootMargin: '0% 0px -50% 0px', threshold: 0.5 },
//   )
// })

// watch(isVisible, (value) => {
//   console.log('isVisible', value)
// })
</script>

<template>
  <div class="core-layout">
    <div
      class="relative"
    >
      <div
        class="sticky top-0 -z-1"
      >
        <slot name="hero" />
      </div>

      <div
        class="absolute top-0 inset-x-0 h-[calc(150vh+60px)]"
      >
        <div class="sticky top-0 h-screen flex items-center justify-center">
          <div
            ref="logo"
            class="core-layout__logo flex items-center justify-center h-[var(--app-header-height)]"
          >
            <IconLogo
              width="330"
              heigh="63"
            />
          </div>
        </div>
      </div>

      <div
        ref="tiggerContainer"
        class="bg-offwhite"
      >
        <header
          ref="header"
          class="core-layout__header sticky top-0 z-10 pointer-events-none opacity-0"
        >
          <slot name="header" />
        </header>

        <main class="core-layout__main">
          <slot name="main" />
        </main>
      </div>
    </div>

    <footer class="core-layout__footer">
      <slot name="footer" />
    </footer>

    <slot name="dev" />
  </div>
</template>

<style lang="postcss">
/* .core-layout__logo {
  scale: 1;
  opacity: 1;
  transition:
    scale 0.2s ease 0.2s,
    opacity 0.2s ease 0.2s;

  &.is-shrunk {
    scale: 0.4;
    opacity: 0;
  }
}

.core-layout__header {
  opacity: 1;
  transition: opacity 0.2s ease 0.2s;

  &.is-hidden {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
} */
</style>
