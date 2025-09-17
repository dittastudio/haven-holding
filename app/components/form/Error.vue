<script lang="ts" setup>
interface Props {
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: '',
})
</script>

<template>
  <p>
    {{ props.message }}
  </p>
</template>
