'use client';
import Image from "next/image";
import logo from "../../../public/logoBranca.png"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

export function NavBar() {

    const { user } = useContext(AuthContext);


    return (
        <nav className="px-4 mx-auto py-6 flex items-center justify-between container mx-auto">

            <Image
                width={150}
                height={50}
                src={logo}
                alt="logo"
                className="h-8 w-auto"
            />

            <div className="flex items-center">
                <div className="md:flex items-center hidden gap-4">
                    <NavigationMenu >
                        <NavigationMenuList >
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref className="">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Página inicial
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Como funciona
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Sobre
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Contato
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {user ? <Link href="/teste">
                    <Button
                        className="text-white ml-3 bg-transparent border-none py-5 px-4 rounded-lg  transition-transform duration-200 hover:scale-105 
  hover:bg-gradient-to-r hover:from-principal hover:to-second focus:ring-2 hover:text-white focus:ring-offset-2 focus:ring-principal"
                        variant="ghost"

                    >
                        Minhas listas <LogInIcon />
                    </Button>
                </Link> : <Link href="/login">
                    <Button
                        className="text-white ml-3 bg-transparent border-none py-5 px-4 rounded-lg  transition-transform duration-200 hover:scale-105 
  hover:bg-gradient-to-r hover:from-principal hover:to-second focus:ring-2 hover:text-white focus:ring-offset-2 focus:ring-principal"
                        variant="ghost"

                    >
                        Login <LogInIcon />
                    </Button>
                </Link>}

                {user ? "" : <Link href="/login">
                    <Button
                        className="text-white ml-3 bg-white border-none text-principal py-5 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 
  hover:bg-gradient-to-r hover:from-principal hover:to-second focus:ring-2 hover:text-white focus:ring-offset-2 focus:ring-principal"
                        variant="outline"
                    >
                        Começar
                    </Button>
                </Link>}

            </div>
        </nav >

    );
}