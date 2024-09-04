<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'
</script>

<template>
  <div class="block-hero bg-gradient-to-br from-poppy to-sky">
    <IconLogo
      width="330"
      heigh="63"
    />
  </div>
</template>

<style lang="postcss">
.block-hero {
  position: sticky;
  z-index: -1;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
}
</style>
