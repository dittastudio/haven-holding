<script lang="ts" setup>
import IconLogoSymbol from '@/assets/icons/logo-symbol.svg'
import { storyblokRichTextContent } from '@/utilities/storyblok'
import type { RichtextStoryblok, SocialItemStoryblok } from '@/types/storyblok'

interface Props {
  address: RichtextStoryblok | undefined
  socials: SocialItemStoryblok[] | undefined
}

const props = defineProps<Props>()
</script>

<template>
  <div class="bg-white">
    <div class="core-footer wrapper md:pb-80 text-14 gap-y-48 pt-32 pb-40 font-mono">
      <div class="md:col-span-2 col-span-1">
        <NuxtLink
          to="/"
          class="ease-smooth hover:opacity-60 inline-block transition-opacity duration-200"
        >
          <IconLogoSymbol class="w-[46px] md:w-[35px] h-auto" />
        </NuxtLink>
      </div>

      <div class="md:col-span-2 col-span-2">
        <h4 class="mb-8">
          Contact
        </h4>

        <StoryblokRichText
          v-if="storyblokRichTextContent(props.address)"
          :content="props.address"
          class="prose-p:text-14"
        />
      </div>

      <div class="md:col-span-2 col-span-2">
        <h4 class="mb-8">
          Social
        </h4>

        <ul class="core-footer__social-list flex flex-col">
          <li
            v-for="social in props.socials"
            :key="social._uid"
          >
            <StoryblokLink
              v-if="social.link"
              class="core-footer__link"
              :item="social.link"
              :title="social.title"
            >
              {{ social.title }}
            </StoryblokLink>
          </li>
        </ul>
      </div>

      <div class="md:col-span-6 md:col-start-auto md:text-right col-span-4 col-start-2">
        <div class="core-footer__credit-list gap-x-8 inline-flex flex-wrap items-baseline">
          <NuxtLink
            class="core-footer__link core-footer__link--credit"
            to="https://studioparallel.co.uk/"
            target="_blank"
            rel="noopener"
          >
            <UiAttractor>
              Design by Studio Parallel
            </UiAttractor>
          </NuxtLink>

          <span>/</span>

          <NuxtLink
            class="core-footer__link core-footer__link--credit"
            to="https://ditta.studio"
            target="_blank"
            rel="noopener"
          >
            <UiAttractor>
              Made by ditta
            </UiAttractor>
          </NuxtLink>
        </div>

        <div class="pointer-events-none">
          ©2024 All rights reserved
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.core-footer {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--app-inner-gutter);

  @screen xs {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @screen md {
    grid-template-columns: var(--app-grid);
  }
}

.core-footer__link {
  display: block;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .core-footer__social-list:hover &:not(:hover),
  .core-footer__credit-list:hover &:not(:hover) {
    opacity: 0.4;
  }
}

.core-footer__credit {
  pointer-events: none;
  display: inline-block;
  animation: exit theme('transitionDuration.300') theme('transitionTimingFunction.outBack') forwards;

  .core-footer__link--credit:hover & {
    animation: enter theme('transitionDuration.300') theme('transitionTimingFunction.outBack') forwards;
  }
}
</style>
