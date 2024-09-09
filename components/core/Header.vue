<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'
</script>

<template>
  <div
    class="flex items-center justify-center h-[var(--app-header-height)] px-32"
  >
    <NuxtLink
      to="/"
      class="block pointer-events-auto"
    >
      <IconLogo
        width="136"
        height="27"
      />
    </NuxtLink>
  </div>
</template>
