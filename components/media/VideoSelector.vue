<script lang="ts" setup>
import config from '@/tailwind.config'
import { ratioMap } from '@/utilities/maps'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  srcLarge: AssetStoryblok
  srcSmall?: AssetStoryblok
  ratio?: ditta.TAspectRatios | string | number
}

const props = withDefaults(defineProps<Props>(), {
  ratio: 'auto',
})

const video = ref<HTMLVideoElement | null>(null)

const isScreenMd = useAtMedia(`(min-width: ${config.theme.screens.md})`)

const src = computed<string>(() => {
  const lg = props.srcLarge?.filename.trim() || ''
  const sm = props.srcSmall?.filename.trim() || ''

  const src = isScreenMd.value ? lg || sm : sm

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
