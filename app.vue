<script setup lang="ts">
import { storyblokEditor } from '@/utilities/storyblok'
import Lenis from 'lenis'

const route = useRoute()
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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
