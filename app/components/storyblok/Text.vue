<script lang="ts" setup>
import type { StoryblokRichtext } from '@@/.storyblok/types/storyblok'
import type { StoryblokRichTextNode } from '@storyblok/vue'
import { resolveComponent } from 'vue'

const resolvers = {
  [MarkTypes.LINK]: (node: StoryblokRichTextNode<VNode>) => {
    const href = node.attrs?.href
    const linktype = node.attrs?.linktype

    const item = {
      linktype,
      email: linktype === 'email' ? href : undefined,
      cached_url: linktype !== 'email' ? href : undefined,
      target: node.attrs?.target,
    }

    return h(resolveComponent('StoryblokLink'), {
      item,
    }, { default: () => node.text ?? '' })
  },
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
