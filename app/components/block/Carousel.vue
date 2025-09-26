<script lang="ts" setup>
import type { BlockCarousel } from '@@/.storyblok/types/303510/storyblok-components'
import type { Carousel } from '@/components/ui/Carousel.vue'
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
    image: '/images/carousel-test.jpg',
    caption: 'Lounge Room',
  },
  {
    ratio: 'portrait',
    image: 'https://picsum.photos/600/900',
    caption: 'Dining Room',
  },
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
    caption: 'Studio',
  },
  {
    ratio: 'portrait',
    image: 'https://picsum.photos/600/900',
    caption: 'Office',
  },
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
    caption: 'Living Room',
  },
  {
    ratio: 'portrait',
    image: 'https://picsum.photos/600/900',
    caption: 'Kitchen',
  },
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
    caption: 'Bedroom',
  },
  {
    ratio: 'portrait',
    image: 'https://picsum.photos/600/900',
    caption: 'Bathroom',
  },
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
    caption: 'Balcony',
  },
  {
    ratio: 'portrait',
    image: 'https://picsum.photos/600/900',
    caption: 'Garden',
  },
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
    caption: 'Pool',
  },
]

const carouselRef = useTemplateRef<Carousel>('carouselRef')
const carouselDetails = computed(() => carouselRef.value?.carousel.details.value)
const carouselCurrentSlide = computed(() => carouselRef.value?.carousel.slider.value.slides[carouselDetails.value?.abs || 0])

const primary = useTemplateRef('primary')
const image = useTemplateRef('image')
const text = useTemplateRef('text')
const secondary = useTemplateRef('secondary')

onMounted(async () => {
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
      markers: true,
    },
  })
    .fromTo(
      spans,
      { opacity: 0, yPercent: -50 },
      { opacity: 1, yPercent: 0, stagger: 0.5, ease: 'none' },
    )
    .to(
      text.value,
      { opacity: 0 },
    )

  await wait(100)

  const activeSlide = carouselCurrentSlide.value?.firstElementChild

  if (!activeSlide) {
    return
  }

  gsap.set(activeSlide, { opacity: 0 })

  const width = activeSlide.clientWidth
  const height = activeSlide.clientHeight

  console.log({ width, height })

  gsap.timeline({
    scrollTrigger: {
      trigger: secondary.value,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      markers: true,
      onLeave: () => {
        gsap.set(activeSlide, { opacity: 1 })
        gsap.set(image.value, { opacity: 0 })
      },
      onEnterBack: () => {
        gsap.set(activeSlide, { opacity: 0 })
        gsap.set(image.value, { opacity: 1 })
      },
    },
  })
    .to(
      image.value,
      { width, height, ease: 'none' },
    )
})
</script>

<template>
  <div
    v-editable="block"
    class="block-carousel"
  >
    <div class="sticky top-0 flex items-center justify-center z-1 pointer-events-none">
      <div
        ref="primary"
        class="sticky bottom-0 w-full flex isolate min-h-screen"
      >
        <div class="absolute inset-0 size-full -z-1 flex items-center justify-center">
          <div
            ref="image"
            class="size-full"
          >
            <img
              src="/images/carousel-test.jpg"
              alt="Carousel"
              class="block size-full object-cover"
            >
          </div>
        </div>

        <div class="w-full">
          <p
            ref="text"
            class="type-mono-30-70 px-(--app-outer-gutter) py-[calc(var(--app-outer-gutter)*1.5)] md:p-[5%] flex flex-col h-full justify-between text-white bg-black/50"
          >
            <span class="self-end">A</span>

            <span class="self-start">space</span>

            <span class="self-center">for</span>

            <span class="self-end">creation</span>
          </p>
        </div>
      </div>
    </div>

    <div class="sticky top-0 flex flex-col justify-center w-full min-h-screen bg-green-500/20" />

    <div
      ref="secondary"
      class="sticky top-0 flex flex-col justify-center min-h-screen overflow-hidden bg-red-500 py-(--app-vertical-rhythm)"
    >
      <h2 class="type-mono-12 md:type-mono-14 text-center mb-[calc(var(--app-vertical-rhythm)_*_0.5)]">
        The Space
      </h2>

      <UiCarousel
        ref="carouselRef"
        :items="slides"
      >
        <template #item="{ item, setSlideClasses }">
          <div
            class="block-carousel__item"
            :class="item.ratio === 'landscape' ? 'aspect-[3/2] w-[calc(100vw-(var(--app-outer-gutter)*3))] md:w-[calc(var(--_grid-column)*9)] h-auto' : 'aspect-[2/3] w-[calc(100vw-(var(--app-outer-gutter)*6))] md:w-[calc(var(--_grid-column)*4)] h-auto'"
            :onVnodeBeforeMount="() => setSlideClasses({
              'flex items-center justify-center w-full h-[inherit] min-h-full': true,
            })"
          >
            <img
              :src="item.image"
              :alt="item.caption"
              class="w-full h-full object-cover"
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

<style>
@reference "@/assets/css/main.css";

.block-carousel {
  display: grid;
  grid-auto-rows: minmax(auto, 1fr);

  --_grid-cols: 2;
  --_grid-max-width: min(100vw, 1920px);
  /* --_grid-max-width: 100vw; */
  --_grid-inner: calc(var(--_grid-max-width) - (var(--app-outer-gutter) * 2));
  --_grid-gaps-total: calc(var(--app-inner-gutter) * (var(--_grid-cols) - 1));
  --_grid-pure-column: calc((var(--_grid-inner) - var(--_grid-gaps-total)) / var(--_grid-cols));
  --_grid-column: calc(var(--_grid-pure-column) + var(--app-inner-gutter));

  @variant sm {
    --_grid-cols: 4;
  }

  @variant md {
    --_grid-cols: 12;
  }
}

.block-carousel__item {
  transition: translate 0.25s var(--ease-out);

  .is-landscape.slide-active + .is-landscape &,
  .is-landscape.slide-active + .is-portrait & {
    translate: calc(var(--app-outer-gutter) / 1) 0;

    @variant md {
      translate: calc(var(--_grid-column) + (var(--_grid-pure-column) / 2)) 0;
    }
  }

  .is-landscape.slide-previous:has(+ .is-landscape) &,
  .is-portrait.slide-previous:has(+ .is-landscape) & {
    translate: calc(var(--app-outer-gutter) / -1) 0;

    @variant md {
      translate: calc((var(--_grid-column) + (var(--_grid-pure-column) / 2)) * -1) 0;
    }
  }

  .is-landscape.slide-previous:has(+ .is-portrait) &,
  .is-portrait.slide-previous:has(+ .is-portrait) & {
    translate: calc(var(--app-outer-gutter) * -2.5) 0;

    @variant md {
      translate: calc(((var(--_grid-column) * 4) - (var(--app-inner-gutter) / 2)) * -1) 0;
    }
  }

  .is-portrait.slide-active + .is-landscape &,
  .is-portrait.slide-active + .is-portrait & {
    translate: calc(var(--app-outer-gutter) * 2.5) 0;

    @variant md {
      translate: calc((var(--_grid-column) * 4) - (var(--app-inner-gutter) / 2)) 0;
    }
  }
}
</style>
