<script lang="ts" setup>
import type { BlockTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const props = defineProps<Props>()
</script>

<template>
  <div
    v-editable="props.block"
    class="section wrapper"
  >
    <p>{{ props.block.text }}</p>
  </div>
</template>
