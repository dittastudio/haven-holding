<script lang="ts" setup>
import IconLogoSymbol from '@/assets/icons/logo-symbol.svg'
import { storyblokRichTextContent } from '@/utilities/storyblok'
import type { RichtextStoryblok, SocialItemStoryblok } from '@/types/storyblok'

interface Props {
  address: RichtextStoryblok
  socials: SocialItemStoryblok[]
}

const props = defineProps<Props>()
</script>

<template>
  <CoreGrid class="core-footer wrapper font-mono pt-32 pb-40 md:pb-80 text-14">
    <div class="col-span-2 sm:col-span-2 md:col-span-2">
      <NuxtLink
        to="/"
        class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-60"
      >
        <IconLogoSymbol
          width="35"
          height="61"
        />
      </NuxtLink>
    </div>

    <div class="col-span-1 md:col-span-2">
      <h4 class="mb-8">
        Contact
      </h4>

      <StoryblokRichText
        v-if="storyblokRichTextContent(props.address)"
        :content="props.address"
        class="prose-p:text-14"
      />
    </div>

    <div class="col-span-1 md:col-span-2">
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

    <div class="col-span-full md:col-span-6 flex flex-col items-end justify-start text-right">
      <div class="core-footer__credit-list flex flex-wrap justify-end items-baseline gap-x-8">
        <NuxtLink
          class="core-footer__link core-footer__link--credit"
          to="https://studioparallel.co.uk/"
          target="_blank"
          rel="noopener"
        >
          <CoreFooterCredit>
            Design by Studio Parallel
          </CoreFooterCredit>
        </NuxtLink>

        <span>/</span>

        <NuxtLink
          class="core-footer__link core-footer__link--credit"
          to="https://ditta.studio"
          target="_blank"
          rel="noopener"
        >
          <CoreFooterCredit>
            Made by ditta
          </CoreFooterCredit>
        </NuxtLink>
      </div>

      <div class="pointer-events-none">
        ©2024 All rights reserved
      </div>
    </div>
  </CoreGrid>
</template>

<style lang="postcss">
@keyframes enter {
  from {
    translate: 0 0 0;
  }

  to {
    translate: var(--x) var(--y) 0;
  }
}

@keyframes exit {
  from {
    translate: var(--x) var(--y) 0;
  }

  to {
    translate: 0 0 0;
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
  will-change: translate;
  display: inline-block;
  animation: exit theme('transitionDuration.300') theme('transitionTimingFunction.outBack') forwards;

  .core-footer__link--credit:hover & {
    animation: enter theme('transitionDuration.300') theme('transitionTimingFunction.outBack') forwards;
  }
}
</style>
