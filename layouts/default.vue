<script setup lang="ts">
import type { SettingsStoryblok } from '@/types/storyblok'
import { storyblokEditor } from '@/utilities/storyblok'

const route = useRoute()
const isDev = import.meta.dev
const settings = await useStoryblokStory<SettingsStoryblok>('/settings')

const splashSeen = useState('splashSeen', () => false)
useState('isCoverFinished', () => false)
</script>

<template>
  <div>
    <CoreLayout>
      <template #header>
        <CoreHeader />
      </template>

      <template #main>
        <div>
          <slot />
        </div>
      </template>

      <template #footer>
        <CoreFooter
          v-if="settings"
          :address="settings.content.address"
          :address-link="settings.content.address_link"
          :socials="settings.content.socials"
        />
      </template>

      <template #dev>
        <ToolGrid v-if="isDev || storyblokEditor(route.query)" />
      </template>
    </CoreLayout>

    <CoreCover v-if="!splashSeen && !isDev && !storyblokEditor(route.query)" />
  </div>
</template>
