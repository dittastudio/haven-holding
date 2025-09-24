<script lang="ts" setup>
import type { BlockTextGroup } from '@@/.storyblok/types/303510/storyblok-components'

interface Props {
  block: BlockTextGroup
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text-group wrapper"
  >
    <div
      class="
        border-t
        border-current/50
        pt-9
      "
    >
      <div
        class="
          flex
          gap-x-(--app-inner-gutter)
          gap-y-18
          flex-col
          lg:flex-row
          [&_h1]:type-sans-40-65
          [&_h2,&_h3]:type-mono-16
          [&_p]:type-sans-16
          md:[&_p]:type-sans-18
        "
      >
        <div
          v-for="item in block.items"
          :key="item._uid"
          class="block-text-group__item col-span-full lg:w-1/3 lg:grow"
        >
          <h2>{{ item.title }}</h2>

          <StoryblokText
            v-if="storyblokRichTextContent(item.copy)"
            :content="item.copy"
          />
        </div>
      </div>

      <div class="block-text-group__bottom type-mono-12 md:type-mono-14 text-center pt-[calc(var(--app-vertical-rhythm)_*_1.5)] md:pt-(--app-vertical-rhythm)">
        <StoryblokText
          v-if="storyblokRichTextContent(block.contact)"
          :content="block.contact"
        />
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
