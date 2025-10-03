<script lang="ts" setup>
import type { BlockCarousel } from '@@/.storyblok/types/303510/storyblok-components'
import type { Carousel } from '@/components/ui/Carousel.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
  block: BlockCarousel
}

const { block } = defineProps<Props>()

const main = useTemplateRef('main')
const image = useTemplateRef('image')
const text = useTemplateRef('text')

const tl = ref<gsap.core.Timeline | null>(null)

const retrigger = ref(0)
const resizeTrigger = ref(0)

const carousel = useTemplateRef<Carousel>('carousel')
const carouselDetails = computed(() => carousel.value?.carousel.details.value)
const currentSlideIndex = computed(() => carouselDetails.value?.abs ?? 0)

const carouselCurrentSlide = computed(() => {
  const slides = carousel.value?.carousel.slider.value?.slides
  return slides?.[currentSlideIndex.value]
})

const carouselCurrentMedia = computed(() => carouselCurrentSlide.value?.querySelector('img'))

const carouselCurrentProperties = computed(() => {
  const media = carouselCurrentMedia.value

  if (!media) {
    return null
  }

  // Include resizeTrigger to force recalculation on window resize
  const _ = resizeTrigger.value

  const { width, height } = media.getBoundingClientRect()

  return {
    retrigger: retrigger.value,
    src: media.getAttribute('src'),
    width,
    height,
  }
})

const currentCarouselItem = computed(() => {
  const index = currentSlideIndex.value
  return block.items[index] || null
})

const isAnimationComplete = ref(false)

const sequenceText = () => {
  const spans = text.value?.querySelectorAll('span')

  if (!spans) {
    return
  }

  const split = SplitText.create(spans, {
    type: 'chars',
    // mask: 'chars',
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: 'top top',
      end: '50% top',
      scrub: 0.5,
      markers: false,
    },
  })
    .fromTo(
      text.value,
      { opacity: 0 },
      { opacity: 1 },
    )
    .from(split.chars, {
      opacity: 0,
      yPercent: -10,
      skewY: -3,
      stagger: 0.05,
    })
    // .fromTo(
    //   spans,
    //   {
    //     opacity: 0,
    //     scale: 0.975,
    //     rotate: 1,
    //     yPercent: 10,
    //   },
    //   {
    //     opacity: 1,
    //     scale: 1,
    //     rotate: 0,
    //     yPercent: 0,
    //     stagger: 0.25,
    //     ease: 'power2.out',
    //   },
    // )
    // .to(
    //   text.value,
    //   { opacity: 0 },
    // )
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
      end: '50% top',
      markers: false,
      toggleActions: 'play none none reverse',
      // scrub: true,
      // invalidateOnRefresh: true,
      onLeave: () => {
        // if (!carouselCurrentMedia.value) {
        //   return
        // }

        // gsap.set(carouselCurrentMedia.value, { opacity: 1 })
        // gsap.set(image.value, { opacity: 0 })

        isAnimationComplete.value = true
      },
      onEnterBack: () => {
        if (!carouselCurrentMedia.value) {
          return
        }

        gsap.set(carouselCurrentMedia.value, { opacity: 0 })
        gsap.set(image.value, { opacity: 1 })

        isAnimationComplete.value = false
      },
    },
  })
    .fromTo(
      image.value,
      {
        width: '100%',
        height: '100%',
      },
      {
        width: () => carouselCurrentProperties.value?.width || 0,
        height: () => carouselCurrentProperties.value?.height || 0,
        ease: 'power4.inOut',
        duration: 0.75,
        lazy: false,
        onComplete: () => {
          if (!carouselCurrentMedia.value) {
            return
          }

          gsap.set(carouselCurrentMedia.value, { opacity: 1 })
          gsap.set(image.value, { opacity: 0 })
        },
      },
    )
    // .add(() => {
    //   gsap.to(text.value, { opacity: 0, duration: 0.25 })
    // }, '<')
}

onMounted(async () => {
  await wait(100)

  retrigger.value = 1 // Hack to force recompute.

  const handleResize = async () => {
    await wait(200)
    resizeTrigger.value++
  }

  window.addEventListener('resize', handleResize)

  sequenceText()
  sequenceMedia()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
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
    class="relative h-[300vh] transition-colors duration-750 ease-smooth"
    :class="{
      'bg-offwhite': !isAnimationComplete,
      'bg-white': isAnimationComplete,
    }"
  >
    <div class="sticky inset-0 z-1 w-full h-screen">
      <div class="absolute inset-0 z-20 size-full pointer-events-none flex items-center justify-center">
        <div
          ref="image"
          class="size-full backface-visibility-hidden will-change-[width,height]"
        >
          <MediaImageResponsive
            v-if="currentCarouselItem?.small_device"
            :asset="currentCarouselItem.small_device"
            :desktop-asset="currentCarouselItem.large_device"
            sizes="
              xs:100vw
              sm:100vw
            "
            desktop-sizes="
              md:50vw
              lg:50vw
            "
            :alt="currentCarouselItem.caption || currentCarouselItem.small_device.alt || ''"
            :lazy="false"
            class="block size-full"
          />
        </div>
      </div>

      <div
        class="absolute inset-0 z-30 size-full pointer-events-none transition-opacity ease-out"
        :class="{
          'opacity-100 duration-500 delay-500': !isAnimationComplete,
          'opacity-0 duration-250': isAnimationComplete,
        }"
      >
        <p
          ref="text"
          class="size-full type-mono-30-70 px-(--app-outer-gutter) py-[calc(var(--app-outer-gutter)*1.5)] md:p-[5%] flex flex-col justify-between text-white bg-black/30"
        >
          <span class="self-end">A</span>

          <span class="self-start">space</span>

          <span class="self-center">for</span>

          <span class="self-end">creation</span>
        </p>
      </div>

      <div class="absolute inset-0 z-10 size-full flex flex-col justify-center">
        <div class="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-y-(--app-outer-gutter) w-full max-h-full">
          <div class="flex flex-col items-center justify-end pt-(--app-header-height)">
            <h2
              class="block-carousel__item block-carousel__item--top type-mono-12 md:type-mono-14 text-center"
              :class="{
                'is-animation-complete': isAnimationComplete,
              }"
            >
              The Space
            </h2>
          </div>

          <div
            class="size-full overflow-hidden"
            :class="{
              'pointer-events-none': !isAnimationComplete,
              'pointer-events-auto': isAnimationComplete,
            }"
          >
            <UiCarousel
              ref="carousel"
              :items="block.items"
              :options="{
                slides: {
                  // perView: 1,
                  spacing: 0,
                  origin: 'center',
                },
              }"
            >
              <template #item="{ item }">
                <div class="size-full p-(--app-outer-gutter)">
                  <MediaImageResponsive
                    v-if="item.small_device"
                    :asset="item.small_device"
                    :desktop-asset="item.large_device"
                    sizes="
                      xs:100vw
                      sm:100vw
                    "
                    desktop-sizes="
                      md:50vw
                      lg:50vw
                    "
                    :alt="item.caption || item.small_device.alt || ''"
                    :lazy="false"
                    :cover="false"
                  />
                </div>
              </template>
            </UiCarousel>
          </div>

          <div
            v-if="typeof carouselDetails?.abs === 'number'"
            class="wrapper pb-(--app-header-height) overflow-hidden"
          >
            <div
              class="block-carousel__item block-carousel__item--bottom type-mono-12 md:type-mono-14 flex gap-x-(--app-inner-gutter)"
              :class="{
                'is-animation-complete': isAnimationComplete,
              }"
            >
              <p class="w-1/2 text-right">
                {{ carouselDetails.abs + 1 }}/{{ block.items.length }}
              </p>

              <p
                v-if="block.items[carouselDetails.abs]?.caption"
                class="w-1/2"
              >
                {{ block.items[carouselDetails.abs]?.caption }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.block-carousel__item {
  --_delay: 0.35s;
  --_ease: var(--ease-outQuart);

  opacity: 0;
  scale: 1.1;

  transition:
    opacity 0.25s var(--ease-out),
    translate 0s 0.25s,
    scale 0s 0.25s;

  &.is-animation-complete {
    opacity: 1;
    translate: 0 0 0;
    scale: 1;

    transition:
      opacity 0.25s var(--_ease) var(--_delay),
      translate 0.25s var(--_ease) var(--_delay),
      scale 0.25s var(--_ease) var(--_delay);
  }
}

.block-carousel__item--top {
  translate: 0 -200% 0;
}

.block-carousel__item--bottom {
  translate: 0 200% 0;
}

.slide-portrait {
  aspect-ratio: 2/3;
  width: min(40vh, calc(100vw - (var(--app-outer-gutter) * 6)));
}

.slide-landscape {
  aspect-ratio: 3/2;
  width: min(90vh, calc(100vw - (var(--app-outer-gutter) * 2)));
}
</style>
