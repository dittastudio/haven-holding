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

const credits = [
  {
    title: 'Build',
    name: 'ditta',
    url: 'https://ditta.studio',
  },
  {
    title: 'Design',
    name: 'Studio Parallel',
    url: 'https://studioparallel.co.uk',
  },
  {
    title: 'Interiors',
    name: 'Lineatur',
    url: 'https://studiolineatur.com',
  },
]
</script>

<template>
  <div
    data-component="app-footer"
    class="bg-white"
  >
    <div
      class="
        wrapper
        grid
        grid-cols-3
        md:grid-cols-(--app-grid)
        gap-x-(--app-inner-gutter)
        gap-y-6
        sm:gap-y-22
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

      <div
        class="
        @container/footer
        col-span-full
        col-start-2
        md:col-start-3
      "
      >
        <div
          class="
            flex
            flex-col
            @2xl/footer:flex-row
            gap-y-28
            @xs/footer:gap-y-14
            @2xl/footer:gap-y-14
            items-start
            justify-between
          "
        >
          <div class="w-full @2xl/footer:w-auto grid grid-cols-1 @xs/footer:grid-cols-2 @2xl/footer:flex gap-8 @3xl/footer:gap-14">
            <div class="flex flex-col gap-2">
              <h4 class="type-mono-14">
                Contact
              </h4>

              <StoryblokLink
                v-if="addressLink && storyblokRichTextContent(address)"
                class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
                :item="addressLink"
              >
                <address class="not-italic type-sans-14">
                  <StoryblokText :content="address" />
                </address>
              </StoryblokLink>
            </div>

            <div class="flex flex-col gap-2">
              <h4 class="type-mono-14">
                Social
              </h4>

              <ul class="inline-block type-sans-14">
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

          <div class="w-full @2xl/footer:w-auto grid grid-cols-1 @xs/footer:grid-cols-2 @2xl/footer:flex @xs/footer:gap-8 @3xl/footer:gap-14">
            <template
              v-for="credit in credits"
              :key="credit.name"
            >
              <div class="flex flex-wrap @xs/footer:flex-col @xs/footer:gap-2">
                <h4 class="type-mono-14">
                  {{ credit.title }} <span class="@xs/footer:hidden">by&nbsp;</span>
                </h4>

                <p class="type-mono-14 @xs/footer:type-sans-14">
                  <NuxtLink
                    class="inline-block transition-opacity duration-200 ease-smooth hover:opacity-40"
                    :to="credit.url"
                    target="_blank"
                  >
                    {{ credit.name }}
                  </NuxtLink>
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="col-span-full col-start-2 md:col-start-3 flex flex-wrap items-start justify-start gap-x-3">
        <p class="type-mono-14 sm:type-mono-12">
          ©{{ new Date().getFullYear() }} All rights reserved
        </p>

        <ul class="type-mono-14 sm:type-mono-12 flex flex-wrap items-start">
          <li
            v-for="item in linkItems"
            :key="item._uid"
            class="flex items-start before:content-['/'] before:inline-block before:-mx-[0.5ch]"
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
</template>
