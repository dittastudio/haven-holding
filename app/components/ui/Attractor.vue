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
    class="ui-attractor"
    @mousemove="animateMe"
  >
    <span
      ref="hoverInner"
      class="ui-attractor__inner"
    >
      <slot />
    </span>
  </span>
</template>

<style>
@reference "@/assets/css/main.css";

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

.ui-attractor {
  --padding-x: --spacing(1);
  --padding-y: --spacing(4);

  pointer-events: none;
  display: block;
}

.ui-attractor__inner {
  pointer-events: auto;
  will-change: translate;

  display: block;

  margin: calc(-1 * var(--padding-y)) calc(-1 * var(--padding-x));
  padding: var(--padding-y) var(--padding-x);

  animation: exit 0.3s var(--ease-outBack) forwards;

  .ui-attractor:hover & {
    animation: enter 0.3s var(--ease-outBack) forwards;
  }
}
</style>
