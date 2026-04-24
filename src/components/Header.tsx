"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { WpCategory } from "@/lib/wp";

interface HeaderProps {
  categories?: WpCategory[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Bagadão"
                width={280}
                height={90}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center space-x-6 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors whitespace-nowrap text-sm"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Busca Desktop */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <form action="/busca" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Pesquisar..."
                className="pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64 bg-gray-50 transition-all"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Botão hamburguer Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none p-2"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-4 py-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-3 border-b border-gray-100 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4">
            <form action="/busca" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Pesquisar..."
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
