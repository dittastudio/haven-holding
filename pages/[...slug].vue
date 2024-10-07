<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

useStoryblokSetup<PageStoryblok>(story)
</script>

<template>
  <div>
    <BlockHero
      v-if="story?.content.hero?.[0]"
      :block="story.content.hero[0]"
    />

    <div class="bg-offwhite">
      <ContentBlocks
        v-if="story"
        :content="story.content"
      />
    </div>
  </div>
</template>
