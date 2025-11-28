// app/(private)/dashboard/page.tsx
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Calendar, MapPin, Clock, LogOut } from 'lucide-react'

// Fonction utilitaire pour formater les dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Vérifier l'utilisateur
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Récupérer le profil
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  // 3. Récupérer les réservations
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms ( name, image_url, slug )
    `)
    .eq('user_id', user.id)
    .order('start_date', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Espace</h1>
            <p className="text-gray-500 mt-1">
              Bonjour, <span className="font-semibold text-indigo-600">{profile?.full_name || user.email}</span>
            </p>
          </div>
          
          <form action="/auth/signout" method="post">
            <button className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-red-100">
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </form>
        </div>

        {/* Liste */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Mes Réservations</h2>

          {(!bookings || bookings.length === 0) ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Vous n&apos;avez aucune réservation pour le moment.</p>
              <Link href="/rooms" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 font-medium">
                Explorer nos chambres
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                  
                  {/* Image */}
                  <div className="relative h-48 md:h-auto md:w-64 bg-gray-200">
                     {booking.rooms ? (
                        <Image
                          src={booking.rooms.image_url || '/placeholder.jpg'}
                          alt={booking.rooms.name}
                          fill
                          className="object-cover"
                        />
                     ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">Chambre indisponible</div>
                     )}
                  </div>

                  {/* Détails */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* --- C'EST ICI QUE J'AI FAIT LA MODIFICATION --- */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {booking.rooms?.name || 'Chambre inconnue'}
                        </h3>
                        
                        <div className="flex flex-col items-end gap-2">
                          {/* Badge 1 : Statut Réservation */}
                          {booking.status === 'confirmed' && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 border border-green-200">
                                  ✅ Confirmée
                              </span>
                          )}
                          {booking.status === 'cancelled' && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                                  ❌ Annulée
                              </span>
                          )}
                          {booking.status === 'pending' && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700 border border-yellow-200">
                                  ⏳ En attente
                              </span>
                          )}

                          {/* Badge 2 : Statut Financier */}
                          {booking.status !== 'cancelled' && (
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                                  booking.payment_status === 'paid' 
                                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                                      : 'bg-orange-50 text-orange-700 border border-orange-200'
                              }`}>
                                  {booking.payment_status === 'paid' ? (
                                      <>💳 Payé (Soldé)</>
                                  ) : (
                                      <>🏨 À payer sur place</>
                                  )}
                              </span>
                          )}
                        </div>
                      </div>
                      {/* --- FIN DE LA MODIFICATION --- */}

                      <div className="text-gray-500 text-sm space-y-2 mt-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-indigo-500" />
                          <span>Du {formatDate(booking.start_date)} au {formatDate(booking.end_date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-indigo-500" />
                          <span>LuxeHotel, Miami</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-indigo-500" />
                          <span>Check-in: 15h00</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-6 pt-4 border-t border-gray-50">
                      <div>
                        <span className="text-xs text-gray-400 uppercase">Prix Total</span>
                        <p className="text-xl font-bold text-gray-900">{booking.total_price}€</p>
                      </div>
                      
                      {booking.rooms && (
                        <Link href={`/rooms/${booking.rooms.slug}`} className="text-indigo-600 font-medium hover:underline text-sm">
                          Revoir la chambre
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}