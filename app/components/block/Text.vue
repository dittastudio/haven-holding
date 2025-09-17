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
    class="block-text wrapper"
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
    font-size: var(--text-fluid-h1-sm-3xl);
    line-height: var(--leading-1\.3);
    margin-block-end: var(--app-vertical-rhythm);
    text-align: center;
  }

  & :is(h2, h3) {
    font-family: var(--font-mono);
    font-size: var(--text-16);
    line-height: var(--leading-1\.4);
    margin-block-end: calc(var(--app-vertical-rhythm) * 0.5);
    padding-inline: var(--app-outer-gutter);
    text-align: center;
  }

  & p {
    font-size: var(--text-fluid-lead-xs-xl);
    line-height: var(--leading-1\.3);
    text-wrap: pretty;

    @variant md {
      font-size: var(--text-fluid-lead-xl-3xl);
    }
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
    transition: opacity 0.2s var(--ease-smooth);

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
