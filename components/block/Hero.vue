<script lang="ts" setup>
import type { BlockHeroStoryblok } from '@/types/storyblok'
import IconLogo from '@/assets/icons/logo.svg'
import { headerHeight, screenSizes } from '@/tailwind.config'
import { storyblokAssetType, storyblokEditor } from '@/utilities/storyblok'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  block: BlockHeroStoryblok
}

const props = defineProps<Props>()

const route = useRoute()
const isDev = import.meta.dev

const isCoverFinished = useState('isCoverFinished')
const splashSeen = useState('splashSeen')
const video = ref<any | null>(null)

const assetType = computed(() => storyblokAssetType(props.block.media_desktop?.filename || ''))

watch(isCoverFinished, async () => {
  if (video.value)
    await video.value.$el.play()
})

// Animation
const triggerRef = ref<HTMLElement | null>(null)
const logo = ref<HTMLElement | null>(null)

const logoWidthUnits = { small: 136, medium: 200, large: 337 }

onMounted(() => {
  const mm = gsap.matchMedia()

  mm.add({ isDesktop: `(min-width: ${screenSizes.md}px)`, isMobile: `(max-width: ${screenSizes.md - 1}px)` }, (context) => { // not sure why it has to have two arguments
    const { isDesktop } = context.conditions as { isDesktop: boolean }

    const header = document.querySelector('.core-header')
    const hide = { opacity: 0, visibility: 'hidden' }
    const show = { opacity: 1, visibility: 'visible' }

    if (!header || !logo.value)
      return

    gsap.set(header, hide)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.value,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        // markers: true,
        onLeave: () => {
          if (header && logo.value) {
            gsap.set(header, show)
            gsap.set(logo.value, hide)
          }
        },

        onEnterBack: () => {
          if (header && logo.value) {
            gsap.set(header, hide)
            gsap.set(logo.value, show)
          }
        },
      },
    })

    tl.fromTo(
      logo.value,
      {
        scale: isDesktop ? (logoWidthUnits.large / logoWidthUnits.small) : (logoWidthUnits.medium / logoWidthUnits.small),
      },
      {
        scale: 1,
        ease: 'power1.inOut',
      },
    ).to(
      logo.value,
      {
        scale: 1,
        ease: 'power1.inOut',
      },
    )
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill()
  })

  const header = document.querySelector('.core-header')

  gsap.set(header, { clearProps: 'all' })
  if (logo.value)
    gsap.set(logo.value, { clearProps: 'all' })
})
</script>

<template>
  <div
    class="block-hero__mask"
  >
    <div class="block-hero__mask__outer">
      <div class="block-hero__mask__inner">
        <div
          ref="logo"
          class="block-hero__logo"
        >
          <IconLogo
            width="136"
            height="26"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="props.block.media_desktop"
    class="block-hero bg-sky"
  >
    <div class="block-hero__container">
      <MediaImage
        v-if="props.block.media_desktop && assetType === 'image'"
        :asset="props.block.media_desktop"
        sizes="
          100vw
          sm:100vw
        "
      />

      <MediaVideoSelector
        v-else-if="props.block.media_desktop && assetType === 'video'"
        ref="video"
        :src-small="props.block.media_mobile"
        :src-small-poster="props.block.media_mobile_poster"
        :src-large="props.block.media_desktop"
        :src-large-poster="props.block.media_desktop_poster"
        loop
        muted
        playsinline
        :autoplay="isCoverFinished || splashSeen || isDev || storyblokEditor(route.query) ? true : false"
      />
    </div>
  </div>

  <div
    ref="triggerRef"
    class="block-hero__spacer bg-offwhite"
  />
</template>

<style lang="postcss">
.block-hero {
  position: sticky;
  z-index: -1;
  top: 0;

  height: 100vh;
  height: 100svh;
  margin-block-start: calc(var(--app-header-height) * -1);
}

.block-hero__mask {
  pointer-events: none;

  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;

  height: calc((100vh + 50vh) + (var(--app-header-height) / 2));
  height: calc((100svh + 50svh) + (var(--app-header-height) / 2));
}

.block-hero__mask__outer {
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  height: 100svh;
}

.block-hero__mask__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--app-header-height);
}

.block-hero__logo {
  scale: calc(v-bind(logoWidthUnits.medium) / v-bind(logoWidthUnits.small));
  backface-visibility: hidden;
  outline: 1px solid transparent;

  @screen md {
    scale: calc(v-bind(logoWidthUnits.large) / v-bind(logoWidthUnits.small));
  }
}

.block-hero__container {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}

.block-hero__spacer {
  height: var(--app-header-height);
}
</style>
