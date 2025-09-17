<script lang="ts" setup>
interface Props {
  a11y?: boolean
  id?: string
  label?: string
  is?: string
}

const props = withDefaults(defineProps<Props>(), {
  a11y: false,
  id: '',
  label: '',
  is: 'label',
})
</script>

<template>
  <div>
    <Component
      :is="props.is"
      v-if="props.label"
      :class="{
        'sr-only': props.a11y,
      }"
      :for="props.id && props.is === 'label' ? props.id : null"
    >
      {{ props.label }}
    </Component>

    <slot />
  </div>
</template>
