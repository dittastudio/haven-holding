<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'

interface Props {
  srcSmall?: StoryblokAsset
  srcSmallPoster?: StoryblokAsset
  srcLarge: StoryblokAsset
  srcLargePoster?: StoryblokAsset
  ratio?: App.TAspectRatios | string | number
}

const { srcSmall, srcSmallPoster, srcLarge, srcLargePoster, ratio = 'auto' } = defineProps<Props>()

const video = ref<HTMLVideoElement | null>(null)

const isScreenMdMax = useAtMedia(getMediaQuery('max-md'))

const src = computed<string>(() => {
  const sm = srcSmall?.filename?.trim() || ''
  const lg = srcLarge?.filename?.trim() || ''

  const src = isScreenMdMax.value ? sm || lg : lg || sm

  return src || ''
})

const posterSrc = computed<string>(() => {
  const usePosterImage = useImage()
  const sm = srcSmallPoster?.filename?.trim() || ''
  const lg = srcLargePoster?.filename?.trim() || ''

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
    :class="ratioMap[ratio]"
    :src="src"
    :poster="posterSrc"
  />
</template>
