<script lang="ts" setup>
import { storyblokAssetType } from '@/utilities/storyblok'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  media: AssetStoryblok | undefined
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.media?.filename || ''))
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

    <MediaVideo
      v-else-if="props.media && assetType === 'video'"
      :asset="props.media"
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
