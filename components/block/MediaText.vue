<script lang="ts" setup>
import { storyblokAssetType, storyblokRichTextContent } from '@/utilities/storyblok'
import type { BlockMediaTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockMediaTextStoryblok
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="props.block"
    class="block-media-text section wrapper"
  >
    <div class="text-center mb-[calc(var(--app-vertical-rhythm)/2)]">
      <p class="text-16 font-mono">
        {{ props.block.title }}
      </p>
    </div>

    <CoreGrid class="gap-y-[var(--app-vertical-rhythm)]">
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
        v-if="storyblokRichTextContent(props.block.text)"
        :content="props.block.text"
        class="col-span-full block-media-text__richtext text-fluid-lead md:col-span-full prose-p:text-fluid-lead"
      />
    </CoreGrid>
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
