

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import logo from "../../../public/logoAzul.png"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { LogOut, Menu } from "lucide-react";

export function DashboardNavBar() {


    const navItems = [
        { name: "MINHAS LISTAS", href: "#", active: true },
        { name: "COMPARTILHADAS", href: "#", active: false },
        { name: "ARQUIVADAS", href: "#", active: false },
      ]

    return (
        <>
    <nav className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-8">
          <Image src={logo} alt="TudoNaMala" width={150} height={40} />
          {/* Desktop Navigation */}
        </div>
        <div className="hidden gap-6 text-sm font-medium text-gray-500 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-1 py-1 ${
                  item.active ? "border-b-2 border-[#02bcfe] text-zinc-500 font-bold" : "text-zinc-400 hover:text-zinc-600 font-bold"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-2 py-2 text-sm font-medium ${
                      item.active ? "rounded-md bg-[#02bcfe]/10 text-[#026df0]" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
                👤
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
        </>
    );
}