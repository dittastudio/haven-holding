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
        Coming soon in 2025
      </p>
    </div>

    <img
      v-if="block.media"
      :src="block.media?.filename"
      :alt="block.media?.alt"
    >

    <StoryblokRichText
      v-if="storyblokRichTextContent(block.text)"
      :content="block.text"
      class="block-media-text__richtext prose-p:text-fluid-lead "
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
