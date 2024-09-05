<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
</script>

<template>
  <div>
    <section
      v-for="block in content.blocks"
      :key="block._uid"
    >
      <BlockMediaText
        v-if="block.component === 'block_media_text' && !block.hidden"
        :block="block"
      />

      <BlockNewsletter
        v-else-if="block.component === 'block_newsletter' && !block.hidden"
        :block="block"
      />
    </section>
  </div>
</template>
