<script lang="ts" setup>
import type { BlockMediaText } from '@@/.storyblok/types/303510/storyblok-components'

interface Props {
  block: BlockMediaText
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="props.block"
    class="block-media-text wrapper"
  >
    <p class="block-media-text__title text-16 font-mono leading-1.4">
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

      <div class="block-media-text__richtext [&_p]:text-fluid-lead-xs-xl [&_p]:xl:text-fluid-lead-xl-3xl [&_p]:text-pretty [&_p]:leading-1.4">
        <StoryblokText
          v-if="storyblokRichTextContent(props.block.text)"
          :content="props.block.text"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.block-media-text__title {
  margin-block-end: calc(var(--app-vertical-rhythm) / 1.25);
  text-align: center;

  @variant md {
    margin-block-end: calc(var(--app-vertical-rhythm) / 1.5);
  }
}

.block-media-text__grid {
  display: flex;
  flex-direction: column;
  gap: var(--app-vertical-rhythm) var(--app-inner-gutter);

  @variant md {
    display: grid;
    grid-template-columns: var(--app-grid);
  }
}

.block-media-text__media {
  @variant md {
    grid-column: 3 / span 8;
  }

  @variant xl {
    grid-column: 4 / span 6;
  }

  @variant max-md {
    padding-inline: var(--app-outer-gutter);
  }
}

.block-media-text__richtext {
  grid-column: 1 / -1;

  & :deep(p + p) {
    margin-block-start: 1em;
  }
}
</style>
