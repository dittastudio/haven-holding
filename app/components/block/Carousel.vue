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
const imageMask = useTemplateRef('imageMask')
const image = useTemplateRef('image')
const text = useTemplateRef('text')
const carousel = useTemplateRef<Carousel>('carousel')

const tl = ref<gsap.core.Timeline | null>(null)
const isAnimationComplete = ref(false)

const scrollProgress = ref(0)
const isScrollProgressVisible = ref(false)
const isScrollProgressThemeDark = ref(false)

const carouselDetails = computed(() => carousel.value?.carousel.details.value)
const currentSlideIndex = computed(() => carouselDetails.value?.abs ?? 0)
const carouselSlides = computed(() => carousel.value?.carousel.slider.value?.slides)
const carouselCurrentSlide = computed(() => carouselSlides.value?.[currentSlideIndex.value])
const carouselCurrentMedia = computed(() => carouselCurrentSlide.value?.querySelector('img'))

// Reactive trigger for recomputation
const resizeTrigger = ref(0)

const carouselCurrentProperties = computed(() => {
  // Directly query the slide and media to match original behavior
  const slide = carousel.value?.carousel.slider.value?.slides[carouselDetails.value?.abs ?? 0]
  const media = slide?.querySelector('img')
  const containerEl = container.value

  if (!media || !containerEl) {
    return null
  }

  // Reactively depend on resizeTrigger to force recalculation
  const _trigger = resizeTrigger.value

  const mediaRect = media.getBoundingClientRect()
  const containerRect = containerEl.getBoundingClientRect()

  const relativeTop = mediaRect.top - containerRect.top
  const relativeLeft = mediaRect.left - containerRect.left
  const relativeBottom = containerRect.height - mediaRect.height - relativeTop
  const relativeRight = containerRect.width - mediaRect.width - relativeLeft

  return {
    width: mediaRect.width,
    height: mediaRect.height,
    relativeTop,
    relativeLeft,
    relativeBottom,
    relativeRight,
    _trigger,
  }
})

const currentCarouselItem = computed(() => block.items[currentSlideIndex.value])

const sequenceText = () => {
  const textEl = text.value

  if (!textEl) {
    return
  }

  const spans = textEl.querySelectorAll('span')

  if (!spans.length) {
    return
  }

  const split = SplitText.create(spans, { type: 'chars' })

  gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: 'top top',
      end: '50% top',
      scrub: 0.5,
    },
  })
    .fromTo(textEl, { opacity: 0 }, { opacity: 1 })
    .from(split.chars, {
      opacity: 0,
      yPercent: -10,
      skewY: -5,
      rotateY: -20,
      stagger: 0.05,
    })
}

const sequenceMedia = () => {
  const media = carouselCurrentMedia.value
  const properties = carouselCurrentProperties.value

  if (!media || !properties) {
    return
  }

  gsap.set(media, { opacity: 0 })

  tl.value = gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: '50% top',
      end: '50% top',
      toggleActions: 'play none none reverse',
      onLeave: () => {
        isAnimationComplete.value = true
      },
      onEnterBack: () => {
        const currentMedia = carouselCurrentMedia.value

        if (!currentMedia) {
          return
        }

        // Prevent flicker on scroll back
        gsap.to(currentMedia, { opacity: 1, duration: 0.01 })
        gsap.to(image.value, { opacity: 1, duration: 0.01 })
        isAnimationComplete.value = false
      },
    },
  })
    .fromTo(
      imageMask.value,
      { clipPath: 'inset(0 0 0 0)' },
      {
        clipPath: () => `inset(${carouselCurrentProperties.value?.relativeTop ?? 0}px ${carouselCurrentProperties.value?.relativeRight ?? 0}px ${carouselCurrentProperties.value?.relativeBottom ?? 0}px ${carouselCurrentProperties.value?.relativeLeft ?? 0}px)`,
        ease: 'power4.inOut',
        duration: 0.75,
      },
    )
    .fromTo(
      image.value,
      { width: '100%', height: '100%', x: 0, y: 0 },
      {
        width: () => carouselCurrentProperties.value?.width ?? 0,
        height: () => carouselCurrentProperties.value?.height ?? 0,
        x: () => carouselCurrentProperties.value?.relativeLeft ?? 0,
        y: () => carouselCurrentProperties.value?.relativeTop ?? 0,
        ease: 'power4.inOut',
        duration: 0.75,
        lazy: false,
        onComplete: () => {
          const currentMedia = carouselCurrentMedia.value

          if (!currentMedia) {
            return
          }

          gsap.set(currentMedia, { opacity: 1 })
          gsap.set(image.value, { opacity: 0 })
          isAnimationComplete.value = true
        },
      },
      '-=90%',
    )
}

const setupScrollProgress = () => {
  ScrollTrigger.create({
    trigger: main.value,
    start: 'top top',
    end: '75% bottom',
    scrub: true,
    onUpdate: (self) => {
      scrollProgress.value = self.progress
      isScrollProgressThemeDark.value = self.progress > 0.66
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

const requestRefresh = gsap.delayedCall(0.05, () => {
  tl.value?.invalidate()
  tl.value?.scrollTrigger?.refresh()
}).pause()

watch(carouselCurrentProperties, () => {
  requestRefresh.restart(true)
}, { flush: 'post' })

onMounted(async () => {
  await wait(100)

  resizeTrigger.value = 1 // Hack to force recompute.

  window.addEventListener('resize', handleResize)

  setupScrollProgress()
  sequenceText()
  sequenceMedia()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  requestRefresh.kill()
  tl.value?.kill()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div
    ref="main"
    v-editable="block"
    class="relative h-[400vh] select-none"
  >
    <!-- <pre class="fixed z-50 top-0 left-0 pointer-events-none">{{ carouselCurrentProperties }}</pre> -->

    <div
      ref="container"
      class="sticky inset-0 z-1 w-full h-screen"
    >
      <div class="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div
          ref="imageMask"
          class="absolute inset-0 z-20"
        >
          <div
            ref="image"
            class="absolute inset-0 z-20 size-full backface-hidden will-change-[width,height]"
          >
            <MediaImage
              v-if="currentCarouselItem?.small_device"
              :asset="currentCarouselItem.small_device"
              sizes="
                xs:100vw
                sm:100vw
              "
              :alt="currentCarouselItem.caption || currentCarouselItem.small_device.alt || ''"
              :lazy="false"
              class="block size-full"
            />
          </div>
        </div>
      </div>

      <div
        class="absolute inset-0 z-30 size-full pointer-events-none transition-opacity ease-out transform-gpu backface-hidden"
        :class="{
          'opacity-100 duration-500 delay-500': !isAnimationComplete,
          'opacity-0 duration-350': isAnimationComplete,
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
          'bg-cream pointer-events-none': !isAnimationComplete,
          'bg-white pointer-events-auto delay-250': isAnimationComplete,
        }"
        class="absolute inset-0 z-10 size-full flex flex-col justify-center transition-colors duration-750 ease-smooth"
      >
        <!-- Carousel navigation buttons -->
        <div class="only-touch:hidden flex absolute inset-0 z-1 mix-blend-difference text-white">
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

          <div
            :class="{ 'is-animation-complete': isAnimationComplete }"
            class="block-carousel__slider size-full overflow-hidden"
          >
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
                },
              }"
            >
              <template #item="{ item, setSlideClasses }">
                <div
                  class="block-carousel__slide-inner size-full px-[calc(var(--app-outer-gutter)_*_0.5)]"
                  :class="setSlideClasses('block-carousel__slide w-[calc(100%-(calc(var(--app-outer-gutter)*3)))] md:w-[calc(59%)]')"
                >
                  <MediaImage
                    v-if="item.small_device"
                    :asset="item.small_device"
                    sizes="
                      xs:100vw
                      sm:100vw"
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
              class="block-carousel__item block-carousel__item--bottom type-mono-12 md:type-mono-14 flex flex-col gap-2 items-center"
              :class="{
                'is-animation-complete': isAnimationComplete,
              }"
            >
              <p>{{ carouselDetails.abs + 1 }}/{{ block.items.length }}</p>

              <p v-if="block.items[carouselDetails.abs]?.caption">
                {{ block.items[carouselDetails.abs]?.caption }}
              </p>
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
      wrapper
    "
  >
    <div
      class="
      w-40
      h-[2px]
      mx-auto
      rounded-full
      overflow-hidden
      bg-current/20
      transition-[scale,color]
      ease-inOutQuart
      text-white
    "
      :class="{
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
.block-carousel__slider {
  & .block-carousel__slide.is-active + .block-carousel__slide .block-carousel__slide-inner {
    translate: 50% 0 0;
    transition: translate 0.75s var(--ease-inOutQuart);
  }

  & .block-carousel__slide:has(+ .block-carousel__slide.is-active) .block-carousel__slide-inner {
    translate: -50% 0 0;
    transition: translate 0.75s var(--ease-inOutQuart);
  }

  &.is-animation-complete {
    & .block-carousel__slide.is-active + .block-carousel__slide .block-carousel__slide-inner,
    & .block-carousel__slide:has(+ .block-carousel__slide.is-active) .block-carousel__slide-inner {
      translate: 0 0 0;
    }
  }
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
</style>
