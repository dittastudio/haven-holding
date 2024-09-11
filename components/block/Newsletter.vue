<script lang="ts" setup>
import { storyblokAssetType, storyblokRichTextContent } from '@/utilities/storyblok'
import type { BlockNewsletterStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockNewsletterStoryblok
}

const props = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(props.block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="props.block"
    class="wrapper"
  >
    <div class="text-center mb-[calc(var(--app-vertical-rhythm)/2)]">
      <p class="text-16 font-mono">
        {{ props.block.title }}
      </p>
    </div>

    <CoreGrid class="gap-y-[calc(var(--app-vertical-rhythm)/2)] items-center">
      <div class="col-span-full md:col-start-2 md:col-span-5">
        <MediaImage
          v-if="props.block.media && assetType === 'image'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
          :lazy="true"
          sizes="
              100vw
              sm:100vw
            "
        />

        <MediaVideo
          v-else-if="props.block.media && assetType === 'video'"
          :asset="props.block.media"
          :ratio="props.block.ratio"
        />
      </div>

      <div class="col-span-full md:col-span-4 md:col-start-8 gap-y-64 flex flex-col">
        <StoryblokRichText
          v-if="storyblokRichTextContent(props.block.text)"
          :content="props.block.text"
          class="prose-p:text-20"
        />

        <div>
          <FormSignUp />
        </div>
      </div>
    </CoreGrid>
  </div>
</template>
