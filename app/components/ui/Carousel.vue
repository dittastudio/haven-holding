<script generic="T" lang="ts" setup>
import type { KeenSliderInstance, KeenSliderOptions, TrackDetails } from 'keen-slider'
import { useKeenSlider } from 'keen-slider/vue.es'

export interface Carousel {
  carousel: {
    slider: Ref<KeenSliderInstance>
    details: Ref<TrackDetails>
    next: () => Ref<KeenSliderInstance>
    previous: () => Ref<KeenSliderInstance>
  }
}

interface Props<T> {
  items?: T[]
  options?: KeenSliderOptions
  perView?: number
  spacing?: number
}

// interface Emits {
//   (e: 'created', slider: KeenSliderInstance): void
//   (e: 'slideChanged', slider: KeenSliderInstance): void
// }

const {
  items,
  options = {},
  perView = 1,
  spacing = 0,
} = defineProps<Props<T>>()

const details = ref<TrackDetails>()
const slideClassesMap = ref<Map<number, string | string[] | Record<string, boolean>>>(new Map())

const [container, slider] = useKeenSlider({
  loop: false,
  mode: 'snap',
  dragSpeed: 1,
  rubberband: true,
  defaultAnimation: {
    duration: 500,
  },
  slides: {
    perView,
    spacing,
  },
  created(slider) {
    details.value = slider.track.details

    slider.on('detailsChanged', (s) => {
      details.value = s.track.details
    })
  },
  ...options,
})

watch(() => [perView, spacing], ([newPerView, newSpacing]) => {
  slider.value?.update({
    defaultAnimation: {
      duration: 500,
    },
    slides: {
      perView: newPerView,
      spacing: newSpacing,
    },
    ...options,
  })
})

const next = () => {
  slider.value?.next()
}

const previous = () => {
  slider.value?.prev()
}

const carousel = {
  slider,
  details,
  next,
  previous,
}

defineExpose({
  carousel,
})
</script>

<template>
  <div class="size-full">
    <div
      ref="container"
      class="keen-slider size-full relative flex touch-pan-y select-none"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="keen-slider__slide shrink-0"
        :class="[
          slideClassesMap.get(index),
          { 'is-active': details?.abs === index },
        ]"
      >
        <slot
          name="item"
          :item="item"
          :index="index"
          :set-slide-classes="(classes: string | string[] | Record<string, boolean>) => { slideClassesMap.set(index, classes) }"
        />
      </div>
    </div>
  </div>
</template>
