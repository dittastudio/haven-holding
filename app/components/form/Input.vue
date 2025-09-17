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

const props = withDefaults(defineProps<Props>(), {
  field: 'text',
})

const modelValue = defineModel<string>()

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <template v-if="props.field === 'textarea'">
    <textarea
      :id="props.id"
      class="min-h-[110px]"
      :value="modelValue"
      autocomplete="off"
      spellcheck="true"
      @input="onInput"
    />
  </template>

  <template v-else>
    <input
      :id="props.id"
      :type="props.field"
      :value="modelValue"
      spellcheck="false"
      @input="onInput"
    >
  </template>
</template>
