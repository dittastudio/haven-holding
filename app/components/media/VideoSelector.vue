<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'

interface Props {
  srcSmall?: StoryblokAsset
  srcSmallPoster?: StoryblokAsset
  srcLarge: StoryblokAsset
  srcLargePoster?: StoryblokAsset
  ratio?: App.TAspectRatios | string | number
}

const props = withDefaults(defineProps<Props>(), {
  ratio: 'auto',
})

const video = ref<HTMLVideoElement | null>(null)

const isScreenMdMax = useAtMedia(getMediaQuery('max-md'))

const src = computed<string>(() => {
  const sm = props.srcSmall?.filename.trim() || ''
  const lg = props.srcLarge?.filename.trim() || ''

  const src = isScreenMdMax.value ? sm || lg : lg || sm

  return src || ''
})

const posterSrc = computed<string>(() => {
  const usePosterImage = useImage()
  const sm = props.srcSmallPoster?.filename.trim() || ''
  const lg = props.srcLargePoster?.filename.trim() || ''

  const src = isScreenMdMax.value ? sm || lg : lg || sm

  return usePosterImage(src, {
    width: isScreenMdMax.value ? 1280 : 1920,
    quality: 80,
  }) || ''
})
</script>

<template>
  <video
    v-if="src"
    ref="video"
    class="w-full h-[inherit] object-cover"
    :class="ratioMap[props.ratio]"
    :src="src"
    :poster="posterSrc"
  />
</template>
