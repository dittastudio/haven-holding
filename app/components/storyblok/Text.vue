<script lang="ts" setup>
import type { StoryblokRichtext } from '@@/.storyblok/types/storyblok'

interface Props {
  content?: StoryblokRichtext | undefined
}

const { content } = defineProps<Props>()
</script>

<template>
  <StoryblokRichText
    v-if="content"
    :doc="content"
  />
</template>
