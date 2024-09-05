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
    class="section wrapper"
  >
    <div class="text-center mb-[calc(var(--app-vertical-rhythm)/2)]">
      <p class="font-mono text-16">
        {{ block.title }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-y-[var(--app-vertical-rhythm)]">
      <div class="md:col-span-6 md:col-start-4 relative aspect-3/2 overflow-hidden">
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
