<script lang="ts" setup>
import type { BlockHero } from '@@/.storyblok/types/303510/storyblok-components'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconLogo from '@/assets/icons/haven-logo-final.svg'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  block: BlockHero
}

const { block } = defineProps<Props>()

const route = useRoute()
const isDev = import.meta.dev

const isCoverFinished = useState('isCoverFinished')
const splashSeen = useState('splashSeen')
const video = ref<any | null>(null)

const assetType = computed(() => storyblokAssetType(block.media_desktop?.filename || ''))

watch(isCoverFinished, async () => {
  if (video.value) {
    await video.value.$el.play()
  }
})

const triggerRef = useTemplateRef('triggerRef')
const logo = useTemplateRef('logo')

const logoWidthUnits = { small: 138, medium: 205, large: 341 }

onMounted(() => {
  const mm = gsap.matchMedia()

  mm.add({ isDesktop: getMediaQuery('md'), isMobile: getMediaQuery('max-md') }, (context) => { // not sure why it has to have two arguments
    const { isDesktop } = context.conditions as { isDesktop: boolean }

    const header = document.querySelector('[data-component="app-header"]')
    const hide = { opacity: 0, visibility: 'hidden' }
    const show = { opacity: 1, visibility: 'visible' }

    if (!header || !logo.value) {
      return
    }

    gsap.set(header, hide)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.value,
        start: 'bottom bottom',
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

    const initialScale = isDesktop
      ? logoWidthUnits.large / logoWidthUnits.small
      : logoWidthUnits.medium / logoWidthUnits.small

    tl.fromTo(
      logo.value,
      {
        scale: initialScale,
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

  const header = document.querySelector('[data-component="app-header"]')

  gsap.set(header, { clearProps: 'all' })

  if (logo.value) {
    gsap.set(logo.value, { clearProps: 'all' })
  }
})
</script>

<template>
  <div
    class="absolute top-0 right-0 left-0 z-1 pointer-events-none h-[calc((100svh_+_50svh)_+_(var(--app-header-height)_/_2))]"
  >
    <div class="sticky top-0 h-svh flex items-center justify-center">
      <div class="flex items-center justify-center h-(--app-header-height)">
        <div
          ref="logo"
          class="block-hero__logo backface-hidden outline outline-transparent"
        >
          <IconLogo class="w-[138px] h-[28px]" />
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="block.media_desktop"
    class="sticky top-0 -z-1 h-svh -mt-(--app-header-height) bg-sky"
  >
    <div class="flex items-center justify-center size-full">
      <MediaImage
        v-if="block.media_desktop && assetType === 'image'"
        :asset="block.media_desktop"
        sizes="
          100vw
          sm:100vw
        "
      />

      <MediaVideoSelector
        v-else-if="block.media_desktop && assetType === 'video'"
        ref="video"
        :src-small="block.media_mobile"
        :src-small-poster="block.media_mobile_poster"
        :src-large="block.media_desktop"
        :src-large-poster="block.media_desktop_poster"
        loop
        muted
        playsinline
        :autoplay="isCoverFinished || splashSeen || isDev || storyblokEditor(route.query) ? true : false"
      />
    </div>
  </div>

  <div
    ref="triggerRef"
    class="h-(--app-header-height) bg-offwhite"
  />
</template>

<style scoped>
@reference "@/assets/css/main.css";

.block-hero__logo {
  scale: calc(v-bind(logoWidthUnits.medium) / v-bind(logoWidthUnits.small));

  @variant md {
    scale: calc(v-bind(logoWidthUnits.large) / v-bind(logoWidthUnits.small));
  }
}
</style>
