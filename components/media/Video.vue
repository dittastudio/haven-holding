<script lang="ts" setup>
import type { AssetStoryblok } from '@/types/storyblok'
import { ratioMap } from '@/utilities/maps'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  asset: AssetStoryblok
  ratio?: ditta.TAspectRatios | string | number
}

const props = withDefaults(defineProps<Props>(), {
  ratio: 'auto',
})

interface Emits {
  (event: 'seen' | 'playing', payload: boolean): void
}

const emit = defineEmits<Emits>()

const video = ref<HTMLVideoElement | null>(null)
const seen = ref(false)
const src = computed(() => seen.value ? props.asset?.filename : '')

useIntersectionObserver(
  video,
  ([{ target, isIntersecting }]) => {
    if (!(target instanceof HTMLVideoElement)) {
      return
    }

    if (isIntersecting && !seen.value) {
      emit('seen', true)
      seen.value = true
    }
    else if (isIntersecting && seen.value && src.value && target.paused) {
      target.play()
    }
    else if (!isIntersecting && seen.value && src.value && !target.paused) {
      target.pause()
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
    v-if="props.asset"
    ref="video"
    :src="src"
    playsinline
    autoplay
    muted
    loop
    class="w-full h-[inherit] object-cover"
    :class="ratioMap[props.ratio]"
  />
</template>
