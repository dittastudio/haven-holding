<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'
import { useIntersectionObserver } from '@vueuse/core'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as { [key: string]: any }

interface Props {
  asset: StoryblokAsset
  ratio?: string | number
  sizes: string
  lazy?: boolean
  cover?: boolean
}

const { asset, ratio = 'auto', sizes, lazy = true, cover = true } = defineProps<Props>()

const container = ref<HTMLPictureElement | null>(null)
const ready = ref(!lazy)
const loaded = ref(!lazy)

const size = computed(() => {
  const { width, height } = storyblokImageDimensions(asset.filename)

  if (ratio === 'auto') {
    return {
      width,
      height,
    }
  }

  const ratioFormat = calculateAspectRatio(ratioDimensions(ratio).width, ratioDimensions(ratio).height)

  return {
    width: ratioDimensions(ratioFormat).width,
    height: ratioDimensions(ratioFormat).height,
  }
})

const placeholderImg = useImage()
const placeholder = computed(() => asset.filename
  ? placeholderImg(asset.filename, {
      width: size.value.width,
      height: size.value.height,
      quality: 10,
    })
  : '')

useIntersectionObserver(
  container,
  ([entry], observerElement) => {
    if (!entry || !(entry.target instanceof HTMLPictureElement))
      return

    if (entry.isIntersecting && !ready.value) {
      ready.value = true
      observerElement.disconnect()
    }
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 0.25 },
)

const imgMain = useImage()

const imgInfo = computed(() => asset.filename
  ? imgMain.getSizes(asset.filename, {
      provider: 'storyblok',
      sizes,
      modifiers: {
        width: size.value.width,
        height: size.value.height,
        quality: 90,
        format: 'webp',
      },
    })
  : { sizes: '', srcset: '' })

const { class: className, ...rest } = attrs

const imgAttrs = computed(() => ({
  ...rest,
  width: size.value.width,
  height: size.value.height,
  src: ready.value && asset.filename ? asset.filename : undefined,
  sizes: ready.value ? imgInfo.value.sizes : '',
  srcset: ready.value ? imgInfo.value.srcset : '',
  alt: attrs.value?.alt ?? asset.alt ?? '',
}))
</script>

<template>
  <picture
    ref="container"
    class="isolate relative overflow-hidden block w-full h-[inherit]"
    :class="[
      className,
      { 'flex items-center justify-center': !cover },
    ]"
  >
    <img
      v-bind="imgAttrs"
      :class="{
        'opacity-0': !loaded,
        'opacity-100': loaded,
        'absolute z-1 inset-0 backface-visibility-hidden transition-opacity duration-1000 ease-out': lazy,
        'size-auto max-w-full max-h-full mx-auto': !cover,
        'w-full h-[inherit] object-cover': cover,
      }"
      :loading="lazy ? 'eager' : 'lazy'"
      @load="loaded = true"
    >

    <img
      v-if="lazy"
      class="pointer-events-none w-full h-[inherit] backface-visibility-hidden blur-sm transition-opacity duration-2000 ease-out delay-500"
      :class="{
        'opacity-100': !loaded,
        'opacity-0': loaded,
      }"
      :src="placeholder"
      :width="size.width"
      :height="size.height"
      alt=""
      loading="lazy"
    >
  </picture>
</template>
