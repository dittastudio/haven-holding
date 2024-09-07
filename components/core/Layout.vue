<script lang="ts" setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      start: 'top bottom',
      end: '105px center',
      scrub: 0,
      onLeave: ({ progress, direction, isActive }) => {
        header.value?.classList.remove('opacity-0')
        logo.value?.classList.add('opacity-0')
        // console.log(progress, direction, isActive)
      },
      onEnterBack: ({ progress, direction, isActive }) => {
        header.value?.classList.add('opacity-0')
        logo.value?.classList.remove('opacity-0')
        // console.log(progress, direction, isActive)
      },
    },
    scale: 0.39,
    ease: 'power1.inOut',
  })
})
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
        class="absolute top-0 inset-x-0 h-[calc((90vh+50vh)+(var(--app-header-height)/2))] pointer-events-none"
      >
        <div class="sticky top-0 h-[90vh] flex items-center justify-center mix-blend-difference text-white">
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
