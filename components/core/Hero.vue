<script lang="ts" setup>
import type { AssetStoryblok } from '@/types/storyblok'
import { storyblokAssetType } from '@/utilities/storyblok'

interface Props {
  mediaDesktop: AssetStoryblok | undefined
  mediaMobile: AssetStoryblok | undefined
}

const props = defineProps<Props>()

const isDev = import.meta.dev
const isCoverFinished = useState('isCoverFinished')
const splashSeen = useState('splashSeen')
const video = ref<any | null>(null)

const assetType = computed(() => storyblokAssetType(props.mediaDesktop?.filename || ''))

watch(isCoverFinished, async () => {
  if (video.value)
    await video.value.$el.play()
})
</script>

<template>
  <div class="core-hero bg-sky">
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
