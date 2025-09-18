<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  asset: StoryblokAsset
  ratio?: App.TAspectRatios | string | number
}

const { asset, ratio = 'auto' } = defineProps<Props>()

interface Emits {
  (event: 'seen' | 'playing', payload: boolean): void
}

const emit = defineEmits<Emits>()

const video = ref<HTMLVideoElement | null>(null)
const seen = ref(false)
const src = computed(() => seen.value && asset?.filename ? asset.filename : undefined)

useIntersectionObserver(
  video,
  ([entry]) => {
    if (!entry || !(entry.target instanceof HTMLVideoElement)) {
      return
    }

    if (entry.isIntersecting && !seen.value) {
      emit('seen', true)
      seen.value = true
    }
    else if (entry.isIntersecting && seen.value && src.value && entry.target.paused) {
      entry.target.play()
    }
    else if (!entry.isIntersecting && seen.value && src.value && !entry.target.paused) {
      entry.target.pause()
    }
  },
  { rootMargin: '50% 0px 50% 0px', threshold: 0 },
)

onMounted(() => {
  video.value?.addEventListener('playing', () => emit('playing', true))
  video.value?.addEventListener('pause', () => emit('playing', false))
})

onUnmounted(() => {
  video.value?.removeEventListener('playing', () => emit('playing', true))
  video.value?.removeEventListener('pause', () => emit('playing', false))
})
</script>

<template>
  <video
    v-if="asset"
    ref="video"
    :src="src"
    playsinline
    autoplay
    muted
    loop
    class="w-full h-[inherit] object-cover"
    :class="ratioMap[ratio]"
  />
</template>
