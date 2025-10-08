<script lang="ts" setup>
import type { Link, SocialItem } from '@@/.storyblok/types/303510/storyblok-components'
import type { StoryblokMultilink, StoryblokRichtext } from '@@/.storyblok/types/storyblok'
import IconLogoSymbol from '@/assets/icons/haven-logo-symbol-final.svg'

interface Props {
  address?: StoryblokRichtext
  addressLink?: StoryblokMultilink
  socials?: SocialItem[]
  linkItems?: Link[]
}

const { address, addressLink, socials, linkItems } = defineProps<Props>()
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
        grid-cols-3
        md:grid-cols-(--app-grid)
        gap-x-(--app-inner-gutter)
        gap-y-12
        md:gap-y-22
        py-12
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

      <div class="@container/footer col-span-full col-start-2 md:col-start-3">
        <div
          class="
            flex
            flex-col
            @2xl/footer:flex-row
            gap-y-38
            @2xl/footer:gap-y-14
            items-start
            justify-between
          "
        >
          <div class="w-full @2xl/footer:w-auto grid grid-cols-1 @xs/footer:grid-cols-2 @2xl/footer:flex gap-8 @3xl/footer:gap-14">
            <div class="flex flex-col gap-2">
              <h4>
                Contact
              </h4>

              <StoryblokLink
                v-if="addressLink && storyblokRichTextContent(address)"
                class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
                :item="addressLink"
              >
                <address class="not-italic font-sans text-13">
                  <StoryblokText :content="address" />
                </address>
              </StoryblokLink>
            </div>

            <div class="flex flex-col gap-2">
              <h4>
                Social
              </h4>

              <ul class="inline-block font-sans text-13">
                <template
                  v-for="social in socials"
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
          </div>

          <div class="w-full @2xl/footer:w-auto grid grid-cols-1 @xs/footer:grid-cols-2 @2xl/footer:flex gap-8 @3xl/footer:gap-14">
            <div class="flex flex-col gap-2">
              <h4>
                Design
              </h4>

              <p class="font-sans text-13">
                <NuxtLink
                  class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
                  to="https://studioparallel.co.uk"
                  target="_blank"
                >
                  Studio Parallel
                </NuxtLink>
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <h4>
                Build
              </h4>

              <p class="font-sans text-13">
                <NuxtLink
                  class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
                  to="https://ditta.studio"
                  target="_blank"
                >
                  ditta
                </NuxtLink>
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <h4>
                Interiors
              </h4>

              <p class="font-sans text-13">
                <NuxtLink
                  class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
                  to="https://studiolineatur.com"
                  target="_blank"
                >
                  Lineatur
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-full sm:col-start-2 md:col-start-3">
        <div class="overflow-hidden">
          <ul class="flex -mx-3 text-12">
            <li class="flex before:content-['/'] before:inline-block before:-mx-[0.5ch]">
              <span class="inline-block px-3">
                ©2024 All rights reserved
              </span>
            </li>

            <li
              v-for="item in linkItems"
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
