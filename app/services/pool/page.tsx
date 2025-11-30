//app/services/pool/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Waves, Sun, Martini, Umbrella, Clock, Info } from 'lucide-react'
import DetailCarousel from '@/components/services/DetailCarousel' // <--- IMPORT 1
import OtherServices from '@/components/services/OtherServices' // <--- IMPORT 2

export const metadata = {
  title: 'Piscine Infinity & Solarium - LuxeHotel',
  description: 'Détendez-vous au bord de notre piscine chauffée avec vue panoramique.',
}

// Liste des images de détails pour le restaurant (Assure-toi d'avoir ces images !)
// Tu peux réutiliser les mêmes pour tester si tu n'en as pas d'autres
const galleryImages = [
  '/images/services/pool.jpeg',
  '/images/services/piscine-vue-laterale.png', // Remplace par une vraie photo de plat
  '/images/services/piscine-vue-principale.png', // Remplace par une photo du chef
  '/images/services/piscine-vue-proche.png' // Remplace par une photo de la salle
]

export default function PoolPage() {
  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <Image
          src="/images/services/pool.jpeg" // Vérifie bien le nom du fichier
          alt="Piscine Infinity"
          fill
          className="object-cover object-[center_70%] brightness-50" // J'ai ajusté la position pour bien voir l'eau
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <span className="block text-blue-200 uppercase tracking-widest font-semibold mb-2">Détente & Soleil</span>
            <h1 className="text-5xl font-bold text-white tracking-tight">L&apos;Oasis Bleue</h1>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Plongez dans le bonheur</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Située sur le toit-terrasse, notre piscine à débordement (Infinity Pool) offre une vue spectaculaire sur la ville. 
            Que ce soit pour faire quelques longueurs au matin ou siroter un cocktail au coucher du soleil, c&apos;est l&apos;endroit idéal pour déconnecter.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 transition-transform hover:-translate-y-1">
            <Waves className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Eau Chauffée</h3>
            <p className="text-sm text-gray-600">Température idéale de 28°C toute l&apos;année.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 transition-transform hover:-translate-y-1">
            <Martini className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Pool Bar</h3>
            <p className="text-sm text-gray-600">Service de boissons et snacks directement à votre transat.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 transition-transform hover:-translate-y-1">
            <Umbrella className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Solarium</h3>
            <p className="text-sm text-gray-600">Transats confortables et cabanas privées disponibles.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 transition-transform hover:-translate-y-1">
            <Sun className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Vue Panoramique</h3>
            <p className="text-sm text-gray-600">Le meilleur spot de la ville pour admirer le coucher de soleil.</p>
          </div>
        </div>

        {/* Informations Pratiques */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-400" /> Horaires d&apos;ouverture
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Tous les jours : 07h00 - 22h00</li>
              <li>• Pool Bar : 11h00 - 23h00</li>
              <li>• Réservé aux clients de l&apos;hôtel</li>
            </ul>
          </div>
          
          <div className="w-full md:w-auto bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
             <div className="flex items-start gap-4">
                <Info className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-lg mb-1">Bon à savoir</h4>
                    <p className="text-sm text-gray-300 max-w-xs">
                        Les serviettes de bain sont fournies gratuitement à l&apos;entrée. 
                        Les enfants doivent être accompagnés d&apos;un adulte.
                    </p>
                </div>
             </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
            <Link href="/contact" className="text-indigo-600 font-semibold hover:text-indigo-500 hover:underline">
                Réserver une Cabana privée &rarr;
            </Link>
        </div>
      </div>
      {/* --- NOUVEAU COMPOSANT : Slider de détails --- */}
        <DetailCarousel images={galleryImages} />
  
        {/* --- NOUVEAU COMPOSANT : Autres services (sauf 'restaurant') --- */}
        <OtherServices currentServiceId="pool" />
    </div>
  )
}