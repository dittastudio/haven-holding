<script lang="ts" setup>
import { storyblokAssetType } from '@/utilities/storyblok'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  mediaLarge: AssetStoryblok | undefined
  mediaSmall: AssetStoryblok | undefined
}

const props = defineProps<Props>()

const isCoverFinished = useState('isCoverFinished')
const video = ref<any | null>(null)

const assetType = computed(() => storyblokAssetType(props.mediaLarge?.filename || ''))

onMounted(() => {
  console.log('video', video.value?.$el)
})

watch(isCoverFinished, async () => {
  if (video.value)
    await video.value.$el.play()
})
</script>

<template>
  <div class="core-hero bg-lavender">
    <MediaImage
      v-if="props.mediaLarge && assetType === 'image'"
      :asset="props.mediaLarge"
      sizes="
        100vw
        sm:100vw
      "
    />

    <MediaVideoSelector
      v-else-if="props.mediaLarge && assetType === 'video'"
      ref="video"
      :src-small="props.mediaSmall"
      :src-large="props.mediaLarge"
      loop
      muted
      playsinline
      :autoplay="isCoverFinished ? true : false"
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

  &::after {
    content: '';

    position: absolute;
    inset: 0;

    opacity: 0.15;
    background-color: theme('colors.white');
  }
}
</style>
