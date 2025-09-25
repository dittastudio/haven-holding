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
  const currentIndex = current.value

  const states = {
    active: currentIndex,
    previous: -1,
    next: -1,
    previousPrevious: -1,
    nextNext: -1,
  }

  if (totalSlides === 0) {
    return states
  }

  // 1 slide: only active
  if (totalSlides === 1) {
    return states
  }

  // 2 slides: active + next/previous
  if (totalSlides === 2) {
    const otherIndex = currentIndex === 0 ? 1 : 0
    states.previous = currentIndex === 0 ? -1 : otherIndex
    states.next = currentIndex === 0 ? otherIndex : -1
    return states
  }

  // 3 slides: active + next/previous + nextNext/previousPrevious
  if (totalSlides === 3) {
    if (currentIndex === 0) {
      // Slide 1 active: slide 2 is next, slide 3 is next-next
      states.next = 1
      states.nextNext = 2
    }
    else if (currentIndex === 1) {
      // Slide 2 active: slide 1 is previous, slide 3 is next
      states.previous = 0
      states.next = 2
    }
    else {
      // Slide 3 active: slide 1 is previous-previous, slide 2 is previous
      states.previous = 1
      states.previousPrevious = 0
    }
    return states
  }

  // 4 slides: specific logic to avoid conflicts
  if (totalSlides === 4) {
    if (currentIndex === 0) {
      // Slide 1 active: slide 2 is next, slide 3 is next-next, slide 4 has no state
      states.next = 1
      states.nextNext = 2
    }
    else if (currentIndex === 1) {
      // Slide 2 active: slide 1 is previous, slide 3 is next, slide 4 is next-next
      states.previous = 0
      states.next = 2
      states.nextNext = 3
    }
    else if (currentIndex === 2) {
      // Slide 3 active: slide 1 is previous-previous, slide 2 is previous, slide 4 is next
      states.previous = 1
      states.next = 3
      states.previousPrevious = 0
    }
    else {
      // Slide 4 active: slide 1 has no state, slide 2 is previous-previous, slide 3 is previous
      states.previous = 2
      states.previousPrevious = 1
    }
    return states
  }

  // 5+ slides: full logic
  const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1
  const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1
  const prevPrevIndex = prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
  const nextNextIndex = nextIndex === totalSlides - 1 ? 0 : nextIndex + 1

  states.previous = prevIndex
  states.next = nextIndex
  states.previousPrevious = prevPrevIndex
  states.nextNext = nextNextIndex

  return states
})

// Function to get slide classes based on index
const getSlideClasses = (index: number) => {
  const states = slideStates.value
  const classes = []

  if (index === states.active)
    classes.push('slide-active')
  if (states.previous !== undefined && states.previous >= 0 && index === states.previous)
    classes.push('slide-previous')
  if (states.next !== undefined && states.next >= 0 && index === states.next)
    classes.push('slide-next')
  if (states.previousPrevious !== undefined && states.previousPrevious >= 0 && index === states.previousPrevious)
    classes.push('slide-previous-previous')
  if (states.nextNext !== undefined && states.nextNext >= 0 && index === states.nextNext)
    classes.push('slide-next-next')

  return classes
}

// const currentSlideCaption = computed(() => {
//   if (!slides?.length)
//     return ''

//   const currentSlide = slides[current.value]

//   if (currentSlide?.caption) {
//     return currentSlide.caption
//   }

//   return ''
// })

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
      },
      defaultAnimation: {
        duration: 500,
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
      class="keen-slider relative overflow-hidden flex w-full h-[inherit] touch-pan-y select-none"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="keen-slider__slide flex items-center justify-center w-full h-[inherit] min-h-full"
        :class="[
          options.slideClasses,
          ...getSlideClasses(index),
          slide.ratio === 'landscape' ? 'is-landscape' : 'is-portrait',
        ]"
      >
        <div class="ui-carousel__item h-[inherit]">
          <slot
            name="slide"
            :slide="slide"
            :index="index"
          />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div
        v-if="options.navigation"
        class="absolute inset-0 flex hiddenx"
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
        </button>

        <button
          class="ui-carousel__button ui-carousel__button--right w-1/2 flex items-center justify-end p-[var(--app-outer-gutter)] cursor-none"
          @click="handleChange('next')"
          @mousemove.passive="handleMouseMove"
          @mouseenter="handleMouseEnter('right')"
          @mouseleave="handleMouseLeave"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
        >
          <span class="sr-only">Next</span>
        </button>

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
          text-white
          mix-blend-difference
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
                'opacity-60': depressed,
                '-translate-x-1/4': depressed && hoveredButton === 'left',
                'translate-x-1/4': depressed && hoveredButton === 'right',
              },
            ]"
          />
        </div>
      </div>
    </div>

    <slot
      name="caption"
      :slide="slides[current]"
      :current="current"
    />
  </div>
</template>

<style>
@reference "@/assets/css/main.css";

.ui-carousel__item {
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

  .slide-next-next & {
    translate: calc(var(--app-outer-gutter) * 5) 0;

    @variant md {
      translate: calc((var(--_grid-column) * 8) - (var(--app-inner-gutter) / 2)) 0;
    }
  }

  .slide-previous-previous & {
    translate: calc(var(--app-outer-gutter) * -5) 0;

    @variant md {
      translate: calc((var(--_grid-column) * -8) - (var(--app-inner-gutter) / 2)) 0;
    }
  }
}
</style>
