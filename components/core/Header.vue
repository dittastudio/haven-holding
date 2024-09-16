<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'
</script>

<template>
  <div
    class="core-header wrapper"
  >
    <NuxtLink
      to="/"
      class="core-header__link"
    >
      <IconLogo
        width="136"
        height="26"
      />
    </NuxtLink>
  </div>
</template>

<style lang="postcss">
.core-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--app-header-height);

}

.core-header__link {
  pointer-events: auto;
  display: block;
}
</style>
