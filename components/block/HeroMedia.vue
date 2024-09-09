<script lang="ts" setup>
import { storyblokAssetType } from '@/utilities/storyblok'

interface Props {
  media: any
}

const { media } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(media?.filename || ''))
</script>

<template>
  <div class="block-hero-media flex items-center justify-center h-[100vh] bg-lavender">
    <MediaImage
      v-if="media && assetType === 'image'"
      :asset="media"
      sizes="
        100vw
        sm:100vw
      "
    />

    <MediaVideo
      v-else-if="media && assetType === 'video'"
      :asset="media"
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

    opacity: 0.1;
    background-color: theme('colors.white');
  }
}
</style>
