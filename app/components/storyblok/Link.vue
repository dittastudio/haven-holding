<script lang="ts" setup>
import type { MultilinkStoryblok } from '@/types/storyblok'

interface Props {
  item: MultilinkStoryblok | string | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const href
  = props.item?.linktype === 'email'
    ? `mailto:${props.item?.email}`
    : props.item?.linktype === 'story'
      ? `/${props.item?.cached_url?.replace('home', '')}`
      : props.item?.cached_url

const customAttributes = {
  class: props.item?.class,
  title: props.item?.title,
  rel: props.item?.rel,
}

const attributes = {
  ...customAttributes,
  to: href?.trim().replace(/\/+$/, ''),
  target: props.item?.target ?? props.item?.linktype === 'asset' ? '_blank' : null,
}

const element = !props.item || props.disabled ? 'div' : resolveComponent('NuxtLink')
</script>

<template>
  <Component
    :is="element"
    v-bind="attributes"
    class="group/link"
  >
    <slot />
  </Component>
</template>
