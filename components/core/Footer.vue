<script lang="ts" setup>
import IconLogoSymbol from '@/assets/icons/logo-symbol.svg'
</script>

<template>
  <footer class="core-footer wrapper py-32 grid gap-32 md:grid-cols-12">
    <div class="col-span-2">
      <NuxtLink
        to="/"
        class="block"
      >
        <IconLogoSymbol
          width="35"
          height="61"
        />
      </NuxtLink>
    </div>

    <div class="col-span-2">
      Contact
    </div>

    <div class="col-span-2">
      Social
    </div>

    <div class="col-span-6">
      Credits
    </div>
  </footer>
</template>

<style lang="postcss">
.core-footer {
}
</style>
