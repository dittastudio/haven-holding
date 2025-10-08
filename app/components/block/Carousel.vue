<script lang="ts" setup>
import type { BlockCarousel } from '@@/.storyblok/types/303510/storyblok-components'
import type { Carousel } from '@/components/ui/Carousel.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import IconArrow from '@/assets/icons/arrow.svg'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
  block: BlockCarousel
}

const { block } = defineProps<Props>()

const main = useTemplateRef('main')
const container = useTemplateRef('container')
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
  const slide = carousel.value?.carousel.slider.value.slides[carouselDetails.value?.abs || 0]
  const media = slide?.querySelector('img')

  if (!media) {
    return null
  }

  // Include resizeTrigger to force recalculation on window resize
  const _ = resizeTrigger.value

  const { width, height, top, left } = media.getBoundingClientRect()

  return {
    retrigger: retrigger.value,
    width,
    height,
    top,
    left,
    relativeTop: top - (container.value ? container.value?.getBoundingClientRect().top : 0) || 0,
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
      skewY: -5,
      rotateY: -20,
      stagger: 0.05,
    })
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
        if (!carouselCurrentMedia.value) {
          return
        }

        // gsap.set(carouselCurrentMedia.value, { opacity: 1 })
        // gsap.set(image.value, { opacity: 0 })

        isAnimationComplete.value = true
      },
      onEnterBack: () => {
        if (!carouselCurrentMedia.value) {
          return
        }

        // gsap.set(carouselCurrentMedia.value, { opacity: 0 })
        // gsap.set(image.value, { opacity: 1 })
        gsap.to(image.value, { opacity: 1, duration: 0.1 }) // Stops flicker

        isAnimationComplete.value = false
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
        // y: () => (carouselCurrentProperties.value?.top / carouselCurrentProperties.value?.height) || 0,
        // x: () => (carouselCurrentProperties.value?.left / carouselCurrentProperties.value?.width) || 0,
        ease: 'power4.inOut',
        duration: 0.75,
        lazy: false,
        onComplete: () => {
          if (!carouselCurrentMedia.value) {
            return
          }

          gsap.set(carouselCurrentMedia.value, { opacity: 1 })
          gsap.set(image.value, { opacity: 0 })

          isAnimationComplete.value = true
          // },
        },
      },
    )
}

const scrollProgress = ref(0)
const isScrollProgressVisible = ref(false)
const isScrollProgressThemeDark = ref(false)

const setupScrollProgress = () => {
  ScrollTrigger.create({
    trigger: main.value,
    start: 'top top',
    end: 'bottom bottom',
    markers: false,
    scrub: true,
    onUpdate: (self) => {
      scrollProgress.value = self.progress

      isScrollProgressThemeDark.value = scrollProgress.value > 0.66
    },
    onEnter: () => {
      isScrollProgressVisible.value = true
    },
    onEnterBack: () => {
      isScrollProgressVisible.value = true
    },
    onLeave: () => {
      isScrollProgressVisible.value = false
    },
    onLeaveBack: () => {
      isScrollProgressVisible.value = false
    },
  })
}

const handleResize = async () => {
  await wait(200)
  resizeTrigger.value++
}

onMounted(async () => {
  await wait(100)

  retrigger.value = 1 // Hack to force recompute.

  window.addEventListener('resize', handleResize)

  setupScrollProgress()
  sequenceText()
  sequenceMedia()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
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
    class="relative h-[400vh]"
  >
    <div
      ref="container"
      class="sticky inset-0 z-1 w-full h-screen"
    >
      <div class="absolute inset-0 z-20 size-full pointer-events-none flex items-center justify-center">
        <div
          ref="image"
          class="absolute inset-0 z-20 size-full backface-visibility-hidden will-change-[width,height]"
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
          class="size-full type-mono-30-70 px-(--app-outer-gutter) py-(--app-header-height) flex flex-col justify-between text-white bg-black/30"
        >
          <span class="self-end">A</span>

          <span class="self-start">space</span>

          <span class="self-center">for</span>

          <span class="self-end">creation</span>
        </p>
      </div>

      <div
        :class="{
          'bg-offwhite pointer-events-none': !isAnimationComplete,
          'bg-white pointer-events-auto': isAnimationComplete,
        }"
        class="absolute inset-0 z-10 size-full flex flex-col justify-center transition-colors duration-500 ease-smooth"
      >
        <!-- Carousel navigation buttons -->
        <div class="hidden xonly-touch:hidden absolute inset-0 z-1 xflex mix-blend-difference text-white">
          <button
            v-for="button in ['previous', 'next'] as const"
            :key="button"
            class="group/button w-1/2"
            @click="carousel?.carousel[button]()"
          >
            <span class="sr-only">{{ button }}</span>

            <UiCursor>
              <IconArrow
                class="transition-all duration-200 ease-smooth"
                :class="[
                  {
                    'opacity-20': button === 'previous' && currentSlideIndex === 0 || currentSlideIndex === block.items.length - 1 && button === 'next',
                    'group-active/button:-translate-x-1 group-active/button:opacity-60': button === 'previous',
                    'group-active/button:translate-x-1 group-active/button:opacity-60 rotate-180': button === 'next',
                  },
                ]"
              />
            </UiCursor>
          </button>
        </div>

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

          <div class="size-full overflow-hidden">
            <UiCarousel
              ref="carousel"
              :items="block.items"
              :options="{
                slides: {
                  perView: 'auto',
                  spacing: 0,
                  origin: 'center',
                },
                defaultAnimation: {
                  duration: 750,
                  // easing: x => { return 1 - Math.pow(1 - x, 4) },
                },
              }"
            >
              <template #item="{ item, setSlideClasses }">
                <div
                  class="block-carousel__slide-inner size-full xh-full px-[calc(var(--app-outer-gutter)_*_1)]"
                  :class="setSlideClasses('block-carousel__slide')"
                >
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
              class="block-carousel__item block-carousel__item--bottom type-mono-12 md:type-mono-14 flex flex-col gap-x-(--app-inner-gutter) items-center"
              :class="{
                'is-animation-complete': isAnimationComplete,

              }"
            >
              <p>
                {{ carouselDetails.abs + 1 }}/{{ block.items.length }}
              </p>

              <p
                v-if="block.items[carouselDetails.abs]?.caption"
              >
                {{ block.items[carouselDetails.abs]?.caption }}
              </p>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rerum eligendi sequi deleniti in dolorum nobis nam veritatis aut libero sit, maiores corporis reprehenderit voluptatum! Tempora in itaque fuga ut.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll progress bar -->
  <div
    class="
      sticky
      bottom-0
      pb-(--app-outer-gutter)
      z-50
      -mt-[calc(var(--app-outer-gutter)_+_--spacing(1))]
      pointer-events-none
    "
  >
    <div
      class="
      w-[100px]
      h-1
      mx-auto
      rounded-full
      overflow-hidden
      bg-current/20
      transition-[scale,color]
      ease-inOutQuart
    "
      :class="{
        'text-white': !isScrollProgressThemeDark,
        'text-black': isScrollProgressThemeDark,
        'scale-0 duration-[0.25s,_0.75s]': !isScrollProgressVisible,
        'scale-100 duration-[0.5s,_0.75s]': isScrollProgressVisible,
      }"
    >
      <div
        class="
          h-1
          mb-(--app-outer-gutter)
          rounded-full
          bg-current
          transition-[scale]
          duration-[0.25s]
          ease-out
          origin-left
        "
        :style="{
          scale: `${scrollProgress} 1`,
        }"
      />
    </div>
  </div>
</template>

<style>
.block-carousel__slide {
  .block-carousel__slide-inner {
    /* translate: calc(50% + (var(--app-outer-gutter) * -2)) 0 0; */
  }

  .block-carousel__slide-inner img {
    /* translate: -50% 0 0; */
  }

  &.is-active {
    .block-carousel__slide-inner {
      /* translate: calc(50% + (var(--app-outer-gutter) * -2)) 0 0; */
    }

    .block-carousel__slide-inner img {
      /* translate: -50% 0 0; */
    }
  }

  &.is-active + & {
    .block-carousel__slide-inner {
      /* translate: -50% 0 0; */
    }

    .block-carousel__slide-inner img {
      /* translate: 0% 0 0; */
      /* translate: calc(50% - (var(--app-outer-gutter) * 1)) 0 0; */
    }
  }

  img {
    /* margin-left: 0; */
  }
}

.block-carousel__slide-inner,
.block-carousel__slide-inner img {
  /* translate: 0 0 0; */
  transition: translate 0s var(--ease-out);
}

.block-carousel__slide.is-active .block-carousel__slide-inner,
.block-carousel__slide.is-active .block-carousel__slide-inner img {
  transition: translate 1s var(--ease-smooth);
}

.block-carousel__slide.is-active + .block-carousel__slide .block-carousel__slide-inner,
.block-carousel__slide.is-active + .block-carousel__slide .block-carousel__slide-inner img {
  transition: translate 0s var(--ease-out);
}

.block-carousel__item {
  --_delay: 0.4s;
  --_ease: var(--ease-outQuart);

  opacity: 0;
  scale: 1.1;

  transition:
    opacity 0.1s var(--ease-out),
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
  translate: 0 -50% 0;
}

.block-carousel__item--bottom {
  translate: 0 50% 0;
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
