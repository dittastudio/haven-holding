<script lang="ts">
import type { KeenSliderInstance, KeenSliderOptions, TrackDetails } from 'keen-slider'
</script>

<script generic="T" lang="ts" setup>
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'

export interface Carousel {
  carousel: {
    slider: Ref<KeenSliderInstance>
    details: Ref<TrackDetails>
  }
}

interface Props<T> {
  items?: T[]
  options?: KeenSliderOptions
  perView?: number
  spacing?: number
}

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

const carousel = {
  slider,
  details,
}

defineExpose({
  carousel,
})
</script>

<template>
  <div class="@container/carousel size-full">
    <div
      ref="container"
      class="group/carousel keen-slider size-full"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="keen-slider__slide"
        :class="[slideClassesMap.get(index)]"
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
