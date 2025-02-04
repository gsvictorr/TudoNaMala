'use client';
import { motion } from "framer-motion"
import { CheckCircle2, List, Plus, Share2 } from "lucide-react";

export function Features() {

    return (
        <section className="container mx-auto px-4 pb-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl bg-white p-6"
                >
                    <List className="mb-4 h-8 w-8 text-principal" />
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Unificado</h3>
                    <p className="text-gray-600">Mantenha todas suas listas de viagem organizadas em um só lugar</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="rounded-xl bg-white/10 p-6 text-white backdrop-blur-sm"
                >
                    <Share2 className="mb-4 h-8 w-8" />
                    <h3 className="mb-2 text-lg font-semibold">Compartilhamento</h3>
                    <p className="text-white/90">Compartilhe e colabore com amigos em tempo real</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="rounded-xl bg-white p-6"
                >
                    <Plus className="mb-4 h-8 w-8 text-principal" />
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Instantâneo</h3>
                    <p className="text-gray-600">Crie listas rapidamente com categorias predefinidas</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="rounded-xl bg-white/10 p-6 text-white backdrop-blur-sm"
                >
                    <CheckCircle2 className="mb-4 h-8 w-8" />
                    <h3 className="mb-2 text-lg font-semibold">Conveniente</h3>
                    <p className="text-white/90">Marque itens como prontos e mantenha tudo controlado</p>
                </motion.div>
            </div>

            <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">Todas as suas listas em
                    <span className="text-blue-800"> um só lugar.</span>
                </h2>
                <p className="mt-4 text-white/90">
                    Com o TudoNaMala, você pode criar e gerenciar múltiplas listas de viagem, compartilhar com amigos e manter
                    tudo organizado.
                </p>
            </div>
        </section>


    );

}