<script lang="ts" setup>
import type { AssetStoryblok } from '@/types/storyblok'
import { storyblokAssetType, storyblokEditor } from '@/utilities/storyblok'

interface Props {
  mediaMobile: AssetStoryblok | undefined
  mediaMobilePoster: AssetStoryblok | undefined
  mediaDesktop: AssetStoryblok | undefined
  mediaDesktopPoster: AssetStoryblok | undefined
}

const props = defineProps<Props>()

const route = useRoute()
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
      :src-small-poster="props.mediaMobilePoster"
      :src-large="props.mediaDesktop"
      :src-large-poster="props.mediaDesktopPoster"
      loop
      muted
      playsinline
      :autoplay="isCoverFinished || splashSeen || isDev || storyblokEditor(route.query) ? true : false"
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
