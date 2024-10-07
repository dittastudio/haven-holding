<script lang="ts" setup>
import type { BlockHeroStoryblok } from '@/types/storyblok'
import IconLogo from '@/assets/icons/logo.svg'
// import { headerHeight, screenSizes } from '@/tailwind.config'
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

const triggerRef = ref<HTMLElement | null>(null)
const logo = ref<HTMLElement | null>(null)
// Animation
onMounted(() => {
  const header = document.querySelector('.core-header')

  header?.classList.add('opacity-0')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerRef.value,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      markers: true,
      onLeave: () => {
        header?.classList.remove('opacity-0')
        logo.value?.classList.add('opacity-0')
      },

      onEnterBack: () => {
        header?.classList.add('opacity-0')
        logo.value?.classList.remove('opacity-0')
      },
    },
  })

  tl.to(
    logo.value,
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

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill()
  })
})
</script>

<template>
  <div
    class="block-hero__mask z-1 absolute inset-x-0 top-0 pointer-events-none"
  >
    <div class="block-hero__mask__inner text-offblack sticky top-0 flex items-center justify-center">
      <div class="flex items-center justify-center h-[var(--app-header-height)]">
        <div
          ref="logo"
          class="block-hero__logo scale-[calc(200/136)] md:scale-[calc(337/136)]"
        >
          <IconLogo class="w-[136px] h-[26px]" />
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
  margin-block-start: calc(var(--app-header-height) * -1);
}

.block-hero__mask {
  height: calc((100vh + 50vh) + (var(--app-header-height) / 2));
}

.block-hero__mask__outer,
.block-hero__mask__inner {
  height: 100vh;
}

.block-hero__logo {
  backface-visibility: hidden;
  outline: 1px solid transparent;
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
