<script setup lang="ts">
interface Props {
  number: number
}

const { number } = defineProps<Props>()

const currentNumber = ref(number)
const transitionName = ref('slide-up')

watch(() => number, (newValue, oldValue) => {
  if (newValue > oldValue) {
    transitionName.value = 'slide-up'
  }
  else if (newValue < oldValue) {
    transitionName.value = 'slide-down'
  }

  currentNumber.value = newValue
})
</script>

<template>
  <span class="ui-dial inline-block">
    <Transition
      :name="transitionName"
      mode="out-in"
    >
      <span
        :key="currentNumber"
        class="block min-w-[1ch] transform-gpu"
      >
        <slot />
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.ui-dial {
  --_scale: 0.975;
  --_opacity: 0;
  --_y: 0.5em;
}

.slide-up-enter-active {
  transition: all 0.3s var(--ease-outQuart);
}

.slide-up-leave-active {
  transition: all 0.15s var(--ease-inQuart);
}

.slide-up-enter-from {
  translate: 0 var(--_y);
  scale: var(--_scale);
  opacity: var(--_opacity);
}

.slide-up-leave-to {
  translate: 0 calc(-1 * var(--_y));
  scale: var(--_scale);
  opacity: var(--_opacity);
}

.slide-down-enter-active {
  transition: all 0.3s var(--ease-outQuart);
}

.slide-down-leave-active {
  transition: all 0.15s var(--ease-inQuart);
}

.slide-down-enter-from {
  translate: 0 calc(-1 * var(--_y));
  scale: var(--_scale);
  opacity: var(--_opacity);
}

.slide-down-leave-to {
  translate: 0 var(--_y);
  scale: var(--_scale);
  opacity: var(--_opacity);
}
</style>
