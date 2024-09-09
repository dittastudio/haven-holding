<script lang="ts" setup>
import type { BlockNewsletterStoryblok } from '@/types/storyblok'
import { storyblokAssetType, storyblokRichTextContent } from '@/utilities/storyblok'

interface Props {
  block: BlockNewsletterStoryblok
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="bg-lavender text-white"
  >
    <div class="section wrapper">
      <div class="text-center mb-[calc(var(--app-vertical-rhythm)/2)]">
        <p class="font-mono text-16">
          {{ block.title }}
        </p>
      </div>

      <CoreGrid class="items-center">
        <div class="md:col-start-2 md:col-span-5">
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

        <div class="md:col-span-4 md:col-start-8 flex flex-col gap-y-64">
          <StoryblokRichText
            v-if="storyblokRichTextContent(block.text)"
            :content="block.text"
            class="prose-p:text-20"
          />

          <div>
            <FormSignUp />
          </div>
        </div>
      </CoreGrid>
    </div>
  </div>
</template>
