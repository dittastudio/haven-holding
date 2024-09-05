<script lang="ts" setup>
import type { BlockMediaTextStoryblok } from '@/types/storyblok'
import { storyblokRichTextContent } from '@/utilities/storyblok'

interface Props {
  block: BlockMediaTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-media-text section wrapper"
  >
    <div class="text-center">
      <p class="font-mono text-16">
        {{ block.title }}
      </p>
    </div>

    <div class="relative aspect-3/2 rounded-3 overflow-hidden">
      <img
        v-if="block.media"
        class="w-full h-full object-cover"
        :src="block.media?.filename"
        :alt="block.media?.alt"
      >
    </div>

    <StoryblokRichText
      v-if="storyblokRichTextContent(block.text)"
      :content="block.text"
      class="block-media-text__richtext prose-p:text-fluid-lead"
    />
  </div>
</template>

<style lang="postcss">
.block-media-text__richtext {
 & p + p {
    margin-block-start: 1em;
  }
}
</style>
