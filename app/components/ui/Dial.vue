<script setup lang="ts">
interface Props {
  number: number
}

const props = defineProps<Props>()

const currentNumber = ref(props.number)
const transitionName = ref('slide-up')

// Watch for number changes and determine transition direction
watch(() => props.number, (newNumber, oldNumber) => {
  if (newNumber > oldNumber) {
    transitionName.value = 'slide-up'
  }
  else if (newNumber < oldNumber) {
    transitionName.value = 'slide-down'
  }

  currentNumber.value = newNumber
})
</script>

<template>
  <div class="dial-container">
    <Transition
      :name="transitionName"
      mode="out-in"
    >
      <div
        :key="currentNumber"
        class="dial-number"
      >
        {{ currentNumber }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dial-container {
  display: inline-flex;
  perspective: 1em;
  transform-style: preserve-3d;
}

.dial-number {
  min-width: 1ch;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Slide up transition (for incrementing numbers) */
.slide-up-enter-active {
  transition: all 0.3s var(--ease-outQuart);
}

.slide-up-leave-active {
  transition: all 0.15s var(--ease-inQuart);
}

.slide-up-enter-from {
  translate: 0 50%;
  transform: rotateX(-20deg);
  opacity: 0;
  /* transform: rotateX(10deg); */
  /* transform: translateY(100%);
  opacity: 0; */
}

.slide-up-leave-to {
  translate: 0 -50%;
  transform: rotateX(20deg);
  opacity: 0;
  /* transform: rotateX(10deg); */
  /* transform: translateY(-100%);
  opacity: 0; */
}

/* Slide down transition (for decrementing numbers) */

.slide-down-enter-active {
  transition: all 0.3s var(--ease-outQuart);
}

.slide-down-leave-active {
  transition: all 0.15s var(--ease-inQuart);
}

.slide-down-enter-from {
  translate: 0 -50%;
  transform: rotateX(20deg);
  opacity: 0;
  /* opacity: 0; */
}

.slide-down-leave-to {
  translate: 0 50%;
  transform: rotateX(-20deg);
  opacity: 0;
  /* opacity: 0; */
}
</style>
