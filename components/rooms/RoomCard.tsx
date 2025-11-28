// components/rooms/RoomCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Users, Wifi, ArrowRight } from 'lucide-react'

// On définit le type des données qu'on reçoit de Supabase
interface RoomProps {
  room: {
    id: string
    name: string
    slug: string
    description: string
    price_per_night: number
    capacity: number
    image_url: string | null
    amenities: string[] | null
  }
}

export default function RoomCard({ room }: RoomProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl border border-gray-100">
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.image_url || '/placeholder.jpeg'}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-indigo-600 backdrop-blur-sm shadow-sm">
          {room.price_per_night}€ <span className="font-normal text-gray-500">/nuit</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {room.name}
            </h3>
        </div>
        
        <p className="mt-3 line-clamp-2 text-sm text-gray-600 flex-1">
          {room.description}
        </p>

        {/* Infos techniques */}
        <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity} pers.</span>
          </div>
          {room.amenities && room.amenities.length > 0 && (
            <div className="flex items-center gap-1">
              <Wifi className="h-4 w-4" />
              <span>{room.amenities[0]}</span>
            </div>
          )}
        </div>

        {/* Bouton */}
        <Link
          href={`/rooms/${room.slug}`}
          className="mt-6 flex w-full items-center justify-center rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white group-hover:bg-indigo-600 group-hover:text-white"
        >
          Voir les détails <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}