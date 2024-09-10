<script lang="ts" setup>
const hover: any = ref(null)
const hoverInner: any = ref(null)

const animateMe = (event: any) => {
  const { offsetX: x, offsetY: y } = event
  const { offsetWidth: width, offsetHeight: height } = hover.value
  const move = 5
  const xMove = x / width * (move * 2) - move
  const yMove = y / height * (move * 2) - move

  hoverInner.value.style.setProperty('--x', `${xMove}px`)
  hoverInner.value.style.setProperty('--y', `${yMove}px`)
}
</script>

<template>
  <span
    ref="hover"
    class="core-footer-credit"
    @mousemove="animateMe"
  >
    <span
      ref="hoverInner"
      class="core-footer-credit__inner"
    >
      <slot />
    </span>
  </span>
</template>

<style lang="postcss">
@keyframes enter {
  from {
    translate: 0 0 0;
  }

  to {
    translate: var(--x) var(--y) 0;
  }
}

@keyframes exit {
  from {
    translate: var(--x) var(--y) 0;
  }

  to {
    translate: 0 0 0;
  }
}

.core-footer-credit {
  --link-padding-x: theme('spacing.4');
  --link-padding-y: theme('spacing.16');

  pointer-events: none;
  display: block;
  margin: calc(-1 * var(--link-padding-y)) calc(-1 * var(--link-padding-x));
  padding: var(--link-padding-y) var(--link-padding-x);
}

.core-footer-credit__inner {
  pointer-events: auto;
  will-change: translate;
  display: inline-block;
  animation: exit theme('transitionDuration.300') theme('transitionTimingFunction.outBack') forwards;

  .core-footer-credit:hover & {
    animation: enter theme('transitionDuration.300') theme('transitionTimingFunction.outBack') forwards;
  }
}
</style>
