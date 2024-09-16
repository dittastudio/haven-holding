<script lang="ts" setup>
import { wait } from '@/utilities/helpers'

const logo: any = ref(null)

onMounted(async () => {
  await wait(3000).then(() => {
    logo.value.classList.add('has-ended')
  })
})
</script>

<template>
  <div
    ref="logo"
    class="logo"
  >
    <div class="logo__wrapper">
      <div class="box box--top">
        <div class="circle circle--top" />

        <div class="letter">
          <span class="pillar" />

          <span class="bridge" />

          <span class="pillar" />
        </div>
      </div>

      <div class="box box--bottom">
        <div class="circle circle--bottom" />

        <div class="waves">
          <svg
            class="wave"
            width="50"
            height="16"
            viewBox="0 0 50 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.35 5.57001C37.26 10.74 32.54 10.75 30.45 5.57001C29.02 2.03001 26.84 0 24.49 0C22.14 0 19.97 2.03 18.53 5.58C16.45 10.75 11.72 10.76 9.63 5.58C8.2 2.04 6.03 0.0100098 3.67 0.0100098C2.36 0.0100098 1.1 0.659996 0 1.84V8.16C1 6.54 2.28 5.62001 3.67 5.62001C5.45 5.62001 7.07 7.1 8.12 9.67C9.55 13.22 11.73 15.26 14.09 15.26C16.45 15.26 18.62 13.22 20.05 9.67C21.09 7.09 22.72 5.61 24.5 5.61C26.28 5.61 27.9 7.09 28.94 9.66C30.38 13.21 32.55 15.25 34.91 15.25C37.27 15.25 39.44 13.21 40.87 9.66C41.92 7.08 43.54 5.60001 45.32 5.60001C47.03 5.60001 48.58 7.00001 49.63 9.40001V2.62001C48.37 0.95001 46.87 0.02 45.32 0C42.97 0 40.79 2.03 39.35 5.58"
            />
          </svg>

          <svg
            class="wave"
            width="50"
            height="16"
            viewBox="0 0 50 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.35 5.57001C37.26 10.74 32.54 10.75 30.45 5.57001C29.02 2.03001 26.84 0 24.49 0C22.14 0 19.97 2.03 18.53 5.58C16.45 10.75 11.72 10.76 9.63 5.58C8.2 2.04 6.03 0.0100098 3.67 0.0100098C2.36 0.0100098 1.1 0.659996 0 1.84V8.16C1 6.54 2.28 5.62001 3.67 5.62001C5.45 5.62001 7.07 7.1 8.12 9.67C9.55 13.22 11.73 15.26 14.09 15.26C16.45 15.26 18.62 13.22 20.05 9.67C21.09 7.09 22.72 5.61 24.5 5.61C26.28 5.61 27.9 7.09 28.94 9.66C30.38 13.21 32.55 15.25 34.91 15.25C37.27 15.25 39.44 13.21 40.87 9.66C41.92 7.08 43.54 5.60001 45.32 5.60001C47.03 5.60001 48.58 7.00001 49.63 9.40001V2.62001C48.37 0.95001 46.87 0.02 45.32 0C42.97 0 40.79 2.03 39.35 5.58"
            />
          </svg>

          <svg
            class="wave"
            width="50"
            height="16"
            viewBox="0 0 50 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.35 5.57001C37.26 10.74 32.54 10.75 30.45 5.57001C29.02 2.03001 26.84 0 24.49 0C22.14 0 19.97 2.03 18.53 5.58C16.45 10.75 11.72 10.76 9.63 5.58C8.2 2.04 6.03 0.0100098 3.67 0.0100098C2.36 0.0100098 1.1 0.659996 0 1.84V8.16C1 6.54 2.28 5.62001 3.67 5.62001C5.45 5.62001 7.07 7.1 8.12 9.67C9.55 13.22 11.73 15.26 14.09 15.26C16.45 15.26 18.62 13.22 20.05 9.67C21.09 7.09 22.72 5.61 24.5 5.61C26.28 5.61 27.9 7.09 28.94 9.66C30.38 13.21 32.55 15.25 34.91 15.25C37.27 15.25 39.44 13.21 40.87 9.66C41.92 7.08 43.54 5.60001 45.32 5.60001C47.03 5.60001 48.58 7.00001 49.63 9.40001V2.62001C48.37 0.95001 46.87 0.02 45.32 0C42.97 0 40.79 2.03 39.35 5.58"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.logo {
  --nudge: calc(20 / 170 * 1em);
  --easeSmooth: cubic-bezier(0.4, 0.0, 0.2, 1);
  --easeIn: cubic-bezier(0.4, 0.0, 1, 1);
  --easeOut: cubic-bezier(0.0, 0.0, 0.2, 1);
  --easeInOutSharp: cubic-bezier(1, 0, 0.25, 1);
  --easeInOutExpo: cubic-bezier(0.87, 0, 0.13, 1);
  --easeInExpo: cubic-bezier(0.7, 0, 0.84, 0);
  --easeOutExpo: cubic-bezier(0.16, 1, 0.3, 1);
  --sharp: 0.8s var(--easeInOutSharp);
  --page-delay: 1.5s;

  font-size: clamp(7.5rem, 5.3571rem + 10.7143vw, 15rem);
  color: theme('colors.offblack');
}

@keyframes rotate-logo {
  from {
    rotate: 180deg;
  }

  to {
    rotate: 0deg;
  }
}

@keyframes rotate-logo-reverse {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 180deg;
  }
}

.logo__wrapper {
  rotate: 180deg;
  animation: rotate-logo 0.5s var(--easeOut) var(--page-delay) forwards;

  .logo.has-ended & {
    animation: rotate-logo-reverse 0.5s var(--easeSmooth) 0s forwards;
  }
}

.box {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 1em;
  height: 1em;
}

.box--top {
  margin-bottom: calc(40 / 170 * -1em);
}

.circle {
  position: absolute;
  inset: 0;

  border: calc(2 / 170 * 1em) solid currentColor;
  border-radius: 50%;
  outline: 1px solid transparent;
}

@keyframes circle-top {
  from {
    translate: 0 calc(50% - var(--nudge)) 0;
  }

  to {
    translate: 0 0 0;
  }
}

@keyframes circle-top-reverse {
  from {
    translate: 0 0 0;
  }

  to {
    translate: 0 calc(50% - var(--nudge)) 0;
    opacity: 0;
  }
}

.circle--top {
  translate: 0 calc(50% - var(--nudge)) 0;
  animation: circle-top 0.8s var(--easeInOutSharp) var(--page-delay) forwards;

  .logo.has-ended & {
    animation: circle-top-reverse 0.8s var(--easeInOutSharp) 0s forwards;
  }
}

@keyframes circle-bottom {
  from {
    translate: 0 calc(-50% + var(--nudge)) 0;
  }

  to {
    translate: 0 0 0;
  }
}

@keyframes circle-bottom-reverse {
  from {
    translate: 0 0 0;
  }

  to {
    translate: 0 calc(-50% + var(--nudge)) 0;
    opacity: 0;
  }
}

.circle--bottom {
  translate: 0 calc(-50% + var(--nudge)) 0;
  animation: circle-bottom 0.8s var(--easeInOutSharp) var(--page-delay) forwards;

  .logo.has-ended & {
    animation: circle-bottom-reverse 0.8s var(--easeInOutSharp) 0s forwards;
  }
}

@keyframes letter-opacity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes letter-opacity-reverse {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.letter {
  --_letter-length: calc(50 / 170 * 1em);

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: var(--_letter-length);
  height: var(--_letter-length);

  opacity: 0;

  animation: letter-opacity 0.5s var(--easeOutExpo) calc(var(--page-delay) + 0.5s) forwards;

  .logo.has-ended & {
    animation: letter-opacity-reverse 0.2s var(--easeSmooth) 0s forwards;
  }
}

@keyframes pillar-left {
  from {
    translate: var(--_pillar-center) 0 0;
  }

  to {
    translate: 0 0 0;
  }
}

@keyframes pillar-right {
  from {
    translate: calc(var(--_pillar-center) * -1) 0 0;
  }

  to {
    translate: 0 0 0;
  }
}

.pillar {
  --_pillar-length: calc(8 / 170 * 1em);
  --_pillar-center: calc(
    (var(--_letter-length) / 2) - (var(--_pillar-length) / 2)
  );

  flex-shrink: 0;
  width: var(--_pillar-length);
  height: 100%;
  background-color: currentColor;

  &:first-child {
    translate: var(--_pillar-center) 0 0;
    animation: pillar-left 0.3s var(--easeInOutSharp) calc(var(--page-delay) + 0.45s) forwards;
  }

  &:last-child {
    translate: calc(var(--_pillar-center) * -1) 0 0;
    animation: pillar-right 0.3s var(--easeInOutSharp) calc(var(--page-delay) + 0.45s) forwards;
  }
}

@keyframes bridge-open {
  from {
    scale: 0 1;
  }

  to {
    scale: 1 1;
  }
}

.bridge {
  scale: 0 1;

  width: 100%;
  height: calc(2 / 170 * 1em);

  background-color: currentColor;

  animation: bridge-open 0.3s var(--easeInOutExpo) calc(var(--page-delay) + 0.55s) forwards;
}

.waves {
  position: relative;
  top: calc(3 / 170 * 1em);

  display: flex;
  flex-direction: column;
  gap: calc(2 / 170 * 1em);
}

@keyframes wave-down {
  from {
    translate: 0 -20% 0;
    scale: 0.6;
    opacity: 0;
  }

  to {
    translate: 0 0 0;
    scale: 1;
    opacity: 1;
  }
}

@keyframes wave-down-reverse {
  from {
    translate: 0 0 0;
    scale: 1;
    opacity: 1;
  }

  to {
    translate: 0 0 0;
    scale: 1;
    opacity: 0;
  }
}

.wave {
  --_wave-width: calc(50 / 170 * 1em);
  --_wave-height: calc(16 / 170 * 1em);

  translate: 0 -20% 0;
  scale: 0.6;

  width: var(--_wave-width);
  height: var(--_wave-height);

  opacity: 0;

  .logo.has-ended & {
    animation: wave-down-reverse 0.2s var(--easeSmooth) 0s forwards;
  }

  &:nth-child(1) {
    animation: wave-down 0.5s var(--easeOutExpo) calc(var(--page-delay) + 0.5s) forwards;
  }

  &:nth-child(2) {
    animation: wave-down 0.5s var(--easeOutExpo) calc(var(--page-delay) + 0.525s) forwards;
  }

  &:nth-child(3) {
    animation: wave-down 0.5s var(--easeOutExpo) calc(var(--page-delay) + 0.55s) forwards;
  }
}
</style>
