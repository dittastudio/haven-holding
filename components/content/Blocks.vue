<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
</script>

<template>
  <section
    v-for="block in content.blocks"
    :key="block._uid"
    class="content-blocks__item"
    :class="`content-blocks__item--${block.component}`"
  >
    <BlockMediaText
      v-if="block.component === 'block_media_text' && !block.hidden"
      :block="block"
    />

    <BlockNewsletter
      v-else-if="block.component === 'block_newsletter' && !block.hidden"
      :block="block"
    />

    <BlockText
      v-else-if="block.component === 'block_text' && !block.hidden"
      :block="block"
    />
  </section>
</template>

<style lang="postcss">
.content-blocks__item {
  &:first-child > * {
    padding-block-start: calc(var(--app-vertical-rhythm) / 2);
  }
}
</style>
