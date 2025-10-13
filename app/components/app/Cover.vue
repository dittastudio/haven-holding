<script lang="ts" setup>
const coverVisible = ref(true)
const logoVisible = ref(false)
const isCoverFinished = useState('isCoverFinished')
const backgroundIndex = useCookie<number>('backgroundIndex')
const backgroundClass = useCookie<string>('backgroundClass')
const backgroundClasses = ['bg-sky', 'bg-lavender', 'bg-river']
const currentIndex = backgroundIndex.value

if (import.meta.server) {
  backgroundIndex.value = currentIndex != null && currentIndex < 2 ? currentIndex + 1 : 0
  backgroundClass.value = backgroundClasses[currentIndex ?? 0]!
}

onMounted(async () => {
  await wait(1000)
  logoVisible.value = true
  await wait(2800)
  isCoverFinished.value = true
  coverVisible.value = false
})
</script>

<template>
  <div
    data-component="app-cover"
    class="fixed z-20 inset-0 h-full [html:has(&.is-active)]:overflow-hidden transition-opacity duration-1000 ease-smooth"
    :class="[
      { 'opacity-0 pointer-events-none': !coverVisible },
      { 'is-active opacity-100 pointer-events-auto': coverVisible },
      backgroundClass,
    ]"
  >
    <div class="wrapper flex items-center justify-center h-[inherit]">
      <div
        class="transition-opacity duration-500 ease-smooth"
        :class="{
          'opacity-0': !logoVisible,
          'opacity-100': logoVisible,
        }"
      >
        <AppCoverLogo />
      </div>
    </div>
  </div>
</template>
