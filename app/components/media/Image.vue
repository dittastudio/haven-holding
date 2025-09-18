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
  alt?: string
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
})

const container = ref<HTMLPictureElement | null>(null)
const ready = ref(!props.lazy)
const loaded = ref(!props.lazy)

const { width, height } = storyblokImageDimensions(props.asset.filename)

const ratioValid = validAspectRatio(props.ratio)
const ratioFormat = props.ratio && ratioValid ? calculateAspectRatio(ratioDimensions(props.ratio).width, ratioDimensions(props.ratio).height) : calculateAspectRatio(width, height)

const size = {
  width: ratioDimensions(ratioFormat).width,
  height: ratioDimensions(ratioFormat).height,
}

const placeholderImg = useImage()
const placeholder = props.asset.filename
  ? placeholderImg(props.asset.filename, {
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

const imgInfo = computed(() => imgMain.getSizes(props.asset.filename, {
  provider: 'storyblok',
  sizes: props.sizes,
  modifiers: {
    width: size.width,
    height: size.height,
    quality: 80,
  },
}))

const { class: className, ...rest } = attrs

const imgAttrs = computed(() => ({
  ...rest,
  width: size.width,
  height: size.height,
  src: ready.value && props.asset.filename ? props.asset.filename : undefined,
  sizes: ready.value ? imgInfo.value.sizes : '',
  srcset: ready.value ? imgInfo.value.srcset : '',
  alt: attrs.value?.alt ?? props.asset.alt ?? '',
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
        'absolute z-1 inset-0 backface-visibility-hidden transition-opacity duration-1000 ease-out': props.lazy,
      }"
      :loading="props.lazy ? 'eager' : 'lazy'"
      @load="loaded = true"
    >

    <img
      v-if="props.lazy"
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
