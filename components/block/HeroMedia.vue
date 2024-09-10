<script lang="ts" setup>
import { storyblokAssetType } from '@/utilities/storyblok'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  media: AssetStoryblok
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.media?.filename || ''))
</script>

<template>
  <div class="block-hero-media flex items-center justify-center h-[100vh] bg-lavender">
    <MediaImage
      v-if="props.media && assetType === 'image'"
      :asset="props.media"
      sizes="
        100vw
        sm:100vw
      "
    />

    <MediaVideo
      v-else-if="props.media && assetType === 'video'"
      :asset="props.media"
    />
  </div>
</template>

<style lang="postcss">
.block-hero-media {
  position: relative;

  &::after {
    content: '';

    position: absolute;
    inset: 0;

    opacity: 0.2;
    background-color: theme('colors.white');
  }
}
</style>
