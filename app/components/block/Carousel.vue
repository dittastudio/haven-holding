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

const main = useTemplateRef('main')
const container = useTemplateRef('container')
const image = useTemplateRef('image')
const text = useTemplateRef('text')

const tl = ref<gsap.core.Timeline | null>(null)

const retrigger = ref(0)

const carousel = useTemplateRef<Carousel>('carousel')
const carouselDetails = computed(() => carousel.value?.carousel.details.value)
const carouselCurrentSlide = computed(() => carousel.value?.carousel.slider.value?.slides[carouselDetails.value?.abs || 0])
const carouselCurrentMedia = computed(() => carouselCurrentSlide.value?.querySelector('img'))
const carouselCurrentProperties = computed(() => {
  const slide = carousel.value?.carousel.slider.value.slides[carouselDetails.value?.abs || 0]
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
    relativeTop: top - (container.value ? container.value?.getBoundingClientRect().top : 0) || 0,
  }
})

const carouselInfo = ref(false)

const sequenceText = () => {
  const spans = text.value?.querySelectorAll('span')

  if (!spans) {
    return
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: 'top top',
      end: '50% top',
      scrub: true,
      markers: false,
    },
  })
    .fromTo(
      spans,
      { opacity: 0, yPercent: 10 },
      { opacity: 1, yPercent: 0, stagger: 0.25, ease: 'power2.out' },
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
      trigger: main.value,
      start: '50% top',
      end: '75% top',
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
      onLeave: () => {
        if (!carouselCurrentMedia.value) {
          return
        }

        gsap.set(carouselCurrentMedia.value, { opacity: 1 })
        gsap.set(image.value, { opacity: 0 })

        carouselInfo.value = true
      },
      onEnterBack: () => {
        if (!carouselCurrentMedia.value) {
          return
        }

        gsap.set(carouselCurrentMedia.value, { opacity: 0 })
        gsap.set(image.value, { opacity: 1 })

        carouselInfo.value = false
      },
    },
  })
    .fromTo(
      image.value,
      {
        width: '100%',
        height: '100%',
        x: 0,
        y: 0,
      },
      {
        width: () => carouselCurrentProperties.value?.width || 0,
        height: () => carouselCurrentProperties.value?.height || 0,
        x: () => carouselCurrentProperties.value?.left || 0,
        y: () => carouselCurrentProperties.value?.relativeTop || 0,
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
  () => carouselCurrentProperties.value,
  () => requestRefresh.restart(true),
  {
    flush: 'post',
    immediate: false,
  },
)
</script>

<template>
  <div
    ref="main"
    v-editable="block"
    class="relative bg-white h-[500vh]"
  >
    <!-- <pre class="fixed top-10 right-10 z-50 bg-black/50 text-white text-12 p-4 max-h-[50vh] overflow-scroll rounded-xl backdrop-blur-2xl">
{{ carouselCurrentProperties }}
</pre> -->

    <div
      ref="container"
      class="sticky inset-0 z-1 w-full h-screen"
    >
      <div class="absolute inset-0 z-20 size-full pointer-events-none">
        <div
          ref="image"
          class="absolute inset-0 z-20 size-full"
        >
          <img
            v-if="carouselCurrentMedia"
            :src="carouselCurrentMedia.src"
            alt=""
            class="block size-full object-cover"
          >
        </div>
      </div>

      <div class="absolute inset-0 z-30 size-full pointer-events-none">
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

      <div class="absolute inset-0 z-10 size-full">
        <div class="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-y-(--app-outer-gutter) size-full">
          <div class="flex flex-col items-center justify-end pt-(--app-header-height)">
            <h2
              class="type-mono-12 md:type-mono-14 text-center transition-opacity duration-500 ease-out"
              :class="{
                'opacity-100': carouselInfo,
                'opacity-0': !carouselInfo,
              }"
            >
              The Space
            </h2>
          </div>

          <div class="size-full overflow-hidden">
            <UiCarousel
              ref="carousel"
              :items="slides"
            >
              <template #item="{ item }">
                <div class="size-full px-(--app-outer-gutter) flex items-center justify-center">
                  <img
                    :src="item.image"
                    :alt="item.caption"
                    class="block size-auto max-w-full max-h-full"
                  >
                </div>
              </template>
            </UiCarousel>
          </div>

          <div
            v-if="typeof carouselDetails?.abs === 'number'"
            class="wrapper flex gap-x-(--app-inner-gutter) type-mono-12 md:type-mono-14 pb-(--app-header-height) transition-opacity duration-500 ease-out"
            :class="{
              'opacity-100': carouselInfo,
              'opacity-0': !carouselInfo,
            }"
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
    </div>
  </div>
</template>
