<template>
  <div data-component="app-layout">
    <header
      class="sticky top-0 z-10 transform-gpu mix-blend-difference backface-visibility-hidden text-offwhite pointer-events-none"
    >
      <slot name="header" />
    </header>

    <main>
      <slot name="main" />
    </main>

    <footer>
      <slot name="footer" />
    </footer>

    <slot name="dev" />
  </div>
</template>
