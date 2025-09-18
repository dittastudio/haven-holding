<script lang="ts" setup>
interface Props {
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
