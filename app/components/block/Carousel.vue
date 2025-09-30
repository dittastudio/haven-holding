<script lang="ts" setup>
import type { BlockCarousel } from '@@/.storyblok/types/303510/storyblok-components'
import type { Carousel } from '@/components/ui/Carousel.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  block: BlockCarousel
}

const { block } = defineProps<Props>()

const slides = [
  {
    ratio: 'landscape',
    image: '/images/carousel-test-1.jpg',
    caption: 'Lounge Room',
  },
  {
    ratio: 'portrait',
    image: '/images/carousel-test-2.jpg',
    caption: 'Dining Room',
  },
  {
    ratio: 'landscape',
    image: '/images/carousel-test-1b.jpg',
    caption: 'Studio',
  },
  {
    ratio: 'portrait',
    image: '/images/carousel-test-2.jpg',
    caption: 'Office',
  },
  {
    ratio: 'landscape',
    image: '/images/carousel-test-1.jpg',
    caption: 'Living Room',
  },
  {
    ratio: 'portrait',
    image: '/images/carousel-test-2.jpg',
    caption: 'Kitchen',
  },
  {
    ratio: 'landscape',
    image: '/images/carousel-test-1b.jpg',
    caption: 'Bedroom',
  },
  {
    ratio: 'portrait',
    image: '/images/carousel-test-2.jpg',
    caption: 'Bathroom',
  },
  {
    ratio: 'landscape',
    image: '/images/carousel-test-1.jpg',
    caption: 'Balcony',
  },
]

const primary = useTemplateRef('primary')
const image = useTemplateRef('image')
const text = useTemplateRef('text')
const secondary = useTemplateRef('secondary')

const tl = ref<gsap.core.Timeline | null>(null)

const retrigger = ref(0)

const carouselRef = useTemplateRef<Carousel>('carouselRef')
const carouselDetails = computed(() => carouselRef.value?.carousel.details.value)
const carouselCurrentSlide = computed(() => carouselRef.value?.carousel.slider.value?.slides[carouselDetails.value?.abs || 0])
const carouselCurrentMedia = computed(() => carouselCurrentSlide.value?.querySelector('img'))
const carouselCurrentProperties = computed(() => {
  const slide = carouselRef.value?.carousel.slider.value.slides[carouselDetails.value?.abs || 0]
  const media = slide?.querySelector('img')

  if (!media) {
    return null
  }

  const { width, height, top, left } = media.getBoundingClientRect()

  return {
    retrigger: retrigger.value,
    src: media.getAttribute('src'),
    width,
    height,
    top,
    left,
    relativeTop: top - (secondary.value ? secondary.value?.getBoundingClientRect().top : 0) || 0,
  }
})

const sequenceText = () => {
  const spans = text.value?.querySelectorAll('span')

  if (!spans) {
    return
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: primary.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
  })
    .fromTo(
      spans,
      { opacity: 0, yPercent: -50 },
      { opacity: 1, yPercent: 0, stagger: 0.25, ease: 'none' },
    )
    .to(
      text.value,
      { opacity: 0 },
    )
}

const sequenceMedia = () => {
  if (!carouselCurrentMedia.value || !carouselCurrentProperties.value) {
    return
  }

  gsap.set(carouselCurrentMedia.value, { opacity: 0 })

  tl.value = gsap.timeline({
    scrollTrigger: {
      trigger: secondary.value,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
      onLeave: () => {
        if (!carouselCurrentMedia.value) {
          return
        }

        gsap.set(carouselCurrentMedia.value, { opacity: 1 })
        gsap.set(image.value, { opacity: 0 })
      },
      onEnterBack: () => {
        if (!carouselCurrentMedia.value) {
          return
        }

        gsap.set(carouselCurrentMedia.value, { opacity: 0 })
        gsap.set(image.value, { opacity: 1 })
      },
    },
  })
    .fromTo(
      image.value,
      {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      },
      {
        width: () => carouselCurrentProperties.value?.width || 0,
        height: () => carouselCurrentProperties.value?.height || 0,
        top: () => carouselCurrentProperties.value?.relativeTop || 0,
        left: () => carouselCurrentProperties.value?.left || 0,
        ease: 'none',
        lazy: false,
      },
    )
}

onMounted(async () => {
  await wait(100)

  retrigger.value = 1 // Hack to force recompute.

  sequenceText()
  sequenceMedia()
})

const requestRefresh = gsap.delayedCall(0.05, () => {
  tl.value?.invalidate()
  tl.value?.scrollTrigger?.refresh()
}).pause()

watch(
  () => [
    carouselCurrentProperties.value,
  ],
  () => {
    console.log('carouselCurrentProperties changed')
    return requestRefresh.restart(true)
  },
  {
    flush: 'post',
    immediate: false,
  },
)
</script>

<template>
  <div
    v-editable="block"
    class="block-carousel relative bg-white"
  >
    <pre class="fixed top-10 right-10 z-50 bg-black/50 text-white text-12 p-4 max-h-[50vh] overflow-scroll rounded-xl backdrop-blur-2xl">
{{ carouselCurrentProperties }}
</pre>

    <div class="pointer-events-none absolute inset-0 z-1 size-full">
      <div class="sticky top-0 w-full h-screen">
        <div
          ref="image"
          class="absolute inset-0 size-full"
        >
          <img
            v-if="carouselCurrentMedia"
            :src="carouselCurrentMedia.src"
            alt=""
            class="block size-full object-cover"
          >
        </div>
      </div>
    </div>

    <div class="relative z-10 w-full h-[200vh]">
      <div
        ref="primary"
        class="sticky top-0 w-full h-screen"
      >
        <p
          ref="text"
          class="size-full type-mono-30-70 px-(--app-outer-gutter) py-[calc(var(--app-outer-gutter)*1.5)] md:p-[5%] flex flex-col justify-between text-white bg-black/50"
        >
          <span class="self-end">A</span>

          <span class="self-start">space</span>

          <span class="self-center">for</span>

          <span class="self-end">creation</span>
        </p>
      </div>
    </div>

    <div
      ref="secondary"
      class="flex flex-col justify-center h-screen overflow-hidden pt-[calc(var(--app-vertical-rhythm)_*_2)] pb-(--app-vertical-rhythm)"
    >
      <h2 class="type-mono-12 md:type-mono-14 text-center mb-[calc(var(--app-vertical-rhythm)_*_0.5)]">
        The Space
      </h2>

      <UiCarousel
        ref="carouselRef"
        :items="slides"
        class="shrink-0"
      >
        <template #item="{ item }">
          <div class="block-carousel__item size-full px-(--app-outer-gutter) flex items-center justify-center">
            <img
              :src="item.image"
              :alt="item.caption"
              class="block size-auto max-w-full max-h-full"
            >
          </div>
        </template>
      </UiCarousel>

      <div
        v-if="typeof carouselDetails?.abs === 'number'"
        class="wrapper flex gap-x-(--app-inner-gutter) my-[calc(var(--app-vertical-rhythm)_*_0.25)] type-mono-12 md:type-mono-14"
      >
        <p class="w-1/2 text-right">
          {{ carouselDetails.abs + 1 }}/{{ carouselDetails.length + 1 }}
        </p>

        <p
          v-if="slides[carouselDetails.abs]?.caption"
          class="w-1/2"
        >
          {{ slides[carouselDetails.abs]?.caption }}
        </p>
      </div>
    </div>
  </div>
</template>
