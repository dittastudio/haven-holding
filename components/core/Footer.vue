<script lang="ts" setup>
import type { LinkStoryblok, MultilinkStoryblok, RichtextStoryblok, SocialItemStoryblok } from '@/types/storyblok'
import IconLogoSymbol from '@/assets/icons/haven-logo-symbol-final.svg'
import { storyblokRichTextContent } from '@/utilities/storyblok'

interface Props {
  address: RichtextStoryblok | undefined
  addressLink: MultilinkStoryblok | string | undefined
  socials: SocialItemStoryblok[] | undefined
  linkItems: LinkStoryblok[] | undefined
}

const props = defineProps<Props>()
</script>

<template>
  <div class="core-footer bg-white">
    <div class="core-footer__grid wrapper text-14 font-mono">
      <div class="core-footer__item core-footer__item--logo">
        <NuxtLink
          to="/"
          class="core-footer__link core-footer__link--logo"
        >
          <IconLogoSymbol class="core-footer__symbol" />

          <span class="sr-only">Home</span>
        </NuxtLink>
      </div>

      <div class="core-footer__item core-footer__item--contact">
        <h4 class="core-footer__title">
          Contact
        </h4>

        <StoryblokLink
          v-if="storyblokRichTextContent(props.address)"
          class="core-footer__link"
          :item="props.addressLink"
        >
          <address class="not-italic">
            <StoryblokRichText
              :content="props.address"
              class="prose-p:text-14"
            />
          </address>
        </StoryblokLink>
      </div>

      <div class="core-footer__item core-footer__item--social">
        <h4 class="core-footer__title">
          Social
        </h4>

        <ul class="core-footer__list">
          <template
            v-for="social in props.socials"
            :key="social._uid"
          >
            <li
              v-if="social.title && social.link?.url"
              class="core-footer__list-item"
            >
              <StoryblokLink
                class="core-footer__link"
                :item="social.link"
                :title="social.title"
              >
                {{ social.title }}
              </StoryblokLink>
            </li>
          </template>
        </ul>
      </div>

      <div class="core-footer__item core-footer__item--info">
        <div class="core-footer__info-wrapper">
          <div class="core-footer__info">
            <ul class="core-footer__link-list">
              <li class="core-footer__link-list__item">
                <NuxtLink
                  class="core-footer__link core-footer__link--meta"
                  to="https://studioparallel.co.uk/"
                  target="_blank"
                  rel="noopener"
                >
                  Design by Studio Parallel
                </NuxtLink>
              </li>

              <li class="core-footer__link-list__item">
                <NuxtLink
                  class="core-footer__link core-footer__link--meta"
                  to="https://ditta.studio"
                  target="_blank"
                  rel="noopener"
                >
                  Made by ditta
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="core-footer__info">
            <ul class="core-footer__link-list">
              <li class="core-footer__link-list__item">
                <span class="core-footer__link core-footer__link--meta">
                  ©2024 All rights reserved
                </span>
              </li>

              <li
                v-for="item in props.linkItems"
                :key="item._uid"
                class="core-footer__link-list__item"
              >
                <StoryblokLink
                  :item="item.link"
                  :title="item.title"
                  class="core-footer__link core-footer__link--meta"
                >
                  {{ item.title }}
                </StoryblokLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.core-footer__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: theme('spacing.48') var(--app-inner-gutter);
  padding-block: theme('spacing.48') theme('spacing.40');

  @screen md {
    grid-template-columns: var(--app-grid);
    padding-block-end: theme('spacing.80');
  }
}

.core-footer__item--logo {
  grid-column: span 1;

  @screen md {
    grid-column: span 2;
  }

  @screen xl {
    grid-column: span 2;
  }
}

.core-footer__item--contact {
  grid-column: span 3;

  @screen md {
    grid-column: span 5;
  }

  @screen xl {
    grid-column: span 2;
  }
}

.core-footer__item--social {
  grid-column: 2 / span 3;

  @screen md {
    grid-column: span 4;
  }

  @screen xl {
    grid-column: span 2;
  }
}

.core-footer__item--info {
  grid-column: -1 / 1;

  @screen xs {
    grid-column: 2 / span 3;
  }

  @screen md {
    grid-column: 3 /span 9;
  }

  @screen xl {
    grid-column: span 6;
    text-align: right;
  }
}

.core-footer__symbol {
  position: relative;
  left: -1px;
  width: 48px;
  height: 82px;

  @screen md {
    width: 37px;
    height: 63px;
  }
}

.core-footer__title {
  margin-block-end: theme('spacing.8');
}

.core-footer__list {
  display: inline-block;
}

.core-footer__list-item {
  display: block;
}

.core-footer__info-wrapper {
  display: inline-block;
}

.core-footer__info {
  --credit-padding: theme('spacing.12');

  overflow: hidden;
}

.core-footer__link-list {
  display: flex;
  flex-wrap: wrap;
  margin-inline: calc(-1 * var(--credit-padding));
}

.core-footer__link-list__item {
  --_char-inset: -0.5ch;

  display: flex;

  &:not(:first-child)::before {
    content: '/';
    display: inline-block;
    margin-inline: var(--_char-inset);
  }
}

a.core-footer__link {
  display: inline-block;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    opacity: 0.4;
  }
}

.core-footer__link--meta {
  padding-inline: var(--credit-padding);
}
</style>
