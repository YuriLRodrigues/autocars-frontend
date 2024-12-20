import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const useSignIn = () => {
  const form = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
    reValidateMode: "onChange",
    mode: "all",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: SignInSchemaProps) => {
    console.log(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    showPassword,
    togglePasswordVisibility,
  };
};
