<script setup lang="ts">
import IconLogo from '@/assets/icons/logo.svg'

const isDev = import.meta.dev
</script>

<template>
  <div>
    <!-- <CoreHeader /> -->

    <div>
      <BlockHero />

      <div class="bg-offwhite">
        <CoreHeader />

        <main>
          <NuxtPage />
          <!-- <div class="absolute inset-0 top-[50vh]">
        <div class="sticky top-0">
          <IconLogo
            width="330"
            heigh="63"
          />
        </div>
      </div> -->

          <BlockImageText />

          <BlockNewsletter />
        </main>
      </div>
    </div>

    <CoreFooter />

    <ToolGrid v-if="isDev" />
  </div>
</template>
