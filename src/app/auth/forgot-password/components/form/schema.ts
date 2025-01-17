import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Campo deve ser do tipo e-mail' }),
})

export type ForgotPasswordSchemaProps = z.infer<typeof forgotPasswordSchema>
