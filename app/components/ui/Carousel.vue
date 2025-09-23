<script lang="ts" setup>
import type { KeenSliderInstance } from 'keen-slider'
import { useIntersectionObserver } from '@vueuse/core'
import KeenSlider from 'keen-slider'
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

interface Props {
  slides: any[]
  options?: {
    autoplay?: boolean
    autoplayDuration?: number
    navigation?: boolean
    pagination?: boolean
    slideClasses?: string
  }
}

const { slides, options = {
  autoplay: false,
  autoplayDuration: 2000,
  navigation: true,
  pagination: true,
  slideClasses: '',
} } = defineProps<Props>()

const slider = useTemplateRef<HTMLElement | null>('slider')
const sliderInstance = ref<KeenSliderInstance | null>(null)

const current = ref(0)
const cursorPosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)
const hoveredButton = ref<'left' | 'right' | null>(null)
const supportsHover = ref(false)
const isVisible = ref(false)
const isReady = ref(false)

// Computed properties for slide states
const slideStates = computed(() => {
  const totalSlides = slides?.length || 0
  if (totalSlides === 0)
    return {}

  const currentIndex = current.value
  const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1
  const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1
  const prevPrevIndex = prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
  const nextNextIndex = nextIndex === totalSlides - 1 ? 0 : nextIndex + 1

  return {
    active: currentIndex,
    previous: prevIndex,
    next: nextIndex,
    previousPrevious: prevPrevIndex,
    nextNext: nextNextIndex,
  }
})

// Function to get slide classes based on index
const getSlideClasses = (index: number) => {
  const states = slideStates.value
  const classes = []

  if (index === states.active)
    classes.push('slide-active')
  if (index === states.previous)
    classes.push('slide-previous')
  if (index === states.next)
    classes.push('slide-next')
  if (index === states.previousPrevious)
    classes.push('slide-previous-previous')
  if (index === states.nextNext)
    classes.push('slide-next-next')

  return classes
}

const currentSlideCaption = computed(() => {
  if (!slides?.length)
    return ''

  const currentSlide = slides[current.value]

  if (currentSlide?.caption) {
    return currentSlide.caption
  }

  return ''
})

const updateCursorPosition = (x: number, y: number) => {
  if (!supportsHover.value) {
    return
  }

  cursorPosition.value = { x, y }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isHovering.value || !supportsHover.value) {
    return
  }

  const rect = slider.value?.getBoundingClientRect()

  if (rect) {
    updateCursorPosition(e.clientX - rect.left, e.clientY - rect.top)
  }
}

const handleMouseEnter = (button: 'left' | 'right') => {
  if (!supportsHover.value) {
    return
  }

  isHovering.value = true
  hoveredButton.value = button
}

const handleMouseLeave = () => {
  if (!supportsHover.value) {
    return
  }

  isHovering.value = false
  hoveredButton.value = null
}

const handleChange = (direction: 'prev' | 'next') => {
  if (!sliderInstance.value) {
    return
  }

  sliderInstance.value[direction]()
}

const depressed = ref(false)

const handleMouseDown = () => {
  depressed.value = true
}

const handleMouseUp = () => {
  depressed.value = false
}

onMounted(() => {
  isReady.value = true
  supportsHover.value = window.matchMedia('(hover: hover)').matches

  const easing = (x: number): number => 1 - (1 - x) ** 4

  if (slider.value) {
    sliderInstance.value = new KeenSlider(slider.value, {
      initial: current.value,
      loop: false,
      slides: {
        number: slides?.length || 0,
        origin: 'center',
        perView: 'auto',
        spacing: 0,
        // perView: 1,
      },
      defaultAnimation: {
        duration: 1000,
        easing,
      },
      slideChanged(slider) {
        current.value = slider.track.details.rel
      },
    })

    // Autoplay logic
    let timeout: ReturnType<typeof setTimeout> | null = null

    const nextTimeout = () => {
      if (!options?.autoplay || !isVisible.value) {
        return
      }

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        sliderInstance.value?.next()
      }, options.autoplayDuration)
    }

    const clearNextTimeout = () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }

    useIntersectionObserver(
      slider,
      ([target]) => {
        if (!target) {
          return
        }

        isVisible.value = target.isIntersecting

        if (options?.autoplay) {
          isVisible.value ? nextTimeout() : clearNextTimeout()
        }
      },
      { threshold: 0.1 },
    )

    if (options?.autoplay) {
      sliderInstance.value.on('dragStarted', clearNextTimeout)
      sliderInstance.value.on('updated', nextTimeout)
      sliderInstance.value.on('animationEnded', nextTimeout)
    }
  }
})

onUnmounted(() => {
  sliderInstance.value?.destroy()
})
</script>

<template>
  <div class="relative h-[inherit]">
    <div
      ref="slider"
      class="ui-carousel-fade__container keen-slider relative w-full h-[inherit]"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="ui-carousel-fade__slide keen-slider__slide w-full select-none"
        :class="[
          options.slideClasses,
          ...getSlideClasses(index),
        ]"
      >
        <slot
          name="slide"
          :slide="slide"
          :index="index"
        />
      </div>

      <!-- Navigation Buttons -->
      <div
        v-if="options.navigation"
        class="absolute inset-0 flex hidden"
      >
        <button
          class="w-1/2 flex items-center justify-start p-[var(--app-outer-gutter)] cursor-none"
          @click="handleChange('prev')"
          @mousemove.passive="handleMouseMove"
          @mouseenter="handleMouseEnter('left')"
          @mouseleave="handleMouseLeave"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
        >
          <span class="sr-only">Previous</span>

          <IconArrowLarge
            class="only-hover:hidden w-[16px] h-[18px] rotate-90 filter-shadow-light"
          />
        </button>

        <button
          class="ui-carousel-fade__button ui-carousel-fade__button--right w-1/2 flex items-center justify-end p-[var(--app-outer-gutter)] cursor-none"
          @click="handleChange('next')"
          @mousemove.passive="handleMouseMove"
          @mouseenter="handleMouseEnter('right')"
          @mouseleave="handleMouseLeave"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
        >
          <span class="sr-only">Next</span>

          <IconArrowLarge
            class="only-hover:hidden w-[16px] h-[18px] -rotate-90 filter-shadow-light"
          />
        </button>
      </div>

      <!-- Cursor Takeover -->
      <div
        v-if="isHovering"
        class="
          absolute
          pointer-events-none
          z-1
          will-change-transform
          top-0
          left-0
          translate-x-[calc(var(--carousel-cursor-x)_-_50%)]
          translate-y-[calc(var(--carousel-cursor-y)_-_50%)]
          [@media(hover:none)]:hidden
          text-black
          filter-shadow-light
        "
        :style="{
          '--carousel-cursor-x': `${cursorPosition.x}px`,
          '--carousel-cursor-y': `${cursorPosition.y}px`,
        }"
      >
        <IconArrowLarge
          class="block w-[16px] h-[18px] transition-all duration-300 ease-out"
          :class="[
            hoveredButton === 'left' ? 'rotate-90' : '-rotate-90',
            {
              'text-white/60': depressed,
              '-translate-x-1/4': depressed && hoveredButton === 'left',
              'translate-x-1/4': depressed && hoveredButton === 'right',
            },
          ]"
        />
      </div>
    </div>

    <div class="wrapper flex gap-x-(--app-inner-gutter) mt-(--app-outer-gutter) type-mono-12 md:type-mono-14">
      <p
        v-if="options.pagination"
        class="w-1/2 text-right"
      >
        <UiDial :number="current + 1" />/{{ slides.length }}
      </p>

      <p
        v-if="currentSlideCaption"
        class="w-1/2"
      >
        {{ currentSlideCaption }}
      </p>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/main.css";

.ui-carousel-fade__container {
  position: relative;
  overflow: hidden;

  display: flex;
  align-content: flex-start;

  touch-action: pan-y;
  user-select: none;
}

.ui-carousel-fade__slide {
  min-height: 100%;
}

.ui-carousel-fade__slide .carousel-slide {
  transition: translate 0.25s var(--ease-out);
}

.ui-carousel-fade__slide.slide-previous .carousel-slide.is-landscape,
.ui-carousel-fade__slide.slide-previous-previous .carousel-slide.is-landscape {
  translate: calc(var(--app-outer-gutter) * -2.5) 0;

  @variant md {
    translate: calc(((var(--_grid-column) * 4) - (var(--app-inner-gutter) / 2)) * -1) 0;
  }
}

.ui-carousel-fade__slide.slide-previous .carousel-slide.is-portrait,
.ui-carousel-fade__slide.slide-previous-previous .carousel-slide.is-portrait {
  translate: calc(var(--app-outer-gutter) / -1) 0;

  @variant md {
    translate: calc((var(--_grid-column) + (var(--_grid-pure-column) / 2)) * -1) 0;
  }
}

.ui-carousel-fade__slide.slide-next .carousel-slide.is-landscape,
.ui-carousel-fade__slide.slide-next-next .carousel-slide.is-landscape {
  translate: calc(var(--app-outer-gutter) * 2.5) 0;

  @variant md {
    translate: calc((var(--_grid-column) * 4) - (var(--app-inner-gutter) / 2)) 0;
  }
}

.ui-carousel-fade__slide.slide-next .carousel-slide.is-portrait,
.ui-carousel-fade__slide.slide-next-next .carousel-slide.is-portrait {
  translate: calc(var(--app-outer-gutter) / 1) 0;

  @variant md {
    translate: calc(var(--_grid-column) + (var(--_grid-pure-column) / 2)) 0;
  }
}
</style>
