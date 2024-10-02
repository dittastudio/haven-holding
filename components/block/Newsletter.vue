<script lang="ts" setup>
import type { BlockNewsletterStoryblok } from '@/types/storyblok'
import { storyblokAssetType, storyblokRichTextContent } from '@/utilities/storyblok'

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

    <div class="block-newsletter__grid">
      <div class="block-newsletter__media">
        <MediaImage
          v-if="props.block.media && assetType === 'image'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
          :sizes="`
            100vw
            sm:100vw
            md:${5 / 12 * 100}vw
            3xl:${5 / 12 * 1920}px
          `"
        />

        <MediaVideo
          v-else-if="props.block.media && assetType === 'video'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
        />
      </div>

      <div class="block-newsletter__text">
        <StoryblokRichText
          v-if="storyblokRichTextContent(props.block.text)"
          :content="props.block.text"
          class="prose-p:text-20 prose-p:text-pretty"
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
  margin-block-end: calc(var(--app-vertical-rhythm) / 1.25);
  text-align: center;

  @screen md {
    margin-block-end: calc(var(--app-vertical-rhythm) / 1.5);
  }
}

.block-newsletter__grid {
  display: grid;
  grid-template-columns: var(--app-grid);
  gap: calc(var(--app-vertical-rhythm) / 2) var(--app-inner-gutter);
  align-items: center;
}

.block-newsletter__media {
  grid-column: span 12;

  @screen md {
    grid-column: 2 / span 5;
    margin-inline-end: calc(var(--app-inner-gutter) / -2);
  }

  @screen mdMax {
    padding-inline: var(--app-outer-gutter);
  }
}

.block-newsletter__text {
  display: flex;
  grid-column: span 12;
  flex-direction: column;
  gap: calc(var(--app-vertical-rhythm) / 2);

  @screen md {
    grid-column: 7 / span 5;
    padding-inline-start: var(--app-inner-gutter);
  }

  @screen lg {
    grid-column: 8 / span 4;
    padding-inline-start: 0;
  }
}
</style>
