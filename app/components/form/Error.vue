<script lang="ts" setup>
interface Props {
  message?: string
}

const { message = '' } = defineProps<Props>()
</script>

<template>
  <p>
    {{ message }}
  </p>
</template>
