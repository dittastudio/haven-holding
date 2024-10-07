<template>
  <div
    class="core-layout"
  >
    <header
      class="core-layout__header"
    >
      <slot name="header" />
    </header>

    <main class="core-layout__main">
      <slot name="main" />
    </main>

    <footer class="core-layout__footer">
      <slot name="footer" />
    </footer>

    <slot name="dev" />
  </div>
</template>

<style lang="postcss">
.core-layout__header {
  pointer-events: none;

  position: sticky;
  z-index: theme('zIndex.10');
  top: 0;

  color: theme('colors.offwhite');

  mix-blend-mode: difference;
}

.core-layout__mask {
  height: calc((100vh + 50vh) + (var(--app-header-height) / 2));
}

.core-layout__mask__outer,
.core-layout__mask__inner {
  height: 100vh;
}

.core-layout__logo {
  backface-visibility: hidden;
  outline: 1px solid transparent;
}
</style>
