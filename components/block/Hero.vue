<script lang="ts" setup>
import type { BlockHeroStoryblok } from '@/types/storyblok'
import { storyblokAssetType, storyblokEditor } from '@/utilities/storyblok'

interface Props {
  block: BlockHeroStoryblok
}

const props = defineProps<Props>()

const route = useRoute()
const isDev = import.meta.dev

const isCoverFinished = useState('isCoverFinished')
const splashSeen = useState('splashSeen')
const video = ref<any | null>(null)

const assetType = computed(() => storyblokAssetType(props.block.media_desktop?.filename || ''))

watch(isCoverFinished, async () => {
  if (video.value)
    await video.value.$el.play()
})
</script>

<template>
  <Teleport
    v-if="props.block.media_desktop"
    to="#hero"
  >
    <div class="block-hero bg-sky">
      <MediaImage
        v-if="props.block.media_desktop && assetType === 'image'"
        :asset="props.block.media_desktop"
        sizes="
        100vw
        sm:100vw
      "
      />

      <MediaVideoSelector
        v-else-if="props.block.media_desktop && assetType === 'video'"
        ref="video"
        :src-small="props.block.media_mobile"
        :src-small-poster="props.block.media_mobile_poster"
        :src-large="props.block.media_desktop"
        :src-large-poster="props.block.media_desktop_poster"
        loop
        muted
        playsinline
        :autoplay="isCoverFinished || splashSeen || isDev || storyblokEditor(route.query) ? true : false"
      />
    </div>
  </Teleport>
</template>

<style lang="postcss">
.block-hero {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
}
</style>
