//app/services/conference/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Wifi, Projector, Users } from 'lucide-react'
import DetailCarousel from '@/components/services/DetailCarousel' // <--- IMPORT 1
import OtherServices from '@/components/services/OtherServices' // <--- IMPORT 2

export const metadata = {
  title: 'Salles de Conférence - LuxeHotel',
  description: 'Espaces professionnels pour vos événements.',
}

// Liste des images de détails pour le restaurant (Assure-toi d'avoir ces images !)
// Tu peux réutiliser les mêmes pour tester si tu n'en as pas d'autres
const galleryImages = [
  '/images/services/conference.jpeg',
  '/images/services/salle-conference-01.png', // Remplace par une vraie photo de plat
  '/images/services/salle-conference-02.png', // Remplace par une photo du chef
  '/images/services/salle-conference-03.png' // Remplace par une photo de la salle
]

export default function ConferencePage() {
  return (
    <div className="bg-white">
      <div className="relative h-[50vh]">
        <Image
          src="/images/services/conference.jpeg"
          alt="Conférence"
          fill
          className="object-cover object-[center_85%] brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white tracking-tight">Business & Événements</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Des espaces modulables pour votre réussite</h2>
            <p className="text-gray-600 text-lg mb-6">
              Séminaires, réunions de direction ou lancements de produits : nous avons l&apos;espace qu&apos;il vous faut. Nos salles sont équipées des dernières technologies pour garantir le succès de vos présentations.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <Wifi className="h-5 w-5 text-indigo-600" /> Fibre optique dédiée sécurisée
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <Projector className="h-5 w-5 text-indigo-600" /> Écrans 4K et système audio Bose
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <Users className="h-5 w-5 text-indigo-600" /> Capacité jusqu&apos;à 200 personnes
              </li>
            </ul>
            <Link href="/contact?subject=conference" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-colors">
              Demander un devis
            </Link>
          </div>
          
          <div className="bg-gray-100 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nos Forfaits Journée</h3>
            <div className="space-y-4">
               <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-indigo-900">Demi-Journée</span>
                    <span className="text-lg font-bold text-gray-900">55€ / pers</span>
                  </div>
                  <p className="text-sm text-gray-500">Location salle + 1 Pause café</p>
               </div>
               <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-indigo-900">Journée Étude</span>
                    <span className="text-lg font-bold text-gray-900">85€ / pers</span>
                  </div>
                  <p className="text-sm text-gray-500">Location + 2 Pauses + Déjeuner</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- NOUVEAU COMPOSANT : Slider de détails --- */}
              <DetailCarousel images={galleryImages} />
        
              {/* --- NOUVEAU COMPOSANT : Autres services (sauf 'restaurant') --- */}
              <OtherServices currentServiceId="conference" />
    </div>
  )
}