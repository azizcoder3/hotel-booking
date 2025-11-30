// //app/services/restaurant/page.tsx
// import Image from 'next/image'
// import Link from 'next/link'
// import { Clock, Utensils, Wine } from 'lucide-react'

// export const metadata = {
//   title: 'Restaurant Gastronomique - LuxeHotel',
//   description: 'Une cuisine raffinée aux saveurs locales.',
// }

// export default function RestaurantPage() {
//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <div className="relative h-[50vh]">
//         <Image
//           src="/images/services/restaurant.jpeg"
//           alt="Restaurant"
//           fill
//           className="object-cover object-[center_75%] brightness-50"
//           priority
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-5xl font-bold text-white tracking-tight">Le Gourmet</h1>
//         </div>
//       </div>

//       {/* Contenu */}
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Éveil des sens</h2>
//             <p className="text-gray-600 text-lg mb-6 leading-relaxed">
//               Notre chef étoilé vous propose une cuisine inventive qui revisite les classiques de la région. 
//               Nous privilégions les circuits courts et les produits de saison pour garantir une fraîcheur absolue dans votre assiette.
//             </p>
//             <div className="flex gap-6 mb-8">
//               <div className="flex items-center gap-2 text-indigo-600">
//                 <Utensils className="h-5 w-5" />
//                 <span className="font-medium">Menu Dégustation</span>
//               </div>
//               <div className="flex items-center gap-2 text-indigo-600">
//                 <Wine className="h-5 w-5" />
//                 <span className="font-medium">Cave d&apos;exception</span>
//               </div>
//             </div>
//             <Link href="/contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-colors">
//               Réserver une table
//             </Link>
//           </div>
          
//           {/* Horaires Card */}
//           <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
//             <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//               <Clock className="h-5 w-5 text-indigo-600" /> Horaires d&apos;ouverture
//             </h3>
//             <ul className="space-y-4 text-gray-600">
//               <li className="flex justify-between border-b pb-2">
//                 <span>Petit-déjeuner</span>
//                 <span className="font-medium">07:00 - 10:30</span>
//               </li>
//               <li className="flex justify-between border-b pb-2">
//                 <span>Déjeuner</span>
//                 <span className="font-medium">12:00 - 14:30</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Dîner</span>
//                 <span className="font-medium">19:00 - 22:30</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import Image from 'next/image'
import Link from 'next/link'
import { Clock, Utensils, Wine } from 'lucide-react'
import DetailCarousel from '@/components/services/DetailCarousel' // <--- IMPORT 1
import OtherServices from '@/components/services/OtherServices' // <--- IMPORT 2

export const metadata = {
  title: 'Restaurant Gastronomique - LuxeHotel',
  description: 'Une cuisine raffinée aux saveurs locales.',
}

// Liste des images de détails pour le restaurant (Assure-toi d'avoir ces images !)
// Tu peux réutiliser les mêmes pour tester si tu n'en as pas d'autres
const galleryImages = [
  '/images/services/restaurant.jpeg',
  '/images/services/restaurant-chef.jpeg', // Remplace par une vraie photo de plat
  '/images/services/restaurant-elegant.jpeg', // Remplace par une photo du chef
  '/images/services/restaurant-clean.jpeg' // Remplace par une photo de la salle
]

export default function RestaurantPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <Image
          src="/images/services/restaurant.jpeg"
          alt="Restaurant"
          fill
          className="object-cover object-[center_75%] brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white tracking-tight">Le Gourmet</h1>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Éveil des sens</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Notre chef étoilé vous propose une cuisine inventive qui revisite les classiques de la région. 
              Nous privilégions les circuits courts et les produits de saison pour garantir une fraîcheur absolue dans votre assiette.
            </p>
            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2 text-indigo-600">
                <Utensils className="h-5 w-5" />
                <span className="font-medium">Menu Dégustation</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-600">
                <Wine className="h-5 w-5" />
                <span className="font-medium">Cave d&apos;exception</span>
              </div>
            </div>
            <Link  href="/contact?subject=restaurant" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-colors">
              Réserver une table
            </Link>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" /> Horaires d&apos;ouverture
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex justify-between border-b pb-2">
                <span>Petit-déjeuner</span>
                <span className="font-medium">07:00 - 10:30</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Déjeuner</span>
                <span className="font-medium">12:00 - 14:30</span>
              </li>
              <li className="flex justify-between">
                <span>Dîner</span>
                <span className="font-medium">19:00 - 22:30</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- NOUVEAU COMPOSANT : Slider de détails --- */}
      <DetailCarousel images={galleryImages} />

      {/* --- NOUVEAU COMPOSANT : Autres services (sauf 'restaurant') --- */}
      <OtherServices currentServiceId="restaurant" />

    </div>
  )
}