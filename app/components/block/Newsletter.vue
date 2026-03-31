<script lang="ts" setup>
import type { BlockNewsletter } from '@@/.storyblok/types/303510/storyblok-components'

interface Props {
  block: BlockNewsletter
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    data-component="block-newsletter"
    class="block-newsletter wrapper"
  >
    <p
      class="
        type-mono-16
        text-center
        mb-[calc(var(--app-vertical-rhythm)/1.25)]
        md:mb-[calc(var(--app-vertical-rhythm)/1.5)]
      "
    >
      {{ block.title }}
    </p>

    <div
      class="
        grid
        grid-cols-(--app-grid)
        gap-x-(--app-inner-gutter)
        gap-y-[calc(var(--app-vertical-rhythm)/2)]
        items-center
        sm:grid-cols-2
      "
    >
      <div
        class="
          col-span-full
          md:col-start-2 md:col-span-5
          md:-me-[calc(var(--app-inner-gutter)/2)]
          max-md:px-(--app-outer-gutter)
        "
      >
        <MediaImage
          v-if="block.media && assetType === 'image'"
          :asset="block.media"
          :ratio="block.ratio"
          :sizes="`
            100vw
            sm:100vw
            md:${5 / 12 * 100}vw
            3xl:${5 / 12 * 1920}px
          `"
        />

        <MediaVideo
          v-else-if="block.media && assetType === 'video'"
          :asset="block.media"
          :ratio="block.ratio"
        />
      </div>

      <div
        class="
          col-span-full
          md:col-start-7 md:col-span-5
          md:ps-(--app-inner-gutter)
          lg:col-start-8 lg:col-span-4
          lg:ps-0
          flex
          flex-col
          gap-[calc(var(--app-vertical-rhythm)_/_2)]
        "
      >
        <div class="[&_p]:type-sans-20 [&_p]:text-pretty [&_p+p]:mt-[1lh]">
          <StoryblokText
            v-if="storyblokRichTextContent(block.text)"
            :content="block.text"
          />
        </div>

        <div>
          <FormSignUp />
        </div>
      </div>
    </div>
  </div>
</template>
