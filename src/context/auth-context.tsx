'use client';

import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

type UserType = {
    userId: number;
    email: string;
    name: string;
};

type AuthContextType = {
    user: UserType | null;
    signIn: (token: string) => Promise<void>;
    signOut: () => void;
    recoveryToken: () => string | undefined;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    const signOut = useCallback(() => {
        deleteCookie("auth-token");
        setUser(null);
        router.push("/");
    }, [router]); // router deve estar como dependência

    useEffect(() => {
        const token = recoveryToken();
        if (token) {
            fetchUser(token).then((userInfo) => {
                if (userInfo) {
                    setUser(userInfo);
                } else {
                    signOut();
                }
            });
        }
    }, [signOut]);

    async function signIn(token: string): Promise<void> {
        try {
            setCookie("auth-token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600,
                path: "/",
            });

            const userInfo = await fetchUser(token);
            if (userInfo) {
                setUser(userInfo);
                router.push("/teste");
            } else {
                throw new Error("Não foi possível buscar os dados do usuário.");
            }
        } catch (error) {
            toast({
                title: "Erro ao fazer login.",
                description: `${error} || Tente novamente mais tarde.`,
                variant: "destructive",
                className: "dark:text-black",
            });
        }
    }


    function recoveryToken() {
        const cookie = getCookie("auth-token");
        return cookie?.toString();
    }

    async function fetchUser(token: string): Promise<UserType | null> {
        try {
            const response = await axios.get("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.user as UserType;
        } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
            toast({
                title: "Erro ao buscar usuário.",
                description: "Sua sessão pode ter expirado.",
                variant: "destructive",
                className: "dark:text-black",
            });
            return null;
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, recoveryToken }}>
            {children}
        </AuthContext.Provider>
    );
}