<script lang="ts" setup>
import type { AssetStoryblok } from '@/types/storyblok'
import { calculateAspectRatio, ratioDimensions, validAspectRatio } from '@/utilities/helpers'
import { storyblokImageDimensions } from '@/utilities/storyblok'
import { useIntersectionObserver } from '@vueuse/core'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as { [key: string]: any }

interface Props {
  asset: AssetStoryblok
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
const placeholder = placeholderImg(props.asset.filename, {
  width: size.width,
  height: size.height,
  quality: 10,
})

useIntersectionObserver(
  container,
  ([{ target, isIntersecting }], observerElement) => {
    if (!(target instanceof HTMLPictureElement))
      return

    if (isIntersecting && !ready.value) {
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
  src: ready.value ? props.asset.filename : '',
  sizes: ready.value ? imgInfo.value.sizes : '',
  srcset: ready.value ? imgInfo.value.srcset : '',
  alt: attrs.value?.alt ?? props.asset.alt ?? '',
}))
</script>

<template>
  <picture
    ref="container"
    class="media-image"
    :class="className"
  >
    <img
      v-bind="imgAttrs"
      class="media-image__asset"
      :class="[{ 'is-loaded': loaded, 'is-lazy': props.lazy }]"
      :loading="props.lazy ? 'eager' : 'lazy'"
      @load="loaded = true"
    >

    <img
      v-if="props.lazy"
      class="media-image__placeholder"
      :src="placeholder"
      :width="size.width"
      :height="size.height"
      alt=""
      loading="lazy"
    >
  </picture>
</template>

<style lang="postcss">
.media-image {
  --transition-duration: 1s;

  isolation: isolate;
  position: relative;

  overflow: hidden;
  display: block;

  width: 100%;
  height: inherit;
}

.media-image__asset {
  width: 100%;
  height: auto;

  &.is-lazy {
    position: absolute;
    z-index: 1;
    inset: 0;

    backface-visibility: hidden;
    opacity: 0;

    transition: opacity var(--transition-duration) theme('transitionTimingFunction.out');
  }

  &.is-loaded {
    opacity: 1;
  }
}

.media-image__placeholder {
  pointer-events: none;

  width: 100%;
  height: auto;

  backface-visibility: hidden;
  opacity: 1;
  filter: blur(8px);

  transition: opacity calc(var(--transition-duration) * 2) theme('transitionTimingFunction.out') calc(var(--transition-duration) / 2);

  .media-image__asset.is-loaded + & {
    opacity: 0;
  }
}
</style>
