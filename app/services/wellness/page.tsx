//app/services/wellness/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Droplets, Heart } from 'lucide-react'
import DetailCarousel from '@/components/services/DetailCarousel' // <--- IMPORT 1
import OtherServices from '@/components/services/OtherServices' // <--- IMPORT 2

export const metadata = {
  title: 'Spa & Bien-être - LuxeHotel',
  description: 'Détente absolue dans notre spa de luxe.',
}

// Liste des images de détails pour le restaurant (Assure-toi d'avoir ces images !)
// Tu peux réutiliser les mêmes pour tester si tu n'en as pas d'autres
const galleryImages = [
  '/images/services/spa-scene-a-woman.jpeg',
  '/images/services/spa-massage-room.jpeg', // Remplace par une vraie photo de plat
  '/images/services/spa_relaxation_room.jpeg', // Remplace par une photo du chef
  '/images/services/sauna.jpeg' // Remplace par une photo de la salle
]

export default function WellnessPage() {
  return (
    <div className="bg-white">
      <div className="relative h-[50vh]">
        <Image
          src="/images/services/wellness.jpeg"
          alt="Spa"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white tracking-tight">Oasis de Paix</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reconnectez votre corps et votre esprit</h2>
          <p className="text-gray-600 text-lg">
            Plongez dans un univers de sérénité. Nos thérapeutes experts vous proposent une gamme complète de soins pour une relaxation totale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-indigo-50 rounded-2xl text-center">
            <Droplets className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hammam & Sauna</h3>
            <p className="text-gray-600">Détoxifiez votre corps grâce à nos installations traditionnelles.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl text-center">
            <Heart className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Massages</h3>
            <p className="text-gray-600">Des soins sur-mesure : suédois, pierres chaudes ou ayurvédique.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl text-center">
            <Sparkles className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Soins Visage</h3>
            <p className="text-gray-600">Des produits bio haut de gamme pour un éclat naturel.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-colors">
            Réserver un soin
          </Link>
        </div>
      </div>
      {/* --- NOUVEAU COMPOSANT : Slider de détails --- */}
            <DetailCarousel images={galleryImages} />
      
            {/* --- NOUVEAU COMPOSANT : Autres services (sauf 'restaurant') --- */}
            <OtherServices currentServiceId="wellness" />
      
    </div>
  )
}