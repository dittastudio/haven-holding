<script setup lang="ts">
import type { Settings } from '@@/.storyblok/types/303510/storyblok-components'
import Lenis from 'lenis'

const route = useRoute()
const url = useRequestURL()
const isDev = import.meta.dev
const settings = await useStory<Settings>('/settings')

const splashSeen = useState('splashSeen', () => false)
useState('isCoverFinished', () => false)

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

const { isWindows } = useDevice()

onMounted(() => {
  if (isWindows) {
    const lenis = new Lenis({
      lerp: 0.1,
      touchMultiplier: 0, // disables for touch devices
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }
})
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter
          v-if="settings"
          :address="settings.content.address"
          :address-link="settings.content.address_link"
          :socials="settings.content.socials"
          :link-items="settings.content.footer_links"
        />
      </template>

      <template #dev>
        <!-- <ToolGrid v-if="isDev || storyblokEditor(route.query)" /> -->
      </template>
    </AppLayout>

    <AppCover v-if="!splashSeen && !isDev && !storyblokEditor(route.query)" />
    <!-- <AppCover /> -->
  </div>
</template>
