<script lang="ts" setup>
import { colourBackground, colourText } from '@/utilities/maps'
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const props = defineProps<Props>()

const checkBackgroundMatchesPrevBackground = (index: number) => {
  if (index === 0)
    return false
  return props.content?.blocks[index].background === props.content.blocks[index - 1].background
}
</script>

<template>
  <section
    v-for="(block, index) in props.content.blocks"
    :key="block._uid"
    class="content-blocks__item"
    :class="[
      `content-blocks__item--${block.component}`,
      block.colour ? colourText[block.colour] : '',
      block.background ? colourBackground[block.background] : '',
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
.content-blocks__item.bg-offwhite + .content-blocks__item:not([class*="bg-"])  {
  padding-block-start: 0;
}

.content-blocks__item--same-background {
  padding-block-start: 0;
}
</style>
