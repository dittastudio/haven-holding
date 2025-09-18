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

const checkBackgroundMatchesPrevBackground = (index: number) => {
  if (index === 0)
    return false

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
    :key="block._uid"
    class="content-blocks__item"
    :class="[
      `content-blocks__item--${block.component}`,
      getBlockColour(block),
      getBlockBackground(block),
      checkBackgroundMatchesPrevBackground(index) ? 'content-blocks__item--same-background' : '',
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
  </section>
</template>

<style lang="postcss">
.content-blocks__item {
  padding-block: var(--app-vertical-rhythm);

  &:first-child {
    padding-block-start: calc(var(--app-vertical-rhythm) / 2);
  }
}

.content-blocks__item:not([class*="bg-"]) + .content-blocks__item.bg-offwhite,
.content-blocks__item.bg-offwhite + .content-blocks__item:not([class*="bg-"]) {
  padding-block-start: 0;
}

.content-blocks__item--same-background {
  padding-block-start: 0;
}

.content-blocks__item--block_text:first-child {
  padding-block-start: calc(var(--app-vertical-rhythm) * 0.75);
}
</style>
