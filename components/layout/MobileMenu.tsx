'use client'

import { useState } from 'react'
import Link from 'next/link'
// 1. On renomme 'User' en 'UserIcon' pour éviter le conflit avec le type Supabase
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react'
import { useCurrency, type Currency } from '@/components/providers/CurrencyContext'
import { type User } from '@supabase/supabase-js' // 2. On importe le vrai type User

interface MobileMenuProps {
  user: User | null // <--- Correction ici : C'est un User Supabase ou null
  isAdmin: boolean
}

export default function MobileMenu({ user, isAdmin }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setCurrency, currency } = useCurrency()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      {/* Bouton Burger */}
      <button 
        onClick={toggleMenu} 
        className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
        aria-label="Ouvrir le menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Le Menu Déroulant (Overlay) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl p-4 flex flex-col gap-4 z-50 animate-in slide-in-from-top-5">
          
          {/* Liens de navigation */}
          <Link href="/" onClick={toggleMenu} className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100">
            Accueil
          </Link>
          <Link href="/rooms" onClick={toggleMenu} className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100">
            Chambres
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100">
            Contact
          </Link>

          {/* Sous-menu Services */}
          <div className="py-2 border-b border-gray-100">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">Services</span>
            <div className="pl-4 flex flex-col gap-2">
                <Link href="/services/restaurant" onClick={toggleMenu} className="text-gray-600">🍽️ Restaurant</Link>
                <Link href="/services/wellness" onClick={toggleMenu} className="text-gray-600">💆 Bien-être & Spa</Link>
                <Link href="/services/pool" onClick={toggleMenu} className="text-gray-600">🏊 Piscine</Link>
                <Link href="/services/conference" onClick={toggleMenu} className="text-gray-600">💼 Salle de conférence</Link>
            </div>
          </div>

          {/* Sélecteur de Devise Mobile */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Devise</span>
            <select 
                value={currency} 
                // Correction ici : On caste en type 'Currency'
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-gray-50 border border-gray-300 rounded p-1 text-sm"
            >
                <option value="EUR">EUR (€)</option>
                <option value="XAF">XAF</option>
                <option value="XOF">XOF</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
            </select>
          </div>

          {/* Section Utilisateur */}
          <div className="pt-2">
            {user ? (
              <div className="flex flex-col gap-3">
                <Link 
                  href={isAdmin ? "/admin" : "/dashboard"}
                  onClick={toggleMenu}
                  className="flex items-center gap-2 text-indigo-600 font-semibold"
                >
                  <UserIcon className="h-5 w-5" /> {/* Utilisation de l'icône renommée */}
                  {isAdmin ? "Espace Admin" : "Mon Compte"}
                </Link>
                <form action="/auth/signout" method="post">
                    <button type="submit" className="flex items-center gap-2 text-red-500 w-full text-left">
                        <LogOut className="h-5 w-5" /> Se déconnecter
                    </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link 
                    href="/login" 
                    onClick={toggleMenu}
                    className="w-full text-center py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium"
                >
                    Se connecter
                </Link>
                <Link 
                    href="/rooms" 
                    onClick={toggleMenu}
                    className="w-full text-center py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md"
                >
                    Réserver
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  )
}