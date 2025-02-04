"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "@/context/auth-context";
import Image from "next/image";
import logo from "../../public/logoAzul.png"


// Schema de validação com Zod
const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Insira um email válido." })
    .min(1, { message: "Insira um email com no mínimo 1 caracter." }),
  password: z
    .string()
    .min(1, { message: "Insira uma senha com no mínimo 1 caracter." }),
  name: z
    .string()
    .min(1, { message: "Insira uma senha com no mínimo 1 caracter." }),
  secondPassword: z
    .string()
    .min(1, { message: "Insira uma senha com no mínimo 1 caracter." }),
});

// Tipagem inferida pelo Zod
type RegisterFormType = z.infer<typeof loginFormSchema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()
  const auth = useContext(AuthContext);
  // Configuração do formulário com react-hook-form e validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  // Função de envio do formulário
  const onSubmit = async (data: RegisterFormType) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register", data);

      // Se o backend salvar o token no cookie e retornar sucesso
      const { message } = response.data;

      toast({
        title: "Cadastro realizado com sucesso!",
        description: message,
      });

      const login = await axios.post("/api/auth/login", {email: data.email, password: data.password});

      const { token } = login.data;

      auth.signIn(token);

    } catch (error: unknown) {
      // Validação do tipo de `error` antes de acessar suas propriedades
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Erro desconhecido. Tente novamente.";
          
      toast({
        title: "Erro ao cadastrar-se!",
        description: errorMessage,
        variant: "destructive",
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex items-center">
        <CardTitle className="text-2xl">
          <Image
                width={200}
                height={50}
                src={logo}
                alt="logo"
                className="h-12 w-auto"
            />
            
            </CardTitle>
          <CardDescription>
            Crie sua conta gratuitamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Nome</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Seu nome"
                  {...register("name")}
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="secondPassword">Repita a senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="secondPassword"
                  type="password"
                  placeholder="********"
                  {...register("secondPassword")}
                  disabled={loading}
                />
                {errors.secondPassword && (
                  <p className="text-sm text-red-500">
                    {errors.secondPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full bg-principal hover:bg-second" disabled={loading}>
                {loading ? "Enviando..." : "Cadastrar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
