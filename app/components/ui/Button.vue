<script lang="ts" setup>
interface Props {
  theme?: 'white' | 'black'
}

const { theme } = defineProps<Props>()
</script>

<template>
  <span
    class="
      type-mono-14
      isolate
      relative
      inline-flex
      leading-none
      rounded-full
      px-[2.45em]
      py-[0.8575em]
      border
      border-current
      transition-all
      duration-200
      ease-out
      after:absolute
      after:-inset-px
      after:z-0
      after:rounded-[inherit]
      after:opacity-0
      after:transition-opacity
      after:duration-200
      after:ease-smooth
      cta-active:after:opacity-10
    "
    :class="
      {
        'text-offblack cta-hover:bg-offblack cta-hover:text-white cta-hover:border-offblack after:bg-white': theme === 'black',
        'text-white cta-hover:bg-white cta-hover:text-offblack cta-hover:border-white after:bg-black': theme === 'white',
      }
    "
  >
    <span class="relative z-1">
      <slot />
    </span>
  </span>
</template>
