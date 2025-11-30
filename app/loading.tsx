import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center bg-white/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Le Spinner animé */}
        <div className="relative">
          {/* Cercle extérieur fixe */}
          <div className="h-16 w-16 rounded-full border-4 border-indigo-100"></div>
          
          {/* Cercle intérieur qui tourne */}
          <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          
          {/* Icône au centre (Optionnel, effet sympa) */}
          <div className="absolute top-0 left-0 h-16 w-16 flex items-center justify-center">
             <Loader2 className="h-6 w-6 text-indigo-600 animate-pulse" />
          </div>
        </div>

        {/* Petit texte discret */}
        <p className="text-sm font-medium text-indigo-900 animate-pulse tracking-widest uppercase">
          LuxeHotel
        </p>
      </div>
    </div>
  )
}