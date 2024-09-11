<template>
  <div class="core-grid">
    <slot />
  </div>
</template>

<style lang="postcss">
.core-grid {
  display: grid;
  grid-template-columns: var(--app-grid);
  column-gap: var(--app-inner-gutter);
}
</style>
