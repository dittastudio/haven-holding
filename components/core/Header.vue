<script lang="ts" setup>
import IconLogo from '@/assets/icons/haven-logo-final.svg'
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
        width="138"
        height="28"
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

  transition:
    opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    visibility theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
}

.core-header__link {
  pointer-events: auto;
  display: block;
}
</style>
