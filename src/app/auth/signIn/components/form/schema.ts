import { z } from "zod";

export const signInSchema = z
  .object({
    name: z
      .string()
      .nonempty()
      .min(5, { message: "Nome deve conter 5 caracteres" }),
    username: z
      .string()
      .nonempty()
      .regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().email({ message: "Campo deve ser do tipo e-mail" }),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/),
    confirmPassword: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/),
    role: z.enum(["SELLER", "CUSTOMER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword", "password"],
  });

export type SignInSchemaProps = z.infer<typeof signInSchema>;
