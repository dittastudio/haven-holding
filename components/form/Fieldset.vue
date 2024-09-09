<script lang="ts" setup>
interface Props {
  a11y?: boolean
  legend?: string
}

const { legend = '' } = defineProps<Props>()
</script>

<template>
  <fieldset>
    <legend class="sr-only">
      {{ legend }}
    </legend>

    <slot />
  </fieldset>
</template>
