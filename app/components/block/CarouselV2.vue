<script lang="ts" setup>
import type { BlockCarousel } from '@@/.storyblok/types/303510/storyblok-components'
import type { Carousel } from '@/components/ui/CarouselV2.vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Flip)

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

const carouselRef = useTemplateRef<Carousel>('carouselRef')
const carouselDetails = computed(() => carouselRef.value?.carousel.details.value)
const carouselCurrentSlide = computed(() => carouselRef.value?.carousel.slider.value?.slides[carouselDetails.value?.abs || 0])
const carouselCurrentMedia = computed(() => carouselCurrentSlide.value?.querySelector('img'))

const main = ref<HTMLElement | null>(null)
const fullSize = ref<HTMLImageElement | null>(null)
const thumbnail = ref<HTMLImageElement | null>(null)

const flipCtx = ref<gsap.Context | null>(null)

const animation = () => {
  flipCtx.value && flipCtx.value.revert()

  flipCtx.value = gsap.context(() => {
    if (!fullSize.value || !thumbnail.value) {
      return
    }

    fullSize.value.style.display = 'block'
    thumbnail.value.style.display = 'block'

    const state = Flip.getState(fullSize.value)

    const flip = Flip.from(state, {
      targets: thumbnail.value,
      absolute: true,
      absoluteOnLeave: true,
      // scale: true,
      simple: true,
      prune: true,
      ease: 'power1.in',
    })

    ScrollTrigger.create({
      trigger: main.value,
      start: '25% center',
      end: '75% center',
      scrub: true,
      markers: true,
      animation: flip,
      onEnter: () => {
        fullSize.value.style.display = 'none'
        thumbnail.value.style.display = 'block'
      },
      onLeaveBack: () => {
        fullSize.value.style.display = 'block'
        thumbnail.value.style.display = 'none'
      },
      onLeave: () => {
        fullSize.value.style.display = 'none'
        thumbnail.value.style.display = 'none'
      },
      onEnterBack: () => {
        fullSize.value.style.display = 'none'
        thumbnail.value.style.display = 'block'
      },
    })
  })
}

onMounted(() => {
  animation()

  window.addEventListener('resize', animation)
})

watch(
  () => [
    carouselCurrentSlide.value,
  ],
  () => {
    console.log('carouselCurrentSlide', carouselCurrentSlide.value.children[0].classList.contains('slide-landscape'))
    return animation()
  },
  {
    // flush: 'post',
    immediate: false,
  },
)
</script>

<template>
  <div
    v-editable="block"
    class="relative w-full overflow-hidden"
  >
    <div ref="main">
      <section
        class="relative w-full h-screen"
      >
        <div
          ref="fullSize"
          data-flip-id="img"
          class="size-full border border-black"
        >
          <img
            :src="carouselCurrentMedia?.src"
            alt="Image"
            class="size-full object-cover grayscale"
          >
        </div>
      </section>

      <section
        class="relative h-screen"
      >
        <section
          class="absolute inset-0 z-1 flex justify-center items-center h-screen outline outline-solid outline-transparent transform-gpu pointer-events-none"
        >
          <div
            ref="thumbnail"
            data-flip-id="img"
            class="opacity-50"
            :class="carouselCurrentSlide?.children[0].classList.contains('slide-landscape') ? 'slide-portrait' : 'slide-landscape'"
          >
            <img
              :src="carouselCurrentMedia?.src"
              alt="Image"
              class="size-full object-cover"
            >
          </div>
        </section>

        <UiCarouselV2
          ref="carouselRef"
          :items="slides"
          class="shrink-0"
        >
          <template #item="{ item }">
            <div
              :class="item.ratio === 'landscape' ? 'slide-landscape' : 'slide-portrait'"
            >
              <img
                :src="item.image"
                :alt="item.caption"
                class="size-full object-cover"
              >
            </div>
          </template>
        </UiCarouselV2>

        <!-- <div
          ref="slider"
          class="keen-slider relative flex w-full h-[inherit] touch-pan-y select-none"
        >
          <div class="keen-slider__slide w-full min-h-full flex items-center justify-center shrink-0">
            <div class="w-[min(90vh,calc(100vw-(var(--app-outer-gutter)*2)))] aspect-[3/2]">
              <img
                src="/images/carousel-test.jpg"
                alt="Image"
                class="size-full object-cover"
              >
            </div>
          </div>

          <div class="keen-slider__slide w-full min-h-full flex items-center justify-center shrink-0">
            <div class="w-[min(40vh,calc(100vw-(var(--app-outer-gutter)*6))))] aspect-[2/3]">
              <img
                src="/images/carousel-test.jpg"
                alt="Image"
                class="size-full object-cover"
              >
            </div>
          </div>
        </div> -->
      </section>
    </div>
  </div>
  <!-- <div
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
  </div> -->
</template>

<style scoped>
.slide-landscape {
  width: min(90vh, calc(100vw - (var(--app-outer-gutter) * 2)));
  aspect-ratio: 3/2;
}

.slide-portrait {
  width: min(40vh, calc(100vw - (var(--app-outer-gutter) * 6)));
  aspect-ratio: 2/3;
}
</style>
