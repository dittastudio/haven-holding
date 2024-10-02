<script lang="ts" setup>
import type { BlockMediaStoryblok } from '@/types/storyblok'
import { colEndMap, colStartMap } from '@/utilities/maps'
import { storyblokAssetType } from '@/utilities/storyblok'

interface Props {
  block: BlockMediaStoryblok
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.block.media?.filename || ''))
const columnSpan = computed(() => Number(props.block.column_end) - Number(props.block.column_start))
</script>

<template>
  <div
    v-editable="block"
    class="block-media wrapper"
  >
    <div
      :class="[
        colStartMap[props.block.column_start],
        colEndMap[props.block.column_end],
      ]"
    >
      <MediaImage
        v-if="props.block.media && assetType === 'image'"
        class="block-media__media"
        :asset="props.block.media"
        :ratio="props.block.ratio"
        :sizes="`
          100vw
          sm:100vw
          md:${columnSpan / 12 * 100}vw
          3xl:${columnSpan / 12 * 1920}px
        `"
      />

      <MediaVideo
        v-else-if="props.block.media && assetType === 'video'"
        class="block-media__media"
        :asset="props.block.media"
        :ratio="props.block.ratio"
      />

      <p
        v-if="props.block.caption"
        class="block-media__caption text-14 font-mono"
      >
        {{ props.block.caption }}
      </p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-media {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

@keyframes caption-scroll-effect {
  0% {
    translate: calc(-1 * theme('spacing.12')) 0 0;
    opacity: 0;
  }
}

.block-media__caption {
  position: relative;

  margin-block-start: theme('spacing.12');
  padding-inline-start: 1em;

  animation-name: caption-scroll-effect;
  animation-timing-function: theme('transitionTimingFunction.smooth');
  animation-fill-mode: both;
  animation-timeline: --caption-timeline;
  view-timeline-name: --caption-timeline;

  animation-range: entry 25% cover 25%;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    width: 0.4em;
    height: 0.4em;
    margin: auto;

    border:thin solid currentColor;
    border-radius: 50%;
  }
}
</style>
