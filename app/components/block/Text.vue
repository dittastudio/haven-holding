<script lang="ts" setup>
import type { BlockText } from '@@/.storyblok/types/303510/storyblok-components'

interface Props {
  block: BlockText
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="
      block-text
      wrapper
      [&_h1]:type-sans-40-65
      [&_h2,_&_h3]:type-mono-16
      [&_p]:type-sans-20-50
    "
  >
    <StoryblokText
      v-if="storyblokRichTextContent(block.text)"
      :content="block.text"
    />
  </div>
</template>

<style>
@reference "@/assets/css/main.css";

.block-text {
  & p + p {
    margin-block-start: 0.5em;
  }

  & :is(h1, h2, h3, h4, h5, h6) {
    font-weight: normal;
    text-wrap: balance;
  }

  & h1 {
    margin-block-end: var(--app-vertical-rhythm);
    text-align: center;
  }

  & :is(h2, h3) {
    margin-block-end: calc(var(--app-vertical-rhythm) * 0.5);
    padding-inline: var(--app-outer-gutter);
    text-align: center;
  }

  & p {
    text-wrap: pretty;
  }

  & p + h2,
  & p + h3 {
    margin-block-start: calc(var(--app-vertical-rhythm) * 1.25);
  }

  & hr {
    margin-block: calc(var(--app-vertical-rhythm) * 0.5);
    opacity: 0.2;
  }

  & p a {
    text-decoration: underline;
    transition: opacity 0.2s var(--ease-out);

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
