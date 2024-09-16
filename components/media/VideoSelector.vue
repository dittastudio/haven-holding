<script lang="ts" setup>
import config from '@/tailwind.config'
import { ratioMap } from '@/utilities/maps'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  srcSmall?: AssetStoryblok
  srcLarge: AssetStoryblok
  ratio?: ditta.TAspectRatios | string | number
}

const props = withDefaults(defineProps<Props>(), {
  ratio: 'auto',
})

const video = ref<HTMLVideoElement | null>(null)

const isScreenMd = useAtMedia(`(min-width: ${config.theme.screens.md})`)

const src = computed<string>(() => {
  const sm = props.srcSmall?.filename.trim() || ''
  const lg = props.srcLarge?.filename.trim() || ''

  console.log('isScreenMd', isScreenMd.value, config.theme.screens.md)
  const src = isScreenMd.value ? lg || sm : sm

  console.log('src', src)

  return src || ''
})
</script>

<template>
  <video
    v-if="src"
    ref="video"
    :src="src"
    class="w-full h-[inherit] object-cover"
    :class="ratioMap[props.ratio]"
  />
</template>
