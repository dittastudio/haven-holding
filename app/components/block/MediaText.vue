<script lang="ts" setup>
import type { BlockMediaText } from '@@/.storyblok/types/303510/storyblok-components'

interface Props {
  block: BlockMediaText
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    data-component="block-media-text"
    class="wrapper"
  >
    <p
      class="
      type-mono-16
      text-center
      mb-[calc(var(--app-vertical-rhythm)_/_1.25)]
      md:mb-[calc(var(--app-vertical-rhythm)_/_1.5)]
    "
    >
      {{ block.title }}
    </p>

    <div class="grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-(--app-vertical-rhythm)">
      <div
        class="
          col-span-full
          md:col-start-3 md:col-span-8
          xl:col-start-4 xl:col-span-6
          max-md:px-(--app-outer-gutter)
        "
      >
        <MediaImage
          v-if="block.media && assetType === 'image'"
          :asset="block.media"
          :ratio="block.ratio"
          :sizes="`
            100vw
            sm:100vw
            md:${(8 / 12 * 100).toFixed(0)}vw
            xl:${(6 / 12 * 100)}vw
            3xl:${6 / 12 * 1920}px
          `"
        />

        <MediaVideo
          v-else-if="block.media && assetType === 'video'"
          :asset="block.media"
          :ratio="block.ratio"
        />
      </div>

      <div class="col-span-full [&_h1,&_p]:type-sans-20-50 [&_h1,&_p]:text-pretty [&_*+*]:mt-[1lh]">
        <StoryblokText
          v-if="storyblokRichTextContent(block.text)"
          :content="block.text"
        />
      </div>
    </div>
  </div>
</template>
