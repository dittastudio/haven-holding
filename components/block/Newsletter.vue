<script lang="ts" setup>
import { storyblokAssetType, storyblokRichTextContent } from '@/utilities/storyblok'
import type { BlockNewsletterStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockNewsletterStoryblok
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="props.block"
    class="block-newsletter wrapper"
  >
    <p class="block-newsletter__title text-16 font-mono">
      {{ props.block.title }}
    </p>

    <div class="block-newsletter__grid gap-y-[calc(var(--app-vertical-rhythm)/2)] items-center">
      <div class="col-span-full md:col-start-2 md:col-span-5">
        <MediaImage
          v-if="props.block.media && assetType === 'image'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
          :sizes="`
            100vw
            sm:100vw
            md:${5 / 12 * 100}vw
            3xl:${5 / 12 * 1800}px
          `"
        />

        <MediaVideo
          v-else-if="props.block.media && assetType === 'video'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
        />
      </div>

      <div class="col-span-full md:col-span-4 md:col-start-8 gap-y-64 flex flex-col">
        <StoryblokRichText
          v-if="storyblokRichTextContent(props.block.text)"
          :content="props.block.text"
          class="prose-p:text-20"
        />

        <div>
          <FormSignUp />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-newsletter__title {
  margin-block-end: calc(var(--app-vertical-rhythm) / 2);
  text-align: center;
}

.block-newsletter__grid {
  display: grid;
  grid-template-columns: var(--app-grid);
  gap: var(--app-inner-gutter);
}
</style>
