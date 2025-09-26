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

const getSlideClasses = (index: number) => {
  const currentIndex = current.value
  const totalSlides = slides?.length || 0
  const diff = index - currentIndex

  const positions = {
    previousPrevious: -2,
    previous: -1,
    active: 0,
    next: 1,
    nextNext: 2,
  }

  const hasPrevious = currentIndex > 0
  const hasPreviousPrevious = currentIndex > 1
  const hasNext = currentIndex < totalSlides - 1
  const hasNextNext = currentIndex < totalSlides - 2

  switch (diff) {
    case positions.active:
      return 'slide-active'
    case positions.previous:
      return hasPrevious ? 'slide-previous' : ''
    case positions.previousPrevious:
      return hasPreviousPrevious ? 'slide-previous-previous' : ''
    case positions.next:
      return hasNext ? 'slide-next' : ''
    case positions.nextNext:
      return hasNextNext ? 'slide-next-next' : ''
    default:
      return ''
  }
}

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
          getSlideClasses(index),
          slide.ratio === 'landscape' ? 'is-landscape' : 'is-portrait',
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
