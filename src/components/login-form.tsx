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
import logo from "../../public/logoAzul.png"
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { AuthContext } from "@/context/auth-context";
import Image from "next/image";

// Schema de validação com Zod
const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Insira um email válido." })
    .min(10, { message: "Insira um email com no mínimo 10 caracteres." }),
  password: z
    .string()
    .min(8, { message: "Insira uma senha com no mínimo 8 caracteres." }),
});

// Tipagem inferida pelo Zod
type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  // Configuração do formulário com react-hook-form e validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  // Função de envio do formulário
  const onSubmit = async (data: LoginFormType) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", data);

      // Se o backend salvar o token no cookie e retornar sucesso
      const { token, error } = response.data;

      if (token) {
        auth.signIn(token);
      } else {
        toast({
          title: "Erro ao logar-se!",
          description: `${error || 'Erro desconhecido.'} `,
          variant: "destructive",
          className: "dark:text-black"
        })
      }

      setLoading(false);
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Erro desconhecido. Tente novamente.";

      toast({
        title: "Erro ao logar-se!",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

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
            Insira seu email e senha abaixo para acessar sua conta.
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
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
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
              <Button type="submit" className="w-full bg-principal hover:bg-second" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{" "}
              <a href="/register" className="underline underline-offset-4">
                Cadastre-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
