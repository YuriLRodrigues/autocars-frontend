import { z } from 'zod'

export const newPasswordSchema = z
  .object({
    newPassword: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
    confirmPassword: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
  })
  .superRefine((val, ctx) => {
    if (val.confirmPassword !== val.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Senhas não se coincidem',
      })
    }
  })

export type NewPasswordSchemaProps = z.infer<typeof newPasswordSchema>
