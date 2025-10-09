<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/303510/storyblok-components'

const route = useRoute()
const story = await useStory<Page>(route.path)

const { seo_title, seo_description, seo_image } = story.value.content
const imageOptions = { width: 1200, height: 630, format: 'jpg', smart: true, quality: 90 }

useSeoMeta({
  title: seo_title ?? story.value.name,
  description: seo_description,
  ogTitle: seo_title ?? story.value.name,
  ogDescription: seo_description,
  ogImage: storyblokImage(seo_image?.filename, imageOptions) || null,
  ogType: 'website',
  twitterTitle: seo_title ?? story.value.name,
  twitterCard: 'summary_large_image',
  twitterImage: storyblokImage(seo_image?.filename, imageOptions) || null,
})
</script>

<template>
  <div>
    <BlockHero
      v-if="story?.content.hero?.[0]"
      :block="story.content.hero[0]"
    />

    <div class="bg-offwhite">
      <AppBlocks
        v-if="story"
        :content="story.content"
      />
    </div>
  </div>
</template>
