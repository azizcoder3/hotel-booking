// app/rooms/page.tsx
import { createClient } from '@/lib/supabase/server'
import RoomCard from '@/components/rooms/RoomCard'
import { CalendarX } from 'lucide-react'
import PackagesSection from "@/components/home/PackagesSection"

export const metadata = {
  title: 'Nos Chambres - LuxeHotel',
  description: 'Découvrez nos suites et chambres de luxe.',
}

// searchParams permet de lire l'URL (?start=...&end=...)
export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string; end?: string; adults?: string; children?: string }>
}) {
  const supabase = await createClient()
  const { start, end } = await searchParams

  // 1. Récupérer TOUTES les chambres
  const { data: allRooms, error } = await supabase
    .from('rooms')
    .select('*')
    .order('price_per_night', { ascending: true })

  if (error) return <div className="text-center py-20">Erreur chargement.</div>

  // 2. FILTRAGE : Si des dates sont sélectionnées, on cherche les indisponibilités
  let availableRooms = allRooms

  if (start && end) {
    // On cherche les réservations qui CHEVAUCHENT les dates demandées
    const { data: busyBookings } = await supabase
      .from('bookings')
      .select('room_id')
      .neq('status', 'cancelled') // On ignore les annulées
      .or(`and(start_date.lte.${end},end_date.gte.${start})`) // Logique de chevauchement

    // On extrait les IDs des chambres occupées
    const busyRoomIds = busyBookings?.map((b) => b.room_id) || []

    // On garde uniquement les chambres qui NE SONT PAS dans la liste busyRoomIds
    availableRooms = allRooms?.filter((room) => !busyRoomIds.includes(room.id)) || []
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Header */}
      <div className="bg-white py-16 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {start && end ? `Disponibilités du ${new Date(start).toLocaleDateString()} au ${new Date(end).toLocaleDateString()}` : 'Nos Hébergements'}
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            {availableRooms?.length} chambre(s) disponible(s) pour votre séjour de rêve.
          </p>
        </div>
      </div>

      {/* Grille */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {availableRooms && availableRooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {availableRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
             <CalendarX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-gray-900">Aucune disponibilité</h3>
             <p className="text-gray-500 mt-2">Désolé, toutes nos chambres sont complètes à ces dates.<br/>Essayez de modifier vos dates de séjour.</p>
          </div>
        )}

      </div>
      <div>
        <PackagesSection />
      </div>
    </div>
  )
}