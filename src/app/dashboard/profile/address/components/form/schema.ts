import { z } from 'zod'

export const updateAddressSchema = z.object({
  street: z.string({ required_error: 'Rua é obrigatório.' }),
  city: z.string({ required_error: 'Cidade é obrigatório.' }),
  state: z.string({ required_error: 'Estado é obrigatório.' }),
  neighborhood: z.string({ required_error: 'Bairro é obrigatório.' }),
  zipCode: z.string({ required_error: 'Código de endereçamento postal (CEP) é obrigatório.' }),
})

export type UpdateAddressSchemaProps = z.infer<typeof updateAddressSchema>
