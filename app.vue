<script setup lang="ts">
import { storyblokEditor } from '@/utilities/storyblok'
import type { SettingsStoryblok } from '@/types/storyblok'

const route = useRoute()
const isDev = import.meta.dev
const settings = await useStoryblokStory<SettingsStoryblok>('/settings')
const url = useRequestURL()

const globalClasses = computed(() => ({
  'is-storyblok-editor': storyblokEditor(route.query),
}))

useHead({
  htmlAttrs: {
    class: globalClasses,
  },
})

useSeoMeta({
  titleTemplate: title => (title ? `${title} - Haven Havelland` : 'Haven Havelland'),
  robots: url.host === 'havenhavelland.com' ? 'index, follow' : 'noindex, nofollow',
})

const splashSeen = useState('splashSeen', () => false)
useState('isCoverFinished', () => false)
</script>

<template>
  <div>
    <CoreLayout>
      <template #hero>
        <CoreHero
          :media-desktop="settings?.content.hero_media_desktop"
          :media-mobile="settings?.content.hero_media_mobile"
        />
      </template>

      <template #header>
        <CoreHeader />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <CoreFooter
          v-if="settings"
          :address="settings.content.address"
          :socials="settings.content.socials"
        />
      </template>

      <template #dev>
        <ToolGrid v-if="isDev || storyblokEditor(route.query)" />
      </template>
    </CoreLayout>

    <!-- <CoreCover v-if="!splashSeen && !isDev" /> -->
    <CoreCover v-if="!splashSeen && !isDev && !storyblokEditor(route.query)" />
  </div>
</template>
