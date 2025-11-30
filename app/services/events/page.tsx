//app/services/events/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Music, Camera, Gift } from 'lucide-react'
import DetailCarousel from '@/components/services/DetailCarousel' // <--- IMPORT 1
import OtherServices from '@/components/services/OtherServices' // <--- IMPORT 2

export const metadata = {
  title: 'Mariages & Banquets - LuxeHotel',
  description: 'Célébrez vos plus beaux moments avec nous.',
}

// Liste des images de détails pour le restaurant (Assure-toi d'avoir ces images !)
// Tu peux réutiliser les mêmes pour tester si tu n'en as pas d'autres
const galleryImages = [
  '/images/services/wedding.jpeg',
  '/images/services/salle-de-mariage-vue-devant.png', // Remplace par une vraie photo de plat
  '/images/services/salle-de-mariage-vue-laterale.png', // Remplace par une photo du chef
  '/images/services/salle-de-mariage-vue-principale.png' // Remplace par une photo de la salle
]

export default function WeddingsPage() {
  return (
    <div className="bg-white">
      <div className="relative h-[50vh]">
        <Image
          src="/images/services/wedding.jpeg"
          alt="Mariage"
          fill
          className="object-cover object-[center_75%] brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <span className="block text-indigo-200 uppercase tracking-widest font-semibold mb-2">Moments inoubliables</span>
            <h1 className="text-5xl font-bold text-white tracking-tight">Mariages & Réceptions</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Le cadre idéal pour dire &quot;Oui&quot;</h2>
          <p className="text-gray-600 text-lg">
            De la cérémonie intime au grand banquet, notre équipe dédiée vous accompagne pour créer l&apos;événement de vos rêves. 
            Profitez de notre salle de bal historique et de nos jardins privés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
           <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                 <Gift className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Service Clé en Main</h3>
              <p className="text-gray-500">Décoration, traiteur, musique : nous gérons tout.</p>
           </div>
           <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                 <Camera className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Lieux Photogéniques</h3>
              <p className="text-gray-500">Des décors somptueux pour vos photos souvenirs.</p>
           </div>
           <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                 <Music className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Soirée Dansante</h3>
              <p className="text-gray-500">Piste de danse et acoustique parfaite jusqu&apos;au bout de la nuit.</p>
           </div>
        </div>

        <div className="bg-indigo-900 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à organiser votre événement ?</h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">Contactez notre wedding planner pour une visite privée des lieux et un devis personnalisé.</p>
          <Link href="/contact?subject=event" className="inline-block bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Contacter l&apos;équipe événementiel
          </Link>
        </div>
      </div>
      {/* --- NOUVEAU COMPOSANT : Slider de détails --- */}
        <DetailCarousel images={galleryImages} />
  
        {/* --- NOUVEAU COMPOSANT : Autres services (sauf 'restaurant') --- */}
        <OtherServices currentServiceId="events" />
    </div>
  )
}