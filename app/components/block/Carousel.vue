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
const textBackground = useTemplateRef('textBackground')
const carousel = useTemplateRef<Carousel>('carousel')

const tl = ref<gsap.core.Timeline | null>(null)
const isCarouselAnimation = ref(false)
const isCarouselAnimationComplete = ref(false)

const scrollProgress = ref(0)
const isScrollProgressVisible = ref(false)

let lockedScrollPosition: number | null = null

const preventScrolling = () => {
  if (lockedScrollPosition !== null) {
    window.scrollTo(0, lockedScrollPosition)
  }
}

const lockScroll = () => {
  lockedScrollPosition = window.scrollY
  window.addEventListener('scroll', preventScrolling, { passive: false })
}

const unlockScroll = () => {
  window.removeEventListener('scroll', preventScrolling)
  lockedScrollPosition = null
}

const carouselDetails = computed(() => carousel.value?.carousel.details.value)
const currentSlideIndex = computed(() => carouselDetails.value?.abs ?? 0)
const carouselSlides = computed(() => carousel.value?.carousel.slider.value?.slides)
const carouselCurrentSlide = computed(() => carouselSlides.value?.[currentSlideIndex.value])
const carouselCurrentMedia = computed(() => carouselCurrentSlide.value?.querySelector('img'))

const reTrigger = ref(0)

const carouselCurrentProperties = computed(() => {
  const slide = carousel.value?.carousel.slider.value?.slides[carouselDetails.value?.abs ?? 0]
  const media = slide?.querySelector('img')

  if (!media || !container.value) {
    return null
  }

  const mediaRect = media.getBoundingClientRect()
  const containerRect = container.value.getBoundingClientRect()

  const mediaRectWidth = Math.round(mediaRect.width)
  const mediaRectHeight = Math.round(mediaRect.height)
  const containerRectWidth = Math.round(containerRect.width)
  const containerRectHeight = Math.round(containerRect.height)

  const relativeTop = mediaRect.top - containerRect.top
  const relativeLeft = mediaRect.left - containerRect.left
  const relativeBottom = containerRectHeight - mediaRectHeight - relativeTop
  const relativeRight = containerRectWidth - mediaRectWidth - relativeLeft

  return {
    _trigger: reTrigger.value,
    width: mediaRectWidth,
    height: mediaRectHeight,
    relativeTop,
    relativeLeft,
    relativeBottom,
    relativeRight,
  }
})

const currentCarouselItem = computed(() => block.items[currentSlideIndex.value])

const sequenceText = () => {
  if (!text.value) {
    return
  }

  const spans = text.value.querySelectorAll('span')

  if (!spans.length) {
    return
  }

  const split = SplitText.create(spans, { type: 'chars' })

  gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: 'top top',
      end: '60% top',
      scrub: 0.5,
    },
  })
    .fromTo(textBackground.value, { opacity: 0 }, { opacity: 1 })
    .from(split.chars, {
      opacity: 0,
      yPercent: -10,
      skewY: -5,
      rotateY: -20,
      stagger: 0.05,
    })
}

const sequenceMedia = () => {
  if (!carouselCurrentMedia.value || !carouselCurrentProperties.value) {
    return
  }

  gsap.set(carouselCurrentMedia.value.parentElement, { opacity: 0 })

  tl.value = gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: '60% top',
      end: '60% top',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
      onLeave: () => {
        isCarouselAnimation.value = true
      },
      onEnterBack: () => {
        if (!carouselCurrentMedia.value) {
          return
        }

        gsap.set(carouselCurrentMedia.value.parentElement, { opacity: 0 })
        gsap.set(image.value, { opacity: 1 })

        isCarouselAnimation.value = false
        isCarouselAnimationComplete.value = false
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
        onStart: () => {
          lockScroll()
        },
        onComplete: () => {
          if (!carouselCurrentMedia.value) {
            return
          }

          gsap.set(carouselCurrentMedia.value.parentElement, { opacity: 1 })
          gsap.set(image.value, { opacity: 0 })
          unlockScroll()

          isCarouselAnimationComplete.value = true
        },
      },
      '-=90%',
    )
}

const setupScrollProgress = () => {
  ScrollTrigger.create({
    trigger: main.value,
    start: 'top top',
    end: '85% bottom',
    scrub: true,
    markers: false,
    onUpdate: (self) => {
      scrollProgress.value = self.progress
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

const doRetrigger = () => {
  reTrigger.value += 1

  if (lockedScrollPosition !== null) {
    lockedScrollPosition = window.scrollY
  }
}

const requestRefresh = gsap.delayedCall(0.05, () => {
  tl.value?.invalidate()
}).pause()

watch(
  () => carouselCurrentProperties.value,
  () => {
    requestRefresh.restart(true)
  },
  {
    flush: 'post',
    immediate: true,
  },
)

onMounted(async () => {
  await wait(100)

  doRetrigger()

  setupScrollProgress()
  sequenceText()
  sequenceMedia()

  window.addEventListener('resize', doRetrigger)
})

onUnmounted(() => {
  window.removeEventListener('resize', doRetrigger)
  unlockScroll()
  requestRefresh.kill()
  tl.value?.kill()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div
    ref="main"
    v-editable="block"
    class="relative isolate h-[400vh] select-none"
  >
    <!-- <pre class="fixed z-50 bottom-5 left-5 bg-white/50 backdrop-blur-2xl text-12 p-4 rounded pointer-events-none">{{ carouselCurrentProperties }}</pre> -->

    <div
      ref="container"
      class="sticky inset-0 w-full h-screen"
    >
      <!-- Hero Media -->
      <div class="absolute inset-0 z-1 pointer-events-none flex items-center justify-center">
        <div
          ref="imageMask"
          class="size-full"
        >
          <div
            ref="image"
            class="size-full transform-gpu backface-hidden"
          >
            <MediaImage
              v-if="currentCarouselItem?.image"
              :asset="currentCarouselItem.image"
              sizes="
                xs:100vw
                sm:100vw
                md:100vw
              "
              :alt="currentCarouselItem.caption || currentCarouselItem.image.alt || ''"
              class="block size-full"
              :cover="true"
              @load="doRetrigger"
            />
          </div>
        </div>
      </div>

      <!-- Hero Text -->
      <div
        class="absolute inset-0 z-2 size-full pointer-events-none transition-opacity ease-out transform-gpu backface-hidden"
        :class="{
          'opacity-100 duration-500 delay-500': !isCarouselAnimation,
          'opacity-0 duration-350': isCarouselAnimation,
        }"
      >
        <div
          ref="textBackground"
          class="size-full text-white bg-black/30"
        >
          <p
            ref="text"
            class="h-svh type-sans-30-70 px-(--app-outer-gutter) py-(--app-header-height) flex flex-col justify-between"
          >
            <span class="self-end">A</span>

            <span class="self-start">space</span>

            <span class="self-center">for</span>

            <span class="self-end">creation</span>
          </p>
        </div>
      </div>

      <!-- Carousel -->
      <div
        :class="{
          'bg-cream': !isCarouselAnimation,
          'bg-white delay-250': isCarouselAnimation,
          'pointer-events-none': !isCarouselAnimationComplete,
          'pointer-events-auto': isCarouselAnimationComplete,
        }"
        class="size-full flex flex-col justify-center transition-colors duration-750 ease-smooth"
      >
        <!-- Navigation buttons -->
        <div class="only-touch:hidden flex absolute inset-0 z-1 mix-blend-difference text-white">
          <button
            v-for="button in ['previous', 'next'] as const"
            :key="button"
            class="group/button w-1/2 outline-none"
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
                'is-animation-complete': isCarouselAnimation,
              }"
            >
              The Space
            </h2>
          </div>

          <div
            :class="{ 'is-animation-complete': isCarouselAnimation }"
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
              <template #item="{ index, item, setSlideClasses }">
                <div
                  class="block-carousel__slide-inner size-full px-[calc(var(--app-outer-gutter)_*_0.5)]"
                  :class="setSlideClasses('block-carousel__slide w-[calc(100%-(calc(var(--app-outer-gutter)*3)))] md:w-[59%]')"
                >
                  <MediaImage
                    v-if="item.image"
                    :asset="item.image"
                    sizes="
                      xs:100vw
                      sm:100vw
                      md:60vw
                      lg:60vw
                      xl:60vw
                    "
                    :alt="item.caption || item.image.alt || ''"
                    :lazy="index === 0 ? false : true"
                    @load="doRetrigger"
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
                'is-animation-complete': isCarouselAnimation,
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
  --_duration: 0.35s;
  --_ease: var(--ease-outQuart);

  opacity: 0;
  scale: 1.1;

  transition:
    opacity var(--_duration) var(--ease-out),
    translate var(--_duration) var(--_delay),
    scale var(--_duration) var(--_delay);

  &.is-animation-complete {
    opacity: 1;
    translate: 0 0 0;
    scale: 1;

    transition:
      opacity var(--_duration) var(--_ease) var(--_delay),
      translate var(--_duration) var(--_ease) var(--_delay),
      scale var(--_duration) var(--_ease) var(--_delay);
  }
}

.block-carousel__item--top {
  translate: 0 -50% 0;
}

.block-carousel__item--bottom {
  translate: 0 50% 0;
}
</style>
