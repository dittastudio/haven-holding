<script lang="ts" setup>
// import type { BlockCarousel } from '@@/.storyblok/types/303510/storyblok-components'

// interface Props {
//   block: BlockCarousel
// }

// const { block } = defineProps<Props>()

import { colourBackground } from '~/utils/maps'

// Get the color keys as an array to loop through
const colorKeys = Object.keys(colourBackground)
</script>

<template>
  <!-- v-editable="block" -->

  <!-- Cover Image -->
  <div class="grid">
    <img
      src="/images/carousel-test.jpg"
      alt="Carousel"
      class="size-full object-cover aspect-[2/3] md:aspect-[3/2] max-h-screen col-span-full row-span-full"
    >

    <div class="col-span-full row-span-full bg-black/30" />

    <div class="col-span-full row-span-full">
      <p class="type-mono-30-70 p-[5%] flex flex-col h-full justify-between text-white">
        <span class="self-end">A</span>

        <span class="self-start">space</span>

        <span class="self-center">for</span>

        <span class="self-end">
          <span class="-my-[0.1em]">creation</span>
        </span>
      </p>
    </div>
  </div>

  <!-- Carousel -->
  <div class="block-carousel bg-white py-(--app-vertical-rhythm)">
    <h2 class="type-mono-12 md:type-mono-14 text-center pb-[calc(var(--app-vertical-rhythm)_*_0.5)]">
      The Space
    </h2>

    <UiCarousel
      :slides="[
        { caption: 'Lounge Room' },
        { caption: 'Dining Room' },
        { caption: 'Kitchen' },
        { caption: 'Bathroom' },
        { caption: 'Bedroom' },
        { caption: 'Garden' },
      ]"
      :options="{
        autoplay: false,
        navigation: true,
        pagination: true,
      }"
    >
      <template #slide="{ slide, index }">
        <div
          class="carousel-slide size-full flex items-center justify-center type-sans-40-65"
          :class="index % 3 === 0 ? 'is-landscape' : 'is-portrait'"
        >
          <div
            class="
              bg-wheat
              flex
              items-center
              justify-center
              xmd:w-auto
              xmd:h-[48.5vw]
              x3xl:h-[930px]
              mx-auto
            "
            :class="index % 3 === 0 ? 'aspect-[3/2] w-[calc(100vw-(var(--app-outer-gutter)*2))] md:w-[calc(var(--_grid-column)*9)] h-auto' : 'aspect-[2/3] w-[calc(100vw-(var(--app-outer-gutter)*6))] md:w-[calc(var(--_grid-column)*4)] h-auto'"
          >
            {{ index + 1 }}
          </div>
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
