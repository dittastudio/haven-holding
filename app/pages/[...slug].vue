<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/303510/storyblok-components'

const route = useRoute()
const story = await useStory<Page>(route.path)
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
