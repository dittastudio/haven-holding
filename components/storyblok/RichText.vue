<script lang="ts" setup>
import { richTextResolver, type StoryblokRichTextOptions } from '@storyblok/richtext'

const { render } = richTextResolver()

interface Props {
  content?: StoryblokRichTextOptions<any>
}

const { content } = defineProps<Props>()
const html = computed(() => (content ? render(content) : ''))
</script>

<template>
  <div v-html="html" />
</template>
