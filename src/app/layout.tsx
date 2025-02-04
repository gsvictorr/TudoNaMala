import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { League_Spartan } from "next/font/google";

const league = League_Spartan({ weight: "variable", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TudoNaMala",
  description: "Organizando sua viagem perfeita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthContextProvider>
      <html lang="pt-BR">
        <body
          className={cn(league.className)}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </AuthContextProvider>
  );
}
