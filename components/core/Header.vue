<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'
</script>

<template>
  <header class="core-header">
    <NuxtLink
      to="/"
      class="block"
    >
      <IconLogo
        width="136"
        height="25"
      />
    </NuxtLink>
  </header>
</template>

<style lang="postcss">
.core-header {
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--app-header-height);
  padding-inline: theme('spacing.32');
}
</style>
