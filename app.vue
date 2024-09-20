<script setup lang="ts">
import { storyblokEditor } from '@/utilities/storyblok'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import type { SettingsStoryblok } from '@/types/storyblok'

gsap.registerPlugin(ScrollTrigger)

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

onMounted(() => {
  const userAgent = window.navigator.userAgent.toLowerCase()

  if (userAgent.includes('win')) {
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
    <CoreLayout>
      <template #hero>
        <CoreHero
          :media-desktop="settings?.content.hero_media_desktop"
          :media-mobile="settings?.content.hero_media_mobile"
          :poster="settings?.content.hero_poster_image"
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

    <CoreCover v-if="!splashSeen && !isDev && !storyblokEditor(route.query)" />
  </div>
</template>
