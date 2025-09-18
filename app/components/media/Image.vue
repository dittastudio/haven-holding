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
}

const { asset, ratio = 'auto', sizes, lazy = true } = defineProps<Props>()

const container = ref<HTMLPictureElement | null>(null)
const ready = ref(!lazy)
const loaded = ref(!lazy)

const { width, height } = storyblokImageDimensions(asset.filename)

const ratioValid = validAspectRatio(ratio)
const ratioFormat = ratio && ratioValid ? calculateAspectRatio(ratioDimensions(ratio).width, ratioDimensions(ratio).height) : calculateAspectRatio(width, height)

const size = {
  width: ratioDimensions(ratioFormat).width,
  height: ratioDimensions(ratioFormat).height,
}

const placeholderImg = useImage()
const placeholder = asset.filename
  ? placeholderImg(asset.filename, {
      width: size.width,
      height: size.height,
      quality: 10,
    })
  : ''

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
        width: size.width,
        height: size.height,
        quality: 80,
      },
    })
  : { sizes: '', srcset: '' })

const { class: className, ...rest } = attrs

const imgAttrs = computed(() => ({
  ...rest,
  width: size.width,
  height: size.height,
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
    :class="className"
  >
    <img
      v-bind="imgAttrs"
      class="w-full h-[inherit]"
      :class="{
        'opacity-0': !loaded,
        'opacity-100': loaded,
        'absolute z-1 inset-0 backface-visibility-hidden transition-opacity duration-1000 ease-out': lazy,
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
