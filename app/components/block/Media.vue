<script lang="ts" setup>
import type { BlockMedia } from '@@/.storyblok/types/303510/storyblok-components'

interface Props {
  block: BlockMedia
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
const columnSpan = computed(() => Number(block.column_end) - Number(block.column_start))
</script>

<template>
  <div
    v-editable="block"
    data-component="block-media"
    class="wrapper md:grid md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter)"
  >
    <div
      :class="[
        colStartMap[block.column_start],
        colEndMap[block.column_end],
      ]"
    >
      <MediaImage
        v-if="block.media && assetType === 'image'"
        :asset="block.media"
        :ratio="block.ratio"
        :sizes="`
          100vw
          sm:100vw
          md:${columnSpan / 12 * 100}vw
          3xl:${columnSpan / 12 * 1920}px
        `"
      />

      <MediaVideo
        v-else-if="block.media && assetType === 'video'"
        :asset="block.media"
        :ratio="block.ratio"
      />

      <p
        v-if="block.caption"
        class="
          block-media__caption
          type-mono-14
          relative
          mt-3
          ps-[1em]
          before:absolute
          before:top-0
          before:bottom-0
          before:left-0
          before:size-[0.4em]
          before:m-auto
          before:border
          before:border-current
          before:rounded-full
        "
      >
        {{ block.caption }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

@keyframes caption-scroll-effect {
  0% {
    translate: calc(-1 * --spacing(3)) 0 0;
    opacity: 0;
  }
}

.block-media__caption {
  animation-name: caption-scroll-effect;
  animation-timing-function: var(--ease-smooth);
  animation-fill-mode: both;
  animation-timeline: --caption-timeline;
  view-timeline-name: --caption-timeline;

  animation-range: entry 25% cover 25%;
}
</style>
