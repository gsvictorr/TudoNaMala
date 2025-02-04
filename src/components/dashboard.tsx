"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, LogOut, Menu, X, User, Settings, List, Share2, Trash2, ChevronRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardProps {
  logo: string
}

export default function Dashboard({ logo }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lists, setLists] = useState([
    { id: 1, title: "Viagem para Paris", items: 15, shared: true },
    { id: 2, title: "Acampamento de Verão", items: 8, shared: false },
    { id: 3, title: "Férias na Praia", items: 12, shared: true },
  ])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <Image src={logo || "/placeholder.svg"} alt="TudoNaMala Logo" width={120} height={40} />
            <button onClick={toggleSidebar} className="lg:hidden">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            <a href="#" className="flex items-center rounded-lg bg-primary px-4 py-2 text-white">
              <List className="mr-3 h-5 w-5" />
              Minhas Listas
            </a>
            <a href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Share2 className="mr-3 h-5 w-5" />
              Compartilhadas Comigo
            </a>
            <a href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Settings className="mr-3 h-5 w-5" />
              Configurações
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 lg:hidden">
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Minhas Listas</h2>
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Plus className="mr-2 h-5 w-5" /> Nova Lista
            </Button>
          </div>

          <div className="mb-6">
            <Input type="text" placeholder="Buscar listas..." className="max-w-md" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lists.map((list) => (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">{list.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {list.items} itens
                    {list.shared && (
                      <span className="ml-2 rounded-full bg-secondary px-2 py-1 text-xs text-white">Compartilhada</span>
                    )}
                  </p>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Ver Lista
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="space-x-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

