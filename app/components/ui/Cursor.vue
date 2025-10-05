<script lang="ts" setup>
const hover = ref<HTMLElement | null>(null)
const cursorPosition = ref({ x: 0, y: 0 })
const supportsHover = ref(false)
const isHovering = ref(false)
const isDepressed = ref(false)

const updateCursorPosition = (x: number, y: number) => {
  if (!supportsHover.value) {
    return
  }

  cursorPosition.value = { x, y }

  console.log(cursorPosition.value)
}

const handleMouseEnter = () => {
  if (!supportsHover.value) {
    return
  }

  isHovering.value = true
}

const handleMouseLeave = () => {
  if (!supportsHover.value) {
    return
  }

  isHovering.value = false
}

const handleMouseDown = () => {
  isDepressed.value = true
}

const handleMouseUp = () => {
  isDepressed.value = false
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isHovering.value || !supportsHover.value) {
    return
  }

  const rect = hover.value?.getBoundingClientRect()

  if (rect) {
    updateCursorPosition(e.clientX - rect.left, e.clientY - rect.top)
  }
}

onMounted(() => {
  supportsHover.value = window.matchMedia('(hover: hover)').matches
})

onUnmounted(() => {
  supportsHover.value = false
})
</script>

<template>
  <span
    ref="hover"
    class="block relative size-full cursor-none"
    @mousemove.passive="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <span
      v-if="isHovering"
      class="
        pointer-events-none
        absolute
        z-1
        top-0
        left-0
        translate-x-[calc(var(--carousel-cursor-x)_-_50%)]
        translate-y-[calc(var(--carousel-cursor-y)_-_50%)]
        will-change-transform
      "
      :style="{
        '--carousel-cursor-x': `${cursorPosition.x}px`,
        '--carousel-cursor-y': `${cursorPosition.y}px`,
      }"
    >
      <slot />
    </span>
  </span>
</template>

<style>
/* @reference "@/assets/css/main.css"; */
</style>
