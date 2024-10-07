<script lang="ts" setup>
import type { BlockHeroStoryblok } from '@/types/storyblok'
import IconLogo from '@/assets/icons/logo.svg'
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

onMounted(() => {
  const header = document.querySelector('.core-header')

  header?.classList.add('opacity-0')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerRef.value,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      // markers: true,
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
}

.block-hero__mask__outer {
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
}

.block-hero__mask__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--app-header-height);
}

.block-hero__logo {
  --_logo-zoomed-size: 200;
  --_logo-normal-size: 136;

  scale: calc(var(--_logo-zoomed-size) / var(--_logo-normal-size));
  backface-visibility: hidden;
  outline: 1px solid transparent;

  @screen md {
    --_logo-zoomed-size: 337;
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
