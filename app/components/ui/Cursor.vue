<script lang="ts" setup>
const hover = useTemplateRef('hover')
const cursorPosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)

const updateCursorPosition = (x: number, y: number) => {
  cursorPosition.value = { x, y }
}

const handleMouseEnter = () => {
  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isHovering.value) {
    return
  }

  const rect = hover.value?.getBoundingClientRect()

  if (!rect) {
    return
  }

  updateCursorPosition(e.clientX - rect.left, e.clientY - rect.top)
}
</script>

<template>
  <span
    ref="hover"
    class="block relative size-full cursor-none"
    @mousemove.passive="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
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
