<script setup lang="ts">
const isDev = import.meta.dev
</script>

<template>
  <div>
    <CoreHeader />

    <main>
      <BlockHero />

      <BlockImageText />

      <BlockNewsletter />
    </main>

    <CoreFooter />

    <ToolGrid v-if="isDev" />
  </div>
</template>
