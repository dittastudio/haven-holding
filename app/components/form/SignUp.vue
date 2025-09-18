<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm, useValidateForm } from 'vee-validate'
import { z } from 'zod'

const loading = ref(false)
const message = ref('')

const validationSchema = toTypedSchema(
  z.object({
    fname: z
      .string()
      .trim()
      .min(1, 'Please provide your first name')
      .default(''),
    lname: z
      .string()
      .trim()
      .min(1, 'Please provide your last name')
      .default(''),
    email: z
      .string()
      .trim()
      .min(1, 'Please provide your email')
      .email({ message: 'Email address must be valid' })
      .default(''),
  }),
)

const { errors, resetForm } = useForm({
  initialValues: {
    fname: '',
    lname: '',
    email: '',
  },
  validationSchema,
})

const validate = useValidateForm()
const { value: fname } = useField<string>('fname')
const { value: lname } = useField<string>('lname')
const { value: email } = useField<string>('email')

const onSubmit = async () => {
  try {
    message.value = ''

    const { valid } = await validate()

    if (!valid) {
      return
    }

    const send = async () => await $fetch('/api/mailchimp', {
      method: 'post',
      body: {
        fname: fname.value.trim(),
        lname: lname.value.trim(),
        email: email.value.trim(),
      },
    })

    loading.value = true

    const response = (await requestDelay(send()))

    message.value = response.statusMessage

    if (response?.statusCode === 200) {
      resetForm()
    }
  }
  catch (error: any) {
    message.value = error.statusMessage
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <FormBase
    :loading="loading"
    method="post"
    data-component="form-signup"
    class="relative"
    @submit.prevent="onSubmit"
  >
    <FormFieldset
      legend="Newsletter"
      class="flex flex-col gap-1 items-start"
    >
      <FormField
        id="fname"
        label="First name"
        a11y
        class="w-full"
      >
        <FormInput
          id="fname"
          v-model="fname"
          placeholder="First name"
          class="
            form-signup__input
            type-sans-16
            grow
            w-full
            px-2
            py-3
            border-b
            border-current/30
            focus:border-current/100
            transition-all
            duration-200
            ease-smooth
            placeholder:text-current
            placeholder:opacity-100
            placeholder:transition-opacity
            placeholder:duration-200
            placeholder:ease-smooth
            hover:placeholder:opacity-50
            focus:placeholder:opacity-0
          "
          autocomplete="given-name"
        />

        <FormError
          v-if="errors.fname"
          :message="errors.fname"
          class="type-mono-12 mt-2 my-2 text-left opacity-75"
        />
      </FormField>

      <FormField
        id="lname"
        label="Last name"
        a11y
        class="w-full"
      >
        <FormInput
          id="lname"
          v-model="lname"
          placeholder="Last name"
          class="
            form-signup__input
            type-sans-16
            grow
            w-full
            px-2
            py-3
            border-b
            border-current/30
            focus:border-current/100
            transition-all
            duration-200
            ease-smooth
            placeholder:text-current
            placeholder:opacity-100
            placeholder:transition-opacity
            placeholder:duration-200
            placeholder:ease-smooth
            hover:placeholder:opacity-50
            focus:placeholder:opacity-0
          "
          autocomplete="family-name"
        />

        <FormError
          v-if="errors.lname"
          :message="errors.lname"
          class="type-mono-12 mt-2 my-2 text-left opacity-75"
        />
      </FormField>

      <FormField
        id="email"
        label="Email"
        a11y
        class="w-full"
      >
        <FormInput
          id="email"
          v-model="email"
          field="email"
          placeholder="Email"
          class="
            form-signup__input
            type-sans-16
            grow
            w-full
            px-2
            py-3
            border-b
            border-current/30
            focus:border-current/100
            transition-all
            duration-200
            ease-smooth
            placeholder:text-current
            placeholder:opacity-100
            placeholder:transition-opacity
            placeholder:duration-200
            placeholder:ease-smooth
            hover:placeholder:opacity-50
            focus:placeholder:opacity-0
            autofill:text-current
          "
          autocomplete="on"
        />

        <FormError
          v-if="errors.email"
          :message="errors.email"
          class="type-mono-12 mt-2 my-2 text-left opacity-75"
        />
      </FormField>

      <p
        v-if="message"
        class="flex flex-col gap-y-1 items-start__message type-sans-16 [&_a]:underline [&_a]:transition-opacity [&_a]:duration-200 [&_a]:ease-smooth [&_a]:hover:opacity-40"
        v-html="message"
      />

      <button
        class="mt-[calc(var(--app-vertical-rhythm)_/_2)]"
        type="submit"
      >
        <UiButton theme="black">
          <template v-if="loading">
            Please wait&hellip;
          </template>

          <template v-else>
            Submit
          </template>
        </UiButton>
      </button>

      <p class="type-sans-12 opacity-80 mt-4 text-pretty">
        By submitting, you agree to receive news regarding Haven and accept our

        <NuxtLink
          to="/privacy-policy"
          class="inline-block underline hover:opacity-40 transition-opacity duration-200 ease-smooth"
        >
          privacy policy
        </NuxtLink>.
      </p>
    </FormFieldset>
  </FormBase>
</template>

<style>
@reference "@/assets/css/main.css";

.form-signup__input {
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    font: inherit;

    box-shadow: none;
    caret-color: var(--color-offblack);

    transition: background-color 5000s ease-in-out 0s;

    -webkit-text-fill-color: var(--color-offblack);
  }
}
</style>
