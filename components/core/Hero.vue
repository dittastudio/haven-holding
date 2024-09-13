<script lang="ts" setup>
import { storyblokAssetType } from '@/utilities/storyblok'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  media: AssetStoryblok | undefined
}

const props = defineProps<Props>()

const isCoverFinished = useState('isCoverFinished')
const video = ref<HTMLVideoElement | null>(null)

const assetType = computed(() => storyblokAssetType(props.media?.filename || ''))

watch(isCoverFinished, async () => {
  if (video.value) {
    await video.value.play()
  }
})
</script>

<template>
  <div class="core-hero bg-lavender">
    <MediaImage
      v-if="props.media && assetType === 'image'"
      :asset="props.media"
      sizes="
        100vw
        sm:100vw
      "
    />

    <video
      v-else-if="props.media && assetType === 'video'"
      ref="video"
      class="object-cover w-full h-full"
      :src="props.media?.filename"
      loop
      muted
      playsinline
    >

    <!-- <MediaVideo
      v-else-if="props.media && assetType === 'video'"
      :asset="props.media"
    /> -->
    </video>
  </div>
</template>

<style lang="postcss">
.core-hero {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  &::after {
    content: '';

    position: absolute;
    inset: 0;

    opacity: 0.15;
    background-color: theme('colors.white');
  }
}
</style>
