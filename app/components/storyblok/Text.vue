<script lang="ts" setup>
import type { StoryblokRichtext } from '@@/.storyblok/types/storyblok'
import type { StoryblokRichTextNode } from '@storyblok/vue'
import { NuxtLink } from '#components'

const resolvers = {
  [MarkTypes.LINK]: (node: StoryblokRichTextNode<VNode>) =>
    h(NuxtLink, {
      to: storyblokSlug(node.attrs?.href),
      target: node.attrs?.target,
    }, { default: () => node.text ?? '' }),
  [BlockTypes.BR]: () => h('br'),
}

interface Props {
  content?: StoryblokRichtext | undefined
}

const { content } = defineProps<Props>()
</script>

<template>
  <StoryblokRichText
    v-if="content"
    :doc="content"
    :resolvers="resolvers"
  />
</template>
