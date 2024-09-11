<script lang="ts" setup>
import { colourBackground, colourText } from '@/utilities/maps'
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const props = defineProps<Props>()
</script>

<template>
  <section
    v-for="block in props.content.blocks"
    :key="block._uid"
    class="content-blocks__item"
    :class="[
      `content-blocks__item--${block.component}`,
      colourText[block.colour],
      colourBackground[block.background],
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
/* DO RECIPES FOR SPACING WITH THEMES */
.content-blocks__item {
  &:first-child > * {
    padding-block-start: calc(var(--app-vertical-rhythm) / 2);
  }
}
</style>
