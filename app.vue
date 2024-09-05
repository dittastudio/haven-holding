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
  titleTemplate: title => (title ? `${title} - Haven` : 'Haven'),
  robots: 'index, follow',
})
</script>

<template>
  <div>
    <div>
      <BlockHero />

      <div class="bg-offwhite">
        <CoreHeader />

        <main>
          <NuxtPage />
        </main>
      </div>
    </div>

    <CoreFooter
      v-if="settings"
      :address="settings.content.address"
      :socials="settings.content.socials"
    />

    <ToolGrid v-if="isDev" />
  </div>
</template>
