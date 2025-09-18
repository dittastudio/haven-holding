<script lang="ts" setup>
interface Props {
  id: string
  field?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'time'
    | 'url'
    | 'week'
}

const { id, field = 'text' } = defineProps<Props>()

const modelValue = defineModel<string>()

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <template v-if="field === 'textarea'">
    <textarea
      :id="id"
      class="min-h-[110px]"
      :value="modelValue"
      autocomplete="off"
      spellcheck="true"
      @input="onInput"
    />
  </template>

  <template v-else>
    <input
      :id="id"
      :type="field"
      :value="modelValue"
      spellcheck="false"
      class="outline-none"
      @input="onInput"
    >
  </template>
</template>
