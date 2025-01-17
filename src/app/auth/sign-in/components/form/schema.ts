import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Campo deve ser do tipo e-mail' }),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
})

export type SignInSchemaProps = z.infer<typeof signInSchema>
