<script lang="ts" setup>
interface Props {
  type?: 'rounded' | 'squared'
  theme?: 'white' | 'black'
}

const props = defineProps<Props>()
</script>

<template>
  <span
    class="ui-button text-14 font-mono"
    :class="[
      { [`ui-button--type-${props.type}`]: props.type },
      { [`ui-button--theme-${props.theme}`]: props.theme },
    ]"
  >
    <span class="ui-button__text">
      <slot />
    </span>
  </span>
</template>

<style lang="postcss">
.ui-button {
  --button-padding-y: 0.8575em;
  --button-padding-x: 2.45em;
  --button-color: theme('colors.white');
  --button-hover-color: theme('colors.offblack');
  --button-hover-tint: theme('colors.black/10%');
  --button-duration: 0.2s;

  isolation: isolate;
  position: relative;

  display: inline-flex;

  padding: var(--button-padding-y) var(--button-padding-x);

  line-height: 1;
  color: var(--button-color);

  background-color: transparent;
  border: 1px solid var(--button-color);

  transition:
    background-color var(--button-duration) theme('transitionTimingFunction.smooth'),
    border-color var(--button-duration) theme('transitionTimingFunction.smooth'),
    color var(--button-duration) theme('transitionTimingFunction.smooth');

  &::after {
    content: '';

    position: absolute;
    z-index: 0;
    inset: 0;

    opacity: 0;
    background-color: var(--button-hover-tint);
    border-radius: inherit;

    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  &--type-rounded {
    border-radius: theme('borderRadius.full');
  }

  &--type-squared {
    border-radius: theme('borderRadius.sm');
  }

  &--theme-white {
    --button-color: theme('colors.white');
    --button-hover-color: theme('colors.offblack');
    --button-hover-tint: theme('colors.black/10%');
  }

  &--theme-black {
    --button-color: theme('colors.offblack');
    --button-hover-color: theme('colors.offwhite');
    --button-hover-tint: theme('colors.white/10%');
  }

  a:active &::after,
  button:not(:disabled):active &::after {
    opacity: 1;
  }

  @media (hover: hover) {
    a:hover &,
    button:not(:disabled):hover & {
      color: var(--button-hover-color);
      background-color: var(--button-color);
      border-color: var(--button-color);
    }
  }
}

.ui-button__text {
  position: relative;
  z-index: 1;
}
</style>
