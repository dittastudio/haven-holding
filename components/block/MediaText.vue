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
    class="block-media-text wrapper"
  >
    <p class="block-media-text__title text-16 font-mono">
      {{ props.block.title }}
    </p>

    <div class="block-media-text__grid">
      <div class="block-media-text__media">
        <MediaImage
          v-if="props.block.media && assetType === 'image'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
          :sizes="`
            100vw
            sm:100vw
            md:${(8 / 12 * 100).toFixed(0)}vw
            xl:${(6 / 12 * 100)}vw
            3xl:${6 / 12 * 1920}px
          `"
        />

        <MediaVideo
          v-else-if="props.block.media && assetType === 'video'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
        />
      </div>

      <StoryblokRichText
        v-if="storyblokRichTextContent(props.block.text)"
        :content="props.block.text"
        class="block-media-text__richtext prose-p:text-fluid-lead-xs-xl prose-p:xl:text-fluid-lead-xl-3xl"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.block-media-text__title {
  margin-block-end: calc(var(--app-vertical-rhythm) / 1.25);
  text-align: center;

  @screen md {
    margin-block-end: calc(var(--app-vertical-rhythm) / 1.5);
  }
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

.block-media-text__media {
  @screen md {
    grid-column: 3 / span 8;
  }

  @screen xl {
    grid-column: 4 / span 6;
  }

  @screen mdMax {
    padding-inline: var(--app-outer-gutter);
  }
}

.block-media-text__richtext {
  grid-column: 1 / -1;

  & p + p {
    margin-block-start: 1em;
  }
}
</style>
