import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { 
  ArrowLeft, Users, Maximize, BedDouble, Bath, 
  Wifi, Car, Coffee, Tv, Wind, CheckCircle, Clock, Ban 
} from 'lucide-react'
import BookingForm from '@/components/rooms/BookingForm'
import RoomGallery from '@/components/rooms/RoomGallery'
import ReviewsSection from '@/components/rooms/ReviewsSection'

// Helper pour choisir l'icône selon le nom de l'équipement
const getAmenityIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.includes('wifi')) return <Wifi className="h-5 w-5" />
  if (lower.includes('parking')) return <Car className="h-5 w-5" />
  if (lower.includes('café') || lower.includes('coffee')) return <Coffee className="h-5 w-5" />
  if (lower.includes('tv') || lower.includes('télé')) return <Tv className="h-5 w-5" />
  if (lower.includes('clim') || lower.includes('air')) return <Wind className="h-5 w-5" />
  return <CheckCircle className="h-5 w-5" /> // Icône par défaut
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const supabase = await createClient()
  
  // 1. Récupérer la chambre
  const { data: room } = await supabase
    .from('rooms')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!room) return notFound()

  // 2. Récupérer les images
  const { data: images } = await supabase
    .from('room_images')
    .select('url, caption')
    .eq('room_id', room.id)

  // 3. NOUVEAU : Récupérer les AVIS (avec le nom de l'utilisateur via la table profiles)
  // Note: assure-toi que ta table profiles existe bien (créée à l'étape 1 du projet)
  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      id, rating, comment, created_at,
      profiles ( full_name )
    `)
    .eq('room_id', room.id)
    .order('created_at', { ascending: false })

  // return (
  //   <div className="bg-gray-50 min-h-screen py-10">
  //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
  //       {/* Fil d'Ariane */}
  //       <Link href="/rooms" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
  //         <ArrowLeft className="mr-2 h-4 w-4" />
  //         Retour au catalogue
  //       </Link>

  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
  //         {/* COLONNE GAUCHE : Contenu Riche */}
  //         <div className="lg:col-span-2 space-y-10">
            
  //           {/* 1. GALERIE PHOTOS */}
  //           <RoomGallery images={images || []} />

  //           {/* Titre & Intro */}
  //           <div>
  //             <h1 className="text-4xl font-bold text-gray-900 mb-2">{room.name}</h1>
  //             <p className="text-gray-500 text-lg">Luxe, calme et volupté.</p>
  //           </div>

  //           {/* 2. PARAMÈTRES DE LA CHAMBRE (Design "Cards") */}
  //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  //             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
  //               <Maximize className="h-6 w-6 text-indigo-500 mb-2" />
  //               <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Surface</span>
  //               <span className="font-semibold text-gray-900">{room.size_sqm} m²</span>
  //             </div>
  //             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
  //               <Users className="h-6 w-6 text-indigo-500 mb-2" />
  //               <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Capacité</span>
  //               <span className="font-semibold text-gray-900">{room.capacity} Pers.</span>
  //             </div>
  //             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
  //               <BedDouble className="h-6 w-6 text-indigo-500 mb-2" />
  //               <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Lits</span>
  //               <span className="font-semibold text-gray-900">{room.beds} King Size</span>
  //             </div>
  //             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
  //               <Bath className="h-6 w-6 text-indigo-500 mb-2" />
  //               <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">SDB</span>
  //               <span className="font-semibold text-gray-900">{room.bathrooms} Privée</span>
  //             </div>
  //           </div>

  //           {/* Description */}
  //           <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
  //               <h2 className="text-xl font-bold text-gray-900 mb-4">À propos du logement</h2>
  //               <p className="text-gray-600 leading-relaxed">{room.description}</p>
  //           </div>

  //           {/* 3. ÉQUIPEMENTS (Facilities) */}
  //           <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
  //             <h2 className="text-xl font-bold text-gray-900 mb-6">Équipements & Services</h2>
  //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  //               {room.amenities?.map((item: string, index: number) => (
  //                 <div key={index} className="flex items-center gap-3 text-gray-700">
  //                   <span className="text-indigo-500">
  //                       {getAmenityIcon(item)}
  //                   </span>
  //                   <span className="text-sm font-medium">{item}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>

  //           {/* 4. INFORMATIONS IMPORTANTES (Policies) */}
  //           <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
  //              <h2 className="text-xl font-bold text-gray-900 mb-6">Informations Importantes</h2>
  //              <div className="space-y-4">
  //                 <div className="flex items-start gap-4">
  //                     <Clock className="h-5 w-5 text-amber-500 mt-1" />
  //                     <div>
  //                         <p className="font-semibold text-gray-900">Arrivée & Départ</p>
  //                         <p className="text-sm text-gray-500">Arrivée à partir de 15h00 • Départ avant 11h00</p>
  //                     </div>
  //                 </div>
  //                 <div className="flex items-start gap-4">
  //                     <Ban className="h-5 w-5 text-amber-500 mt-1" />
  //                     <div>
  //                         <p className="font-semibold text-gray-900">Règlement intérieur</p>
  //                         <p className="text-sm text-gray-500">Non fumeur • Animaux non admis • Pas de fêtes</p>
  //                     </div>
  //                 </div>
  //                 <div className="flex items-start gap-4">
  //                     <CheckCircle className="h-5 w-5 text-amber-500 mt-1" />
  //                     <div>
  //                         <p className="font-semibold text-gray-900">Annulation</p>
  //                         <p className="text-sm text-gray-500">Annulation gratuite jusqu&apos;à 48h avant l&apos;arrivée.</p>
  //                     </div>
  //                 </div>
  //              </div>
  //           </div>

  //           {/* ⬇️ NOUVEAU : SECTION AVIS AJOUTÉE ICI ⬇️ */}
  //           <ReviewsSection roomId={room.id} reviews={reviews || []} />

  //         </div>

  //         {/* COLONNE DROITE : Booking Form (Sticky) */}
  //         <div className="lg:col-span-1">
  //           <div className="sticky top-24 space-y-6">
  //             <BookingForm price={room.price_per_night} roomId={room.id} />
              
  //             {/* Carte "Besoin d'aide ?" */}
  //             <div className="rounded-xl bg-indigo-50 p-6 text-center border border-indigo-100">
  //                <p className="font-semibold text-indigo-900">Besoin d&apos;aide ?</p>
  //                <p className="text-xs text-indigo-600 mt-1 mb-3">Notre équipe est là 24/7</p>
  //                <a href="tel:+123456789" className="text-sm font-bold text-indigo-700 hover:underline">
  //                   +33 1 23 45 67 89
  //                </a>
  //             </div>
  //           </div>
  //         </div>

  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane */}
        <Link href="/rooms" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au catalogue
        </Link>

        {/* --- DÉBUT DE LA GRILLE PRINCIPALE (Détails + Formulaire) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLONNE GAUCHE : Contenu Riche */}
          <div className="lg:col-span-2 space-y-10">
            
            <RoomGallery images={images || []} />

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{room.name}</h1>
              <p className="text-gray-500 text-lg">Luxe, calme et volupté.</p>
            </div>

            {/* Paramètres */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <Maximize className="h-6 w-6 text-indigo-500 mb-2" />
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Surface</span>
                <span className="font-semibold text-gray-900">{room.size_sqm} m²</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <Users className="h-6 w-6 text-indigo-500 mb-2" />
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Capacité</span>
                <span className="font-semibold text-gray-900">{room.capacity} Pers.</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <BedDouble className="h-6 w-6 text-indigo-500 mb-2" />
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Lits</span>
                <span className="font-semibold text-gray-900">{room.beds} King Size</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <Bath className="h-6 w-6 text-indigo-500 mb-2" />
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">SDB</span>
                <span className="font-semibold text-gray-900">{room.bathrooms} Privée</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">À propos du logement</h2>
                <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Équipements & Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {room.amenities?.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="text-indigo-500">
                        {getAmenityIcon(item)}
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infos Importantes */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
               <h2 className="text-xl font-bold text-gray-900 mb-6">Informations Importantes</h2>
               <div className="space-y-4">
                  <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-amber-500 mt-1" />
                      <div>
                          <p className="font-semibold text-gray-900">Arrivée & Départ</p>
                          <p className="text-sm text-gray-500">Arrivée à partir de 15h00 • Départ avant 11h00</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                      <Ban className="h-5 w-5 text-amber-500 mt-1" />
                      <div>
                          <p className="font-semibold text-gray-900">Règlement intérieur</p>
                          <p className="text-sm text-gray-500">Non fumeur • Animaux non admis • Pas de fêtes</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-1" />
                      <div>
                          <p className="font-semibold text-gray-900">Annulation</p>
                          <p className="text-sm text-gray-500">Annulation gratuite jusqu&apos;à 48h avant l&apos;arrivée.</p>
                      </div>
                  </div>
               </div>
            </div>

          </div>

          {/* COLONNE DROITE : Booking Form (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BookingForm price={room.price_per_night} roomId={room.id} />
              
              <div className="rounded-xl bg-indigo-50 p-6 text-center border border-indigo-100">
                 <p className="font-semibold text-indigo-900">Besoin d&apos;aide ?</p>
                 <p className="text-xs text-indigo-600 mt-1 mb-3">Notre équipe est là 24/7</p>
                 <a href="tel:+123456789" className="text-sm font-bold text-indigo-700 hover:underline">
                    +33 1 23 45 67 89
                 </a>
              </div>
            </div>
          </div>

        </div> 
        {/* ⬅️ FIN DE LA GRILLE PRINCIPALE */}


        {/* ⬇️ NOUVELLE SECTION AVIS (SEULE, EN BAS) ⬇️ */}
        <div className="mt-16">
            <ReviewsSection roomId={room.id} reviews={reviews || []} />
        </div>

      </div>
    </div>
  )
}