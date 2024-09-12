<script lang="ts" setup>
import { colEndMap, colStartMap } from '@/utilities/maps'
import { storyblokAssetType, storyblokRichTextContent } from '@/utilities/storyblok'
import type { BlockMediaTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockMediaTextStoryblok
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.block.media?.filename || ''))
const columnSpan = computed(() => Number(props.block.column_end) - Number(props.block.column_start))
</script>

<template>
  <div
    v-editable="props.block"
    class="block-media-text wrapper"
  >
    <p class="block-media-text__title text-16 font-mono">
      {{ props.block.title }}
    </p>

    <div class="block-media-text__grid">
      <div
        :class="[
          colStartMap[props.block.column_start],
          colEndMap[props.block.column_end],
        ]"
      >
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
        class="block-media-text__richtext text-fluid-lead prose-p:text-fluid-lead prose-p:text-pretty"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.block-media-text__title {
  margin-block-end: var(--app-vertical-rhythm);
  text-align: center;
}

.block-media-text__grid {
  display: flex;
  flex-direction: column;
  gap: var(--app-vertical-rhythm) var(--app-inner-gutter);

  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
  }
}

.block-media-text__richtext {
  grid-column: 1 / -1;
  max-width: 65ch;
  margin-inline: auto;

 & p + p {
    margin-block-start: 1em;
  }
}
</style>
