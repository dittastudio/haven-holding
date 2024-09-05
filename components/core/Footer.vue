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
      <h4>Contact</h4>

      <StoryblokRichText
        v-if="storyblokRichTextContent(address)"
        :content="address"
        class="prose-p:text-14"
      />
    </div>

    <div class="col-span-2">
      <h4>Social</h4>

      <ul>
        <li
          v-for="social in socials"
          :key="social._uid"
        >
          <StoryblokLink
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
