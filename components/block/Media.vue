<script lang="ts" setup>
import { colEndMap, colStartMap } from '@/utilities/maps'
import { storyblokAssetType } from '@/utilities/storyblok'
import type { BlockMediaStoryblok } from '@/types/storyblok'

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
    class="block-media section wrapper"
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
          3xl:${columnSpan / 12 * 1800}px
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
        class="block-media__caption text-12 font-mono opacity-50"
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

.block-media__media {
  border-radius: theme('borderRadius.sm');
}

.block-media__caption {
  margin-block-start: theme('spacing.8');
  font-style: italic;
}
</style>
