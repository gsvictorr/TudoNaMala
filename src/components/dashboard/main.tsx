'use client';
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Share2, Trash2, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TravelList } from "@/app/api/travelList/route";
import { AuthContext } from "@/context/auth-context";
import axios from "axios";


interface UserLists {
    ownedLists: TravelList[];
    sharedLists: TravelList[];
}


export function DashboardMain() {
    const [searchTerm, setSearchTerm] = useState("")
    const [lists, setLists] = useState<UserLists | null>(null);
    const user = useContext(AuthContext);

    useEffect(() => {
        async function fetchLists() {
            if (!user?.user?.userId) return; // Garante que o usuário está carregado
    
            try {
                const response = await axios.get(`/api/travelList`, {
                    headers: {
                        Authorization: `Bearer ${user.recoveryToken()}`, // Pega o token dos cookies
                    },
                });
                setLists(response.data);
            } catch (error) {
                console.error("Erro ao buscar listas:", error);
            }
        }
    
        fetchLists();
    }, [user]);

    const filteredLists = lists?.ownedLists.filter((list) => list.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <>
            <main className="px-4 py-6 md:px-6 md:py-8">
                <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:w-80">
                        <Input
                            type="text"
                            placeholder="Buscar listas..."
                            className="pl-10 pr-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    </div>
                    <Button className="w-full bg-[#02bcfe] text-white hover:bg-[#02bcfe]/90 md:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Nova Lista
                    </Button>
                </div>

                <motion.div
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatePresence>
                        {filteredLists?.map((list) => (
                            <motion.div
                                key={list.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="group relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md md:p-6"
                            >
                                <div className="mb-4 flex items-center justify-between md:mb-6">
                                    <span className="text-3xl md:text-4xl">{list.name}</span>
                                    {list.createdAt && (
                                        <span className="rounded-full bg-[#02bcfe]/10 px-2 py-1 text-xs font-medium text-[#026df0] md:px-3">
                                           {list.createdAt} 
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-1 md:space-y-2">
                                    <h3 className="text-base font-medium text-gray-900 md:text-lg">{list.name}</h3>
                                    {list.items.length === 1 ? <p>{list.items.length} item</p> : <p>{list.items.length} itens</p>}
                                </div>
                                <div className="mt-4 flex items-center justify-between md:mt-6">
                                    <Button variant="outline" size="sm" className="text-[#026df0]">
                                        Ver Lista
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:gap-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Share2 className="h-4 w-4 text-gray-500" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Compartilhar lista</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Excluir lista</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>
        </>
    );
}