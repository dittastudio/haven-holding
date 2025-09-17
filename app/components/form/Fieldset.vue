<script lang="ts" setup>
interface Props {
  legend?: string
}

const props = withDefaults(defineProps<Props>(), {
  legend: '',
})
</script>

<template>
  <fieldset>
    <legend class="sr-only">
      {{ props.legend }}
    </legend>

    <slot />
  </fieldset>
</template>
