<script lang="ts" setup>
import type { BlockMediaTextStoryblok } from '@/types/storyblok'
import { storyblokAssetType, storyblokRichTextContent } from '@/utilities/storyblok'

interface Props {
  block: BlockMediaTextStoryblok
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="section wrapper"
  >
    <div class="text-center mb-[calc(var(--app-vertical-rhythm)/2)]">
      <p class="font-mono text-16">
        {{ block.title }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-y-[var(--app-vertical-rhythm)]">
      <div class="col-span-full md:col-span-8 md:col-start-3">
        <MediaImage
          v-if="block.media && assetType === 'image'"
          :asset="block.media"
          :ratio="block.ratio"
          :lazy="true"
          sizes="
            100vw
            sm:100vw
          "
        />

        <MediaVideo
          v-else-if="block.media && assetType === 'video'"
          :asset="block.media"
          :ratio="block.ratio"
        />
      </div>

      <StoryblokRichText
        v-if="storyblokRichTextContent(block.text)"
        :content="block.text"
        class=" block-media-text__richtext text-fluid-lead md:col-span-full prose-p:text-fluid-lead"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.block-media-text__richtext {
  max-width: 65ch;
  margin-inline: auto;

 & p + p {
    margin-block-start: 1em;
  }
}
</style>
