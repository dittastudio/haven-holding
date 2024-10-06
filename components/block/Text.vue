<script lang="ts" setup>
import type { BlockTextStoryblok } from '@/types/storyblok'
import { storyblokRichTextContent } from '@/utilities/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text wrapper"
  >
    <StoryblokRichText
      v-if="storyblokRichTextContent(block.text)"
      class="block-text__richtext prose-headings:font-normal prose-headings:text-balance prose-h1:text-40 prose-h1:md:text-65 prose-h2:font-mono prose-h3:font-mono prose-h2:text-16 prose-h3:text-16 prose-p:text-fluid-lead-xs-xl prose-p:xl:text-fluid-lead-xl-3xl prose-p:text-pretty"
      :content="block.text"
    />
  </div>
</template>

<style lang="postcss">
.block-text__richtext {
  & p + p {
    margin-block-start: 0.5em;
  }

  h1 {
    margin-block-end: var(--app-vertical-rhythm);
    text-align: center;
  }

  h2, h3 {
    margin-block-end: calc(var(--app-vertical-rhythm) * 0.5);
    text-align: center
  }

  p + h2,
  p + h3 {
    margin-block-start: calc(var(--app-vertical-rhythm) * 1.25);
  }

  hr {
    margin-block: calc(var(--app-vertical-rhythm) * 0.5);
    opacity: 0.2;
  }

  p a {
    text-decoration: underline;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
