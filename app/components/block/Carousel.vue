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
      <p class="type-mono-30-70 px-[1.25em] py-[1.5em] flex flex-col h-full justify-between text-white">
        <span class="self-end text-trim-both">A</span>

        <span class="self-start text-trim-both">space</span>

        <span class="self-center text-trim-both">for</span>

        <span class="self-end text-trim-both">creation</span>
      </p>
    </div>
  </div>

  <!-- Carousel -->
  <div class="bg-white py-(--app-vertical-rhythm)">
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
      ]"
      :options="{
        autoplay: false,
        navigation: true,
        pagination: true,
      }"
      :ratio-x="10"
      :ratio-y="16"
      :ratio-desktop-x="3"
      :ratio-desktop-y="2"
    >
      <template #slide="{ slide, index }">
        <div
          class="size-full flex items-center justify-center type-sans-40-65"
        >
          <div class="aspect-[3/2] w-1/2 bg-wheat mix-blend-difference flex items-center justify-center">
            {{ index }}
          </div>
        </div>
      </template>
    </UiCarousel>
  </div>
</template>

<style>
/* @reference "@/assets/css/main.css"; */
</style>
