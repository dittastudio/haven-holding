<script lang="ts" setup>
import { requestDelay } from '@/utilities/helpers'
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
    class="form-signup"
    @submit.prevent="onSubmit"
  >
    <FormFieldset
      legend="Newsletter"
      class="form-signup__fieldset"
    >
      <FormField
        id="fname"
        label="First name"
        a11y
        class="form-signup__field"
      >
        <div class="form-signup__box">
          <FormInput
            id="fname"
            v-model="fname"
            placeholder="First name"
            class="form-signup__input text-16"
          />
        </div>

        <FormError
          v-if="errors.fname"
          :message="errors.fname"
          class="form-signup__error type-12 font-mono"
        />
      </FormField>

      <FormField
        id="lname"
        label="Last name"
        a11y
        class="form-signup__field"
      >
        <div class="form-signup__box">
          <FormInput
            id="lname"
            v-model="lname"
            placeholder="Last name"
            class="form-signup__input text-16"
          />
        </div>

        <FormError
          v-if="errors.lname"
          :message="errors.lname"
          class="form-signup__error type-12 font-mono"
        />
      </FormField>

      <FormField
        id="email"
        label="Email"
        a11y
        class="form-signup__field"
      >
        <div class="form-signup__box">
          <FormInput
            id="email"
            v-model="email"
            field="email"
            placeholder="Email"
            class="form-signup__input text-16"
          />
        </div>

        <FormError
          v-if="errors.email"
          :message="errors.email"
          class="form-signup__error text-12 font-mono"
        />
      </FormField>

      <button
        class="form-signup__submit"
        type="submit"
      >
        <UiButton
          theme="black"
          type="rounded"
        >
          <template v-if="loading">
            Please wait&hellip;
          </template>

          <template v-else>
            Submit
          </template>
        </UiButton>
      </button>

      <p
        v-if="message"
        class="form-signup__fieldset__message"
      >
        {{ message }}
      </p>
    </FormFieldset>
  </FormBase>
</template>

<style lang="postcss" scoped>
.form-signup {
  position: relative;
}

.form-signup__fieldset {
  display: flex;
  flex-direction: column;
  row-gap: theme('spacing.4');
  align-items: flex-start;
}

.form-signup__field {
  width: 100%;
}

.form-signup__box {
  position: relative;
  width: 100%;

  &::after {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1px;

    opacity: 0.3;
    background-color: currentcolor;

    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  &:has(input:focus-within) {
    &::after {
      opacity: 1;
    }
  }
}

.form-signup__input {
  --input-padding-x: 8px;
  --input-padding-y: 12px;

  flex-grow: 1;
  width: 100%;
  padding: var(--input-padding-y) var(--input-padding-x);
  outline: none;

  &::placeholder {
    color: currentcolor;
    opacity: 1;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  &:hover::placeholder {
    opacity: 0.5;
  }

  &:focus::placeholder {
    opacity: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
      font: inherit;

      box-shadow: none;
      caret-color: theme('colors.white');

      transition: background-color 5000s ease-in-out 0s;

      -webkit-text-fill-color: theme('colors.white');
  }
}

.form-signup__error {
  margin-block: theme('spacing.4') theme('spacing.8');
  margin-inline-start: theme('spacing.8');

  font-size: theme('fontSize.12');
  text-align: left;

  opacity: 0.75;
}

.form-signup__submit {
  margin-top: calc(var(--app-vertical-rhythm) / 2);
}
</style>
