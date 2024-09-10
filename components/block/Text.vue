<script lang="ts" setup>
import type { BlockTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="section wrapper"
  >
    <p>{{ block.text }}</p>
  </div>
</template>
