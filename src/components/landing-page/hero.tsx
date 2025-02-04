'use client';
import { motion } from "framer-motion"
import { ChevronRight, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "../../../public/dashfundo.png"

export function Hero() {

    return (
        <section className="container mx-auto px-4 py-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <div className="mb-8 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Organize suas viagens com facilidade
                    </div>
                    <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">TudoNaMala</h1>
                    <p className="mb-8 text-xl text-white/90">
                        Crie e compartilhe listas de viagem com seus amigos. Mantenha tudo organizado em um só lugar.
                    </p>
                    <div className="flex flex-wrap gap-4">

                        <Button size="lg" className="bg-white text-principal hover:bg-white/90">
                            Começar agora
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="relative h-[400px] w-full">
                        <div className="absolute right-0 top-0 h-full w-[80%] rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                            <div className="relative h-full">
                                <Image
                                    src={logo}
                                    alt="App Preview"
                                    width={300}
                                    height={600}
                                    className="absolute -right-4 -top-4 h-[110%] w-auto rotate-12 rounded-xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );

}