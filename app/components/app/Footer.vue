<script lang="ts" setup>
import type { Link, SocialItem } from '@@/.storyblok/types/303510/storyblok-components'
import type { StoryblokMultilink, StoryblokRichtext } from '@@/.storyblok/types/storyblok'
import IconLogoSymbol from '@/assets/icons/haven-logo-symbol-final.svg'

interface Props {
  address: StoryblokRichtext | undefined
  addressLink: StoryblokMultilink | string | undefined
  socials: SocialItem[] | undefined
  linkItems: Link[] | undefined
}

const props = defineProps<Props>()
</script>

<template>
  <div
    data-component="app-footer"
    class="bg-white"
  >
    <div
      class="
        wrapper
        type-mono-14
        grid
        grid-cols-4
        md:grid-cols-(--app-grid)
        gap-x-(--app-inner-gutter)
        gap-y-12
        pt-12
        pb-10
        md:pb-20
      "
    >
      <div class="col-span-1 md:col-span-2">
        <NuxtLink
          to="/"
          class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
        >
          <IconLogoSymbol class="relative -left-px w-[48px] h-[82px] md:w-[37px] md:h-[63px]" />

          <span class="sr-only">Home</span>
        </NuxtLink>
      </div>

      <div class="col-span-3 md:col-span-5 xl:col-span-2">
        <h4 class="mb-2">
          Contact
        </h4>

        <StoryblokLink
          v-if="storyblokRichTextContent(props.address)"
          class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
          :item="props.addressLink"
        >
          <address class="not-italic">
            <StoryblokText
              :content="props.address"
            />
          </address>
        </StoryblokLink>
      </div>

      <div class="col-start-2 col-span-3 md:col-span-4 xl:col-span-2">
        <h4 class="mb-2">
          Social
        </h4>

        <ul class="inline-block">
          <template
            v-for="social in props.socials"
            :key="social._uid"
          >
            <li
              v-if="social.title && social.link?.url"
              class="block"
            >
              <StoryblokLink
                class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
                :item="social.link"
                :title="social.title"
              >
                {{ social.title }}
              </StoryblokLink>
            </li>
          </template>
        </ul>
      </div>

      <div class="col-span-full xs:col-start-2 xs:col-span-3 md:col-start-3 md:col-span-9 xl:col-span-6 xl:ml-auto">
        <div class="overflow-hidden">
          <ul class="flex -mx-3">
            <li class="flex">
              <NuxtLink
                class="inline-block px-3 transition-opacity duration-200 ease-smooth hover:opacity-40"
                to="https://studioparallel.co.uk/"
                target="_blank"
                rel="noopener"
              >
                Design by Studio Parallel
              </NuxtLink>
            </li>

            <li class="flex before:content-['/'] before:inline-block before:-mx-[0.5ch]">
              <NuxtLink
                class="inline-block px-3 transition-opacity duration-200 ease-smooth hover:opacity-40"
                to="https://ditta.studio"
                target="_blank"
                rel="noopener"
              >
                Made by ditta
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="overflow-hidden">
          <ul class="flex -mx-3">
            <li class="flex before:content-['/'] before:inline-block before:-mx-[0.5ch]">
              <span class="inline-block px-3">
                ©2024 All rights reserved
              </span>
            </li>

            <li
              v-for="item in props.linkItems"
              :key="item._uid"
              class="flex before:content-['/'] before:inline-block before:-mx-[0.5ch]"
            >
              <StoryblokLink
                :item="item.link"
                :title="item.title"
                class="inline-block px-3 transition-opacity duration-200 ease-smooth hover:opacity-40"
              >
                {{ item.title }}
              </StoryblokLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
