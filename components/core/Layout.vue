<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'
import { headerHeight, screenSizes } from '@/tailwind.config'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const header = ref<HTMLElement | null>(null)
const tiggerContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  const logos = document.querySelectorAll('.core-layout__logo')

  const mm = gsap.matchMedia()

  mm.add({ isDesktop: `(min-width: ${screenSizes.md}px)`, isMobile: `(max-width: ${screenSizes.md - 1}px)` }, (context) => { // not sure why it has to have two arguments
    const { isDesktop } = context.conditions as { isDesktop: boolean }

    gsap.to(logos, {
      scrollTrigger: {
        trigger: tiggerContainer.value,
        // markers: true,
        start: `top bottom`,
        end: isDesktop ? `${headerHeight.desktop / 2} center` : `${headerHeight.mobile / 2} center`,
        scrub: 0.25,
        onLeave: () => {
          header.value?.classList.remove('opacity-0')
          logos.forEach((el) => {
            el.classList.add('opacity-0')
          })
        },
        onEnterBack: () => {
          header.value?.classList.add('opacity-0')
          logos.forEach((el) => {
            el.classList.remove('opacity-0')
          })
        },
      },
      scale: 1,
      ease: 'power1.inOut',
    })
  })
})
</script>

<template>
  <div
    class="core-layout"
  >
    <div
      class="relative"
    >
      <div
        class="-z-1 sticky top-0"
      >
        <slot name="hero" />
      </div>

      <div class="core-layout__mask z-1 pointer-events-nonex absolute inset-x-0 top-0">
        <div class="core-layout__mask__inner text-offblack sticky top-0 flex items-center justify-center">
          <div class="flex items-center justify-center h-[var(--app-header-height)]">
            <div class="core-layout__logo scale-[calc(200/136)] md:scale-[calc(337/136)]">
              <IconLogo class="w-[136px] h-[26px]" />
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="core-layout__mask__outer contain-paint absolute inset-x-0 top-0">
        <div class="core-layout__mask pointer-events-nonex absolute inset-x-0 top-0">
          <div class="core-layout__mask__inner core-layout__mask__inner--cycle text-sky sticky top-0 flex items-center justify-center">
            <div class="core-layout__logo flex items-center justify-center h-[var(--app-header-height)]">
              <IconLogo class="w-[200px] md:w-[330px] h-auto" />
            </div>
          </div>
        </div>
      </div> -->

      <div
        ref="tiggerContainer"
        class="bg-offwhite isolate"
      >
        <header
          ref="header"
          class="core-layout__header opacity-0"
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
.core-layout__header {
  pointer-events: none;

  position: sticky;
  z-index: theme('zIndex.10');
  top: 0;

  color: theme('colors.offwhite');

  mix-blend-mode: difference;
}

.core-layout__mask {
  height: calc((100vh + 50vh) + (var(--app-header-height) / 2));
}

.core-layout__mask__outer,
.core-layout__mask__inner {
  height: 100vh;
}

.core-layout__logo {
  outline: 1px solid transparent;
}
</style>
