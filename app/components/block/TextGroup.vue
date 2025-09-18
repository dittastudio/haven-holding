<script lang="ts" setup>
// import type { BlockTextGroup } from '@@/.storyblok/types/303510/storyblok-components'

// interface Props {
//   block: BlockTextGroup
// }

// const { block } = defineProps<Props>()
</script>

<template>
  <!-- v-editable="block" -->
  <div class="block-text-group wrapper">
    <div
      class="
        border-t
        border-current/30
        pt-7
      "
    >
      <div
        class="
          grid
          grid-cols-(--app-grid)
          gap-x-(--app-inner-gutter)
          gap-y-(--app-vertical-rhythm)
          [&_h1]:type-sans-40-65
          [&_h2,&_h3]:type-mono-16
          [&_p]:type-sans-16
          md:[&_p]:type-sans-18
        "
      >
        <div
          v-for="item in 3"
          :key="item"
          class="block-text-group__item col-span-full lg:col-span-4"
        >
          <h2>Title goes here</h2>

          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis accusamus, a quae commodi rerum possimus! Repellat voluptas nostrum qui magni ullam accusamus aperiam recusandae quis deserunt amet? Atque, dolore est?</p>
        </div>
      </div>

      <div class="block-text-group__bottom type-mono-12 md:type-mono-14 text-center pt-[calc(var(--app-vertical-rhythm)_*_1.5)] md:pt-(--app-vertical-rhythm)">
        <p>
          Email us to plan your retreat

          <br>

          <a href="mailto:info@example.com">info@example.com</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/main.css";

.block-text-group__item {
  & :is(h1, h2, h3, h4, h5, h6) {
    text-wrap: balance;
  }

  & :is(h1, h2, h3, h4, h5, h6) + p {
    margin-block-start: 1.65em;
  }

  & p {
    text-wrap: pretty;
  }

  & p a {
    text-decoration: underline;
    transition: opacity 0.2s var(--ease-out);

    &:hover {
      opacity: 0.4;
    }
  }

  & p + p {
    margin-block-start: 0.5em;
  }
}

.block-text-group__bottom {
  & p a {
    text-decoration: underline;
    transition: opacity 0.2s var(--ease-out);

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
