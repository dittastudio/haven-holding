<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'

defineOptions({
  inheritAttrs: false,
})

interface Emits {
  (event: 'load', payload: boolean): void
}

const emit = defineEmits<Emits>()

const attrs = useAttrs() as { [key: string]: any }

interface Props {
  asset: StoryblokAsset
  ratio?: string | number
  sizes: string
  lazy?: boolean
  cover?: boolean
}

const { asset, ratio = 'auto', sizes, lazy = false, cover = false } = defineProps<Props>()

const container = ref<HTMLPictureElement | null>(null)
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
  src: asset.filename ? asset.filename : undefined,
  sizes: imgInfo.value.sizes,
  srcset: imgInfo.value.srcset,
  alt: attrs.value?.alt ?? asset.alt ?? '',
}))

const imageLoaded = () => {
  loaded.value = true

  emit('load', true)
}

const image = useTemplateRef('image')

onMounted(() => {
  if (!image.value) {
    return
  }

  const { complete, naturalHeight } = image.value

  if (complete && naturalHeight !== 0) {
    loaded.value = true
  }
})
</script>

<template>
  <picture
    ref="container"
    class="block w-full h-[inherit]"
    :class="[
      className,
      { 'flex items-center justify-center': !cover },
      { 'isolate relative overflow-hidden': lazy },
    ]"
  >
    <img
      ref="image"
      v-bind="imgAttrs"
      :class="{
        'opacity-0': !loaded,
        'opacity-100': loaded,
        'absolute z-1 inset-0 backface-hidden transition-opacity duration-500 ease-out': lazy,
        'size-auto max-w-full max-h-full m-auto': !cover,
        'w-full h-[inherit] object-cover': cover,
      }"
      :loading="lazy ? 'lazy' : 'eager'"
      @load="imageLoaded"
    >

    <img
      v-if="lazy"
      class="pointer-events-none backface-hidden blur-sm transition-opacity duration-1000 ease-out delay-500"
      :class="{
        'opacity-100': !loaded,
        'opacity-0': loaded,
        'size-auto max-w-full max-h-full m-auto': !cover,
        'w-full h-[inherit] object-cover': cover,
      }"
      :src="placeholder"
      :width="size.width"
      :height="size.height"
      :alt="imgAttrs.alt"
    >
  </picture>
</template>
