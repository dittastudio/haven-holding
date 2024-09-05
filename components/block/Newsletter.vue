<script lang="ts" setup>
import type { BlockNewsletterStoryblok } from '@/types/storyblok'
import { storyblokRichTextContent } from '@/utilities/storyblok'

interface Props {
  block: BlockNewsletterStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div class="block-newsletter bg-sage text-offwhite">
    <div class="section wrapper">
      <div class="text-center">
        <p class="font-mono text-16">
          {{ block.title }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-32 items-center justify-evenly">
        <div class="md:col-start-2 md:col-span-5">
          <div class="relative aspect-3/4 rounded-3 overflow-hidden">
            <img
              v-if="block.media"
              class="w-full h-full object-cover"
              :src="block.media?.filename"
              :alt="block.media?.alt"
            >
          </div>
        </div>

        <div class="md:col-span-4 md:col-start-8">
          <StoryblokRichText
            v-if="storyblokRichTextContent(block.text)"
            :content="block.text"
            class="prose-p:text-20"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-newsletter {
}
</style>
