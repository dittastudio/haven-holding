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
  <div class="core-footer bg-white">
    <div class="core-footer__grid wrapper text-14 font-mono">
      <div class="core-footer__item core-footer__item--logo">
        <NuxtLink
          to="/"
          class="core-footer__logo"
        >
          <IconLogoSymbol class="core-footer__symbol" />
        </NuxtLink>
      </div>

      <div class="core-footer__item core-footer__item--contact">
        <h4 class="core-footer__title">
          Contact
        </h4>

        <StoryblokRichText
          v-if="storyblokRichTextContent(props.address)"
          :content="props.address"
          class="prose-p:text-14"
        />
      </div>

      <div class="core-footer__item core-footer__item--social">
        <h4 class="core-footer__title">
          Social
        </h4>

        <ul class="core-footer__social-list">
          <li
            v-for="social in props.socials"
            :key="social._uid"
            class="core-footer__social-item"
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

      <div class="core-footer__item core-footer__item--credit">
        <div class="core-footer__credits">
          <ul class="core-footer__credit-list">
            <li class="core-footer__credit-item">
              <NuxtLink
                class="core-footer__link core-footer__link--credit"
                to="https://studioparallel.co.uk/"
                target="_blank"
                rel="noopener"
              >
                Design by Studio Parallel
              </NuxtLink>
            </li>

            <li class="core-footer__credit-item">
              <NuxtLink
                class="core-footer__link core-footer__link--credit"
                to="https://ditta.studio"
                target="_blank"
                rel="noopener"
              >
                Made by ditta
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          ©2024 All rights reserved
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.core-footer__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: theme('spacing.48') var(--app-inner-gutter);
  padding-block: theme('spacing.32') theme('spacing.40');

  @screen xs {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

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
  grid-column: span 1;

  @screen xs {
    grid-column: span 2;
  }

  @screen md {
    grid-column: span 3;
  }

  @screen xl {
    grid-column: span 2;
  }
}

.core-footer__item--social {
  grid-column: 2 / span 1;

  @screen xs {
    grid-column: span 1;
  }

  @screen md {
    grid-column: span 2;
  }

  @screen xl {
    grid-column: span 2;
  }
}

.core-footer__item--credit {
  grid-column: span 2;

  @screen xs {
    grid-column: 2 / span 3;
  }

  @screen md {
    grid-column: span 5;
    text-align: right;
  }

  @screen xl {
    grid-column: span 6;
  }
}

.core-footer__logo {
  display: inline-block;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    opacity: 0.6;
  }
}

.core-footer__symbol {
  width: 48px;
  height: auto;

  @screen md {
    width: 37px;
  }
}

.core-footer__title {
  margin-block-end: theme('spacing.8');
}

.core-footer__social-list {
  display: inline-block;
}

.core-footer__social-item {
  display: block;
}

.core-footer__credits {
  --credit-padding: theme('spacing.12');

  overflow: hidden;
}

.core-footer__credit-list {
  display: flex;
  flex-flow: row wrap;
  margin-inline: calc(-1 * var(--credit-padding));

  @screen md {
    justify-content: flex-end;
  }
}

.core-footer__credit-item {
  display: flex;

  @screen mdMax {
    &:not(:first-child)::before {
      pointer-events: none;
      content: '/';

      display: inline-block;

      margin-inline: -0.5ch;

      opacity: 0.5;
    }
  }

  @screen md {
    &:not(:last-child)::after {
      pointer-events: none;
      content: '/';

      display: inline-block;

      margin-inline: -0.5ch;

      opacity: 0.5;
    }
  }
}

.core-footer__link {
  display: block;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .core-footer__social-list:hover &:not(:hover),
  .core-footer__credit-list:hover &:not(:hover) {
    opacity: 0.4;
  }

  .core-footer__credit-item & {
    /* margin-block: calc(-1 * var(--credit-padding)); */
    padding-inline: var(--credit-padding);
  }
}
</style>
