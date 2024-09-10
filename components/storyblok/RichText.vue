<script lang="ts" setup>
import { BlockTypes, richTextResolver, type StoryblokRichTextOptions } from '@storyblok/richtext'

const { render } = richTextResolver({
  resolvers: {
    [BlockTypes.BR]: _node => '<br>',
  },
})

interface Props {
  content?: StoryblokRichTextOptions<any>
}

const props = defineProps<Props>()

const html = computed(() => (props.content ? render(props.content) : ''))
</script>

<template>
  <div v-html="html" />
</template>
