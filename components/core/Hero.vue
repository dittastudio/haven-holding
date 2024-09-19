<script lang="ts" setup>
import { storyblokAssetType } from '@/utilities/storyblok'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  mediaDesktop: AssetStoryblok | undefined
  mediaMobile: AssetStoryblok | undefined
  poster: AssetStoryblok
}

const props = defineProps<Props>()

const isDev = import.meta.dev
const isCoverFinished = useState('isCoverFinished')
const splashSeen = useState('splashSeen')
const video = ref<any | null>(null)

const assetType = computed(() => storyblokAssetType(props.mediaDesktop?.filename || ''))

const posterImg = useImage()
const poster = posterImg(props.poster?.filename, {
  width: 1920,
  quality: 80,
})

watch(isCoverFinished, async () => {
  if (video.value)
    await video.value.$el.play()
})
</script>

<template>
  <div class="core-hero bg-lavender">
    <MediaImage
      v-if="props.mediaDesktop && assetType === 'image'"
      :asset="props.mediaDesktop"
      sizes="
        100vw
        sm:100vw
      "
    />

    <MediaVideoSelector
      v-else-if="props.mediaDesktop && assetType === 'video'"
      ref="video"
      :src-small="props.mediaMobile"
      :src-large="props.mediaDesktop"
      loop
      muted
      playsinline
      :autoplay="isCoverFinished || isDev || splashSeen ? true : false"
      :poster="poster"
    />
  </div>
</template>

<style lang="postcss">
.core-hero {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
}
</style>
