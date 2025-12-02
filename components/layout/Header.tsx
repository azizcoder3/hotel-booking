// components/layout/Header.tsx
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { ChevronDown, User, LogOut } from 'lucide-react'
import CurrencySwitcher from './CurrencySwitcher'
import MobileMenu from './MobileMenu'

export default async function Header() {
  const supabase = await createClient()
  
  // 1. Récupérer l'utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser()

  // 2. LOGIQUE AJOUTÉE : Vérifier si c'est un Admin
  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    // Si le rôle est 'admin', on passe la variable à true
    isAdmin = profile?.role === 'admin'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            {/* L'image du logo */}
            <div className="relative h-16 w-16 md:h-30 md:w-30 transition-transform group-hover:scale-110">
              <Image
                src="/logo-luxe.png" // Assure-toi que logo.png est bien dans le dossier public/
                alt="Logo LuxeHotel"
                fill
                className="object-contain"
                priority // Charge l'image en priorité pour le LCP (SEO)
                //sizes="(max-width: 768px) 48px, 64px"  Optimisation pour Google
              />
            </div>
            
            {/* Le Texte */}
            {/* <span className="text-xl md:text-2xl font-bold text-indigo-900 tracking-tight">
              LuxeHotel
            </span> */}
          </Link>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
            Accueil
          </Link>
          <Link href="/rooms" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
            Chambres
          </Link>

          {/* Menu Déroulant SERVICES */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-4 outline-none">
              Services
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            
            <div className="absolute left-0 top-full hidden w-56 flex-col rounded-xl bg-white p-2 shadow-xl ring-1 ring-gray-900/5 group-hover:flex">
              <Link href="/services/restaurant" className="rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                🍽️ Restaurant
              </Link>
              <Link href="/services/wellness" className="rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                💍 Bien etre & spa
              </Link>
              <Link href="/services/events" className="rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                💍 Mariages & Fêtes
              </Link>
              <Link href="/services/pool" className="rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                🏊 Piscine
              </Link>
              <Link href="/services/conference" className="rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                💼 Salle de conférence
              </Link>
            </div>
          </div>

          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
            Contact
          </Link>

          {/* Sélecteur de Devise */}
          <div className="mr-4 hidden md:block">
              <CurrencySwitcher />
          </div>
          
          {/* Section Droite : Auth & Réservation */}
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
            {user ? (
              // CAS 1 : Utilisateur Connecté
              <div className="flex items-center gap-4">
                {/* LIEN DYNAMIQUE ICI : Si admin -> /admin, Sinon -> /dashboard */}
                <Link 
                  href={isAdmin ? "/admin" : "/dashboard"} 
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <User className="h-4 w-4" />
                  {isAdmin ? "Espace Admin" : "Mon Compte"}
                </Link>

                <form action="/auth/signout" method="post">
                    <button type="submit" className="text-gray-500 hover:text-red-600">
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Déconnexion</span>
                    </button>
                </form>
              </div>
            ) : (
              // CAS 2 : Utilisateur Non Connecté
              <>
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Se connecter
                </Link>

                <Link
                  href="/rooms"
                  className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                  Réserver
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Menu Mobile */}
        <MobileMenu user={user} isAdmin={isAdmin} />
      </div>
    </header>
  )
}