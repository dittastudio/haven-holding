<script lang="ts" setup>
// import type { BlockCarousel } from '@@/.storyblok/types/303510/storyblok-components'

// interface Props {
//   block: BlockCarousel
// }

// const { block } = defineProps<Props>()

const slides = [
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
    caption: 'Lounge Room',
  },
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
    caption: 'Lounge Room',
  },
  {
    ratio: 'portrait',
    image: 'https://picsum.photos/600/900',
    caption: 'Dining Room',
  },
  {
    ratio: 'portrait',
    image: 'https://picsum.photos/600/900',
    caption: 'Dining Room',
  },
  {
    ratio: 'landscape',
    image: 'https://picsum.photos/900/600',
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
    caption: 'Lounge Room',
  },
]
</script>

<template>
  <!-- v-editable="block" -->

  <!-- Cover Image -->
  <div class="relative flex isolate min-h-screen">
    <img
      src="/images/carousel-test.jpg"
      alt="Carousel"
      class="absolute inset-0 size-full object-cover -z-1"
    >

    <div class="w-full bg-black/30 opacity-100">
      <p class="type-mono-30-70 px-(--app-outer-gutter) py-[calc(var(--app-outer-gutter)*1.5)] md:p-[5%] flex flex-col h-full justify-between text-white">
        <span class="self-end">A</span>

        <span class="self-start">space</span>

        <span class="self-center">for</span>

        <span class="self-end">creation</span>
      </p>
    </div>
  </div>

  <!-- Carousel -->
  <div class="block-carousel min-h-screen overflow-hidden bg-white py-(--app-vertical-rhythm)">
    <h2 class="type-mono-12 md:type-mono-14 text-center pb-[calc(var(--app-vertical-rhythm)_*_0.5)]">
      The Space
    </h2>

    <UiCarousel
      :slides="slides"
      :options="{
        autoplay: false,
        navigation: true,
        pagination: true,
      }"
    >
      <template #slide="{ slide }">
        <div
          class="
              carousel-slide
              mx-auto
            "
          :class="slide.ratio === 'landscape' ? 'aspect-[3/2] w-[calc(100vw-(var(--app-outer-gutter)*3))] md:w-[calc(var(--_grid-column)*9)] h-auto' : 'aspect-[2/3] w-[calc(100vw-(var(--app-outer-gutter)*6))] md:w-[calc(var(--_grid-column)*4)] h-auto'"
        >
          <img
            :src="slide.image"
            :alt="slide.caption"
            class="w-full h-full object-cover"
          >
        </div>
      </template>
    </UiCarousel>
  </div>
</template>

<style>
@reference "@/assets/css/main.css";

.block-carousel {
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
</style>
