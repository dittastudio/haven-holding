<script lang="ts" setup>
interface Props {
  a11y?: boolean
  id?: string
  label?: string
  is?: string
}

const { a11y = false, id = null, label = '', is = 'label' } = defineProps<Props>()
</script>

<template>
  <div>
    <Component
      :is="is"
      v-if="label"
      :class="{
        'sr-only': a11y,
      }"
      :for="id && is === 'label' ? id : null"
    >
      {{ label }}
    </Component>

    <slot />
  </div>
</template>
