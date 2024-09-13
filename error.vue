<script lang="ts" setup>
import IconLogoSymbol from '@/assets/icons/logo-symbol.svg'

definePageMeta({
  layout: false,
})

interface Props {
  error: {
    statusCode: number
    statusMessage: string
  }
}

const { error } = defineProps<Props>()

useHead({
  title:
    error?.statusCode && error?.statusMessage
      ? `${error?.statusCode} ${error?.statusMessage}`
      : 'An unexpected error occurred',
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center justify-center w-full max-w-md gap-40 text-center">
      <h1>
        <a
          href="/"
          class="block"
        >
          <IconLogoSymbol class="block w-full max-w-[100px] h-auto" />
        </a>
      </h1>

      <p class="text-24 text-balance">
        Uh oh, there was a problem loading up this page.
      </p>

      <p>
        <a
          href="/"
          class="block"
        >
          Back to home 🤪
        </a>
      </p>
    </div>
  </div>
</template>
