import { storyblokSlug } from '@/utilities/storyblok'
import type { ISbStoriesParams, ISbStoryData } from 'storyblok-js-client'
import type { Ref } from 'vue'

export const useStoryblokStory = async <T>(
  slug: string = '',
  options: ISbStoriesParams = {},
): Promise<Ref<ISbStoryData<T> | null>> => {
  if (!slug?.length) {
    return ref(null)
  }

  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()

  const release = String(route.query?._storyblok_release) || undefined
  const storyBlokSlug = storyblokSlug(slug)

  const defaultOptions: ISbStoriesParams = {
    version: runtimeConfig.public.STORYBLOK_VERSION === 'published' ? 'published' : 'draft',
    from_release: release,
    resolve_relations: [],
  }

  const config = { ...defaultOptions, ...options }

  const story = await useAsyncStoryblok(
    storyBlokSlug,
    config, // API Options
    { resolveLinks: 'url' },
  )

  if (!story.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page not found`,
      fatal: true,
    })
  }

  return story
}
