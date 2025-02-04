'use client';

import Image from "next/image";
import logo from "../../../public/logoBranca.png"

export function Footer(){

    return (

        <footer className="mt-20 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Image
                src={logo}
                alt="TudoNaMala Logo"
                width={150}
                height={50}
                className="h-8 w-auto"
              />
              <p className="text-sm text-white/70">Organize suas viagens de forma inteligente e colaborativa.</p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Produto</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-white">
                    Página inicial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-white">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Licença
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Contato</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-white">
                    Suporte
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-white/70 md:flex-row">
            <p>&copy; {new Date().getFullYear()} TudoNaMala. Todos os direitos reservados.</p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="hover:text-white">
                Instagram
              </a>
              <a href="#" className="hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
    
}