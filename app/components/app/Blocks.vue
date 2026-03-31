<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/303510/storyblok-components'
import { colourBackground, colourText } from '@/utils/maps'

interface Props {
  content: Page
}

const { content } = defineProps<Props>()

const getBlockColour = (block: NonNullable<Page['blocks']>[0]) => {
  return 'colour' in block && block.colour ? colourText[block.colour] : ''
}

const getBlockBackground = (block: NonNullable<Page['blocks']>[0]) => {
  return 'background' in block && block.background ? colourBackground[block.background] : ''
}

const getBlockAnchorId = (block: NonNullable<Page['blocks']>[0]) => {
  return 'anchor_id' in block && block.anchor_id ? block.anchor_id : undefined
}

const checkBackgroundMatchesPrevBackground = (index: number) => {
  if (index === 0) {
    return false
  }

  const currentBlock = content?.blocks?.[index]
  const prevBlock = content?.blocks?.[index - 1]

  return currentBlock && prevBlock && 'background' in currentBlock && 'background' in prevBlock
    ? currentBlock.background === prevBlock.background
    : false
}
</script>

<template>
  <section
    v-for="(block, index) in content.blocks"
    :id="getBlockAnchorId(block)"
    :key="block._uid"
    class="app-blocks__item"
    :class="[
      `app-blocks__item--${block.component}`,
      getBlockColour(block),
      getBlockBackground(block),
      checkBackgroundMatchesPrevBackground(index) ? 'app-blocks__item--same-background' : '',
    ]"
  >
    <BlockMedia
      v-if="block.component === 'block_media'"
      :block="block"
    />

    <BlockMediaText
      v-else-if="block.component === 'block_media_text'"
      :block="block"
    />

    <BlockNewsletter
      v-else-if="block.component === 'block_newsletter'"
      :block="block"
    />

    <BlockText
      v-else-if="block.component === 'block_text'"
      :block="block"
    />

    <BlockTextGroup
      v-else-if="block.component === 'block_text_group'"
      :block="block"
    />

    <BlockCarousel
      v-else-if="block.component === 'block_carousel'"
      :block="block"
    />
  </section>
</template>

<style lang="postcss">
.app-blocks__item {
  padding-block: var(--app-vertical-rhythm);

  &:first-child {
    padding-block-start: calc(var(--app-vertical-rhythm) / 2);
  }
}

.app-blocks__item:not([class*="bg-"]) + .app-blocks__item.bg-offwhite,
.app-blocks__item.bg-offwhite + .app-blocks__item:not([class*="bg-"]),
.app-blocks__item--same-background,
.app-blocks__item:not([class*="bg-"]) + .app-blocks__item:not([class*="bg-"]) {
  padding-block-start: 0;
}

.app-blocks__item--block_text:first-child {
  padding-block-start: calc(var(--app-vertical-rhythm) * 0.75);
}

.app-blocks__item--block_carousel {
  padding-block: 0;
}
</style>
