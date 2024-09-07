<script lang="ts" setup>
import IconLogoSymbol from '@/assets/icons/logo-symbol.svg'
import { storyblokRichTextContent } from '@/utilities/storyblok'

interface Props {
  address: any
  socials: any
}

const { address, socials } = defineProps<Props>()
</script>

<template>
  <div class="core-footer wrapper font-mono pt-32 pb-80 grid gap-32 md:grid-cols-12 text-14">
    <div class="col-span-2">
      <NuxtLink
        to="/"
        class="block"
      >
        <IconLogoSymbol
          width="35"
          height="61"
        />
      </NuxtLink>
    </div>

    <div class="col-span-2">
      <h4 class="mb-8">
        Contact
      </h4>

      <StoryblokRichText
        v-if="storyblokRichTextContent(address)"
        :content="address"
        class="prose-p:text-14"
      />
    </div>

    <div class="col-span-2">
      <h4 class="mb-8">
        Social
      </h4>

      <ul class="core-footer__social-list flex flex-col">
        <li
          v-for="social in socials"
          :key="social._uid"
        >
          <StoryblokLink
            v-if="social.link"
            class="core-footer__social"
            :item="social.link"
            :title="social.title"
          >
            {{ social.title }}
          </StoryblokLink>
        </li>
      </ul>
    </div>

    <div class="col-span-6 flex justify-end text-right">
      Design by Studio Parallel / Built by Ditta
      <br>
      ©2024 All rights reserved
    </div>
  </div>
</template>

<style lang="postcss">
.core-footer__social {
  display: block;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .core-footer__social-list:hover &:not(:hover) {
    opacity: 0.4;
  }
}
</style>
