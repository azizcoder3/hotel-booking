import { createClient } from '@/lib/supabase/server'
import RoomCard from '@/components/rooms/RoomCard'

export const metadata = {
  title: 'Nos Chambres - LuxeHotel',
  description: 'Découvrez nos suites et chambres de luxe.',
}

export default async function RoomsPage() {
  const supabase = await createClient()

  // Requête à la base de données : Récupérer toutes les chambres
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .order('price_per_night', { ascending: true })

  if (error) {
    return <div className="text-center py-20">Erreur lors du chargement des chambres.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Header simple pour la page */}
      <div className="bg-white py-16 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Nos Hébergements</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Que vous voyagiez pour affaires ou pour le plaisir, nous avons la chambre parfaite pour vous.
          </p>
        </div>
      </div>

      {/* Grille des chambres */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms?.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        
        {(!rooms || rooms.length === 0) && (
            <p className="text-center text-gray-500 mt-10">Aucune chambre disponible pour le moment.</p>
        )}
      </div>
    </div>
  )
}