import mailchimp from '@mailchimp/mailchimp_marketing'
import { z } from 'zod'

interface Fields {
  fname: string
  lname: string
  email: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER } = config

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER) {
    throw createError({
      statusCode: 500,
      statusMessage: '.env vars are not defined',
    })
  }

  const body = await readBody(event) as Fields | undefined

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No payload data found',
    })
  }

  const validationSchema = z.object({
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
  })

  const validation = validationSchema.safeParse(body)

  if (!validation.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Please check the form and try again.',
    })
  }

  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER,
  })

  const listId = MAILCHIMP_LIST_ID
  const { fname, lname, email } = body

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'pending',
      merge_fields: {
        FNAME: fname,
        LNAME: lname,
      },
    })

    if (response?.status === 'pending') {
      return {
        statusCode: 200,
        statusMessage: 'Thank you! Please check your email to confirm your subscription (and don’t forget to check your updates and spam folder too!)',
      }
    }
    else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Oops! Something went wrong. Please try again.',
      })
    }
  }
  catch (error: any) {
    interface ErrorInfo {
      status: number
      title: string
      detail: string
      instance: string
    }

    const errorInfo = error?.response?.text ? JSON.parse(error.response.text) as ErrorInfo : null

    if (errorInfo?.title === 'Member Exists') { // Hack but it works
      return {
        statusCode: error.response.status,
        statusMessage: 'You’re already subscribed! If you didn’t get a confirmation email, check your inbox or reach out to us at <a href="mailto:info@havenhavelland.com">info@havenhavelland.com</a>.',
      }
    }

    return {
      statusCode: error.response.status,
      statusMessage: 'Oops! We couldn’t subscribe you to our newsletter. Please give it another try!',
    }
  }
})
