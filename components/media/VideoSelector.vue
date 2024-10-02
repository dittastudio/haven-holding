<script lang="ts" setup>
import type { AssetStoryblok } from '@/types/storyblok'
import config from '@/tailwind.config'
import { ratioMap } from '@/utilities/maps'

interface Props {
  srcSmall?: AssetStoryblok
  srcSmallPoster?: AssetStoryblok
  srcLarge: AssetStoryblok
  srcLargePoster?: AssetStoryblok
  ratio?: ditta.TAspectRatios | string | number
}

const props = withDefaults(defineProps<Props>(), {
  ratio: 'auto',
})

const video = ref<HTMLVideoElement | null>(null)

const isScreenMdMax = useAtMedia(`(max-width: ${config.theme.screens.mdMax.max})`)

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
