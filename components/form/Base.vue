<script lang="ts" setup>
interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<template>
  <form
    novalidate
    :class="[{ 'opacity-50 pointer-events-none transition-opacity duration-300': props.loading }]"
  >
    <slot />
  </form>
</template>
