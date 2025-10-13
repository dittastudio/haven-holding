<script lang="ts" setup>
import IconLogo from '@/assets/icons/haven-logo-final.svg'
</script>

<template>
  <div
    data-component="app-header"
    class="
      wrapper
      flex
      items-center
      justify-center
      h-(--app-header-height)
      [html:has([data-component='block-hero'])_&]:opacity-0
      [html:has([data-component='block-hero'])_&]:invisible
    "
  >
    <NuxtLink
      to="/"
      class="block pointer-events-auto"
    >
      <IconLogo
        width="138"
        height="28"
      />
    </NuxtLink>
  </div>
</template>
