import { z } from 'zod'

export const signInSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório.' })
    .nonempty({ message: 'Nome não pode estar vazio.' })
    .min(5, { message: 'Nome deve conter 5 caracteres.' }),
  username: z
    .string({ required_error: 'Nome de usuário é obrigatório.' })
    .nonempty({ message: 'Nome de usuário não pode estar vazio.' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Nome de usuário inválido.' }),
  email: z.string().email({ message: 'Campo deve ser do tipo e-mail' }),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Senha inválida.' }),
  // confirmPassword: z
  //   .string()
  //   .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, { message: 'Confimação de senha inválida.' }),
  role: z.enum(['SELLER', 'CUSTOMER'], { required_error: 'Você deve selecionar um tipo de usuário.' }),
  step: z.enum(['SIGNUP', 'ADDRESS']).default('SIGNUP'),
  street: z.string({ required_error: 'Rua é obrigatório.' }),
  city: z.string({ required_error: 'Cidade é obrigatório.' }),
  state: z.string({ required_error: 'Estado é obrigatório.' }),
  neighborhood: z.string({ required_error: 'Bairro é obrigatório.' }),
  zipCode: z.string({ required_error: 'Código de endereçamento postal (CEP) é obrigatório.' }),
})

export type SignInSchemaProps = z.infer<typeof signInSchema>
