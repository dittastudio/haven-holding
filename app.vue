<script setup lang="ts">
import { storyblokEditor } from '@/utilities/storyblok'
import type { SettingsStoryblok } from '@/types/storyblok'

const route = useRoute()
const isDev = import.meta.dev
const settings = await useStoryblokStory<SettingsStoryblok>('/settings')

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
  robots: 'index, follow',
})

const splashSeen = useState('splashSeen', () => false)
useState('isCoverFinished', () => false)
</script>

<template>
  <div>
    <CoreLayout>
      <template #hero>
        <CoreHero :media="settings?.content.hero_media" />
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

    <CoreCover v-if="!splashSeen" />
  </div>
</template>
