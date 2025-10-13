<script lang="ts" setup>
import type { StoryblokRichtext } from '@@/.storyblok/types/storyblok'
import type { StoryblokRichTextNode } from '@storyblok/vue'
import { NuxtLink } from '#components'

const resolvers = {
  [MarkTypes.LINK]: (node: StoryblokRichTextNode<VNode>) => {
    const href = node.attrs?.href
    const linktype = node.attrs?.linktype

    // Add mailto: prefix for email links
    const to = linktype === 'email' && href
      ? `mailto:${href}`
      : storyblokSlug(href)

    return h(NuxtLink, {
      to,
      target: node.attrs?.target,
    }, { default: () => node.text ?? '' })
  },
}

interface Props {
  content?: StoryblokRichtext | undefined
}

const { content } = defineProps<Props>()
</script>

<template>
  <!-- <pre>{{ content }}</pre> -->

  <StoryblokRichText
    v-if="content"
    :doc="content"
    :resolvers="resolvers"
  />
</template>
