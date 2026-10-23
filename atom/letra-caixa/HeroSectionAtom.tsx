'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, ArrowUpRight } from 'lucide-react'

interface HeroSectionAtomProps {
  sellerPhone?: string
  sellerName?: string
}

export function HeroSectionAtom({ 
  sellerPhone = "5534996688637", 
  sellerName = "Consultor Técnico Atom" 
}: HeroSectionAtomProps) {
  const waUrl = `https://api.whatsapp.com/send?phone=${sellerPhone}&text=${encodeURIComponent("Olá! Vi o site da Atom e gostaria de um orçamento para Letra Caixa.")}`

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      
      {/* Floating Pill Header */}
      <header className="fixed top-0 inset-x-0 z-40 pt-4 px-4 pointer-events-none">
        <nav className="max-w-6xl mx-auto rounded-full px-5 py-3 bg-white/80 backdrop-blur-2xl border border-slate-200/80 shadow-lg shadow-slate-900/5 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-tight text-slate-950">ATOM</span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold hidden sm:inline">Comunicação Visual</span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#materiais" className="hover:text-slate-950 transition">Materiais</a>
            <a href="#galeria" className="hover:text-slate-950 transition">Portfólio</a>
            <a href="#diferenciais" className="hover:text-slate-950 transition">Fábrica</a>
            <a href="#faq" className="hover:text-slate-950 transition">FAQ</a>
          </div>

          <Link
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 rounded-full pl-4 pr-3 text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white inline-flex items-center gap-1.5 transition active:scale-95"
          >
            <span>Orçamento Rápido</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </nav>
      </header>

      {/* Hero Section 5 Structure */}
      <main className="pt-32 sm:pt-40 lg:pt-44 pb-16">
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-3.5 py-1 text-xs font-medium text-slate-700 shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Fabricação Própria em Uberlândia • Corte Laser & Router</span>
            </div>

            {/* Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-slate-950 leading-[1.08] text-balance">
              Letra Caixa com acabamento industrial de precisão.
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl leading-relaxed text-balance">
              Do projeto 3D à instalação completa da sua fachada. Produzimos letreiros em Aço Inox, ACM, Acrílico, PVC e LED sem intermediários, direto da nossa fábrica em Uberlândia.
            </p>

            {/* Pill Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 sm:h-13 rounded-full bg-slate-950 hover:bg-slate-800 text-white pl-6 pr-4 text-base font-semibold inline-flex items-center justify-center gap-2 shadow-xl shadow-slate-950/15 transition active:scale-95 group"
              >
                <span>Solicitar Orçamento no WhatsApp</span>
                <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="#galeria"
                className="h-12 sm:h-13 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 px-6 text-base font-medium inline-flex items-center justify-center transition"
              >
                <span>Ver Portfólio de Obras</span>
              </a>
            </div>
          </div>

          {/* Cinematic Showcase Container */}
          <div className="mt-12 sm:mt-16 relative">
            <div className="aspect-[16/10] sm:aspect-[21/9] w-full rounded-3xl lg:rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden relative group bg-slate-950">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                src="https://cdn.21st.dev/assets/mirror/4b/4bc542f7d287b18d595da8e796a834608a5cf10ef3618e191bdc524ce712ba67.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur border border-white/15 text-amber-300 w-fit mb-2">
                  Oficina & Maquinário Atom
                </span>
                <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                  Corte a Laser de Alta Precisão & Solda Perfeita
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg">
                  Letreiros com acabamento estanque, fiação de LED embutida e fixação com gabarito em escala real.
                </p>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

