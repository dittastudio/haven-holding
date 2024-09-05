<script lang="ts" setup>
import IconLogo from '@/assets/icons/logo.svg'
</script>

<template>
  <div class="core-layout">
    <div class="relative">
      <div class="sticky top-0 -z-1">
        <slot name="hero" />
      </div>

      <div class="absolute top-0 inset-x-0 h-[calc(100vh+80px)]">
        <div class="sticky top-[calc(50vh-31px)]">
          <div class="flex items-center justify-center">
            <IconLogo
              width="330"
              heigh="63"
            />
          </div>
        </div>
      </div>

      <div class="bg-offwhite">
        <header class="sticky top-0 z-10 pointer-events-none">
          <slot name="header" />
        </header>

        <main class="core-layout__main">
          <slot name="main" />
        </main>
      </div>
    </div>

    <footer class="core-layout__footer">
      <slot name="footer" />
    </footer>

    <slot name="dev" />
  </div>
</template>
