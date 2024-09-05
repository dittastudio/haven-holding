<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'
</script>

<template>
  <div class="core-header flex items-center justify-center h-[var(--app-header-height)] px-32">
    <NuxtLink
      to="/"
      class="core-header__link block pointer-events-auto"
    >
      <IconLogo
        width="136"
        height="25"
      />
    </NuxtLink>
  </div>
</template>
