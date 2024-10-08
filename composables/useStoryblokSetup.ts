import { storyblokImage } from '@/utilities/storyblok'
import type { SeoStoryblok } from '@/types/storyblok'
import type { ISbStoryData } from 'storyblok-js-client'
import type { Ref } from 'vue'

interface Seo {
  seo: SeoStoryblok[]
}

export const useStoryblokSetup = async <T extends Seo>(story: Ref<ISbStoryData<T> | null>) => {
  if (!story.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page not found`,
      fatal: true,
    })
  }

  const seo = story.value.content?.seo?.[0]
  const { seo_title: title, seo_description: description, seo_image: image } = seo || {}

  useSeoMeta({
    title: title ?? story.value.name,
    description,
    ogTitle: title ?? story.value.name,
    ogDescription: description,
    ogImage: storyblokImage(image?.filename, { width: 1200, height: 630, smart: true }) || null,
    ogType: 'website',
    twitterTitle: title ?? story.value.name,
    twitterCard: 'summary_large_image',
    twitterImage: storyblokImage(image?.filename, { width: 1200, height: 630, smart: true }) || null,
  })

  onMounted(() => {
    if (story.value) {
      useStoryblokBridge(story.value.id, (evStory: any) => (story.value = evStory), {
        preventClicks: true,
      })
    }
  })
}
