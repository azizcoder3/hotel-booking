import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Check, X, DollarSign, Calendar, User } from 'lucide-react'
import { revalidatePath } from 'next/cache'

// Action serveur pour modifier le statut (Mode Admin avec clé secrète)
async function updateStatus(formData: FormData) {
  'use server'
  
  // Connexion "Mode Dieu" pour contourner les restrictions
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const id = formData.get('id')
  const newStatus = formData.get('status') // Sera récupéré via l'input hidden
  const type = formData.get('type')

  console.log(`⚡ Admin Update : ${type} -> ${newStatus} pour ID ${id}`)

  let error;

  if (type === 'booking_status') {
    const res = await supabaseAdmin.from('bookings').update({ status: newStatus }).eq('id', id)
    error = res.error
  } else {
    const res = await supabaseAdmin.from('bookings').update({ payment_status: newStatus }).eq('id', id)
    error = res.error
  }
  
  if (error) {
    console.error("❌ Erreur :", error.message)
  } else {
    console.log("✅ Succès : Mise à jour effectuée")
  }
  
  revalidatePath('/admin')
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 1. Vérifier si Admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return <div className="p-10 text-center text-red-600">Accès interdit : Réservé aux administrateurs.</div>
  }

  // 2. Récupérer TOUTES les réservations
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms ( name ),
      profiles ( full_name, email )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Administration Hôtel</h1>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambre & Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut Réservation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings?.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    
                    {/* Client */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.profiles?.full_name || 'Inconnu'}</div>
                          <div className="text-sm text-gray-500">{booking.profiles?.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Chambre & Dates */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{booking.rooms?.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(booking.start_date).toLocaleDateString()} au {new Date(booking.end_date).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Prix */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">{booking.total_price}€</span>
                    </td>

                    {/* Actions Statut Réservation */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                        
                        {/* Bouton Confirmer */}
                        {booking.status !== 'confirmed' && (
                            <form action={updateStatus}>
                                <input type="hidden" name="id" value={booking.id} />
                                <input type="hidden" name="type" value="booking_status" />
                                <input type="hidden" name="status" value="confirmed" /> {/* Valeur ici */}
                                <button type="submit" className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Confirmer">
                                    <Check className="h-4 w-4" />
                                </button>
                            </form>
                        )}

                        {/* Bouton Annuler */}
                        {booking.status !== 'cancelled' && (
                            <form action={updateStatus}>
                                <input type="hidden" name="id" value={booking.id} />
                                <input type="hidden" name="type" value="booking_status" />
                                <input type="hidden" name="status" value="cancelled" /> {/* Valeur ici */}
                                <button type="submit" className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Annuler">
                                    <X className="h-4 w-4" />
                                </button>
                            </form>
                        )}
                      </div>
                    </td>

                    {/* Actions Paiement */}
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.payment_status === 'paid' ? 'bg-indigo-100 text-indigo-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {booking.payment_status === 'paid' ? 'Payé' : 'Sur place'}
                        </span>

                        {booking.payment_status !== 'paid' && (
                            <form action={updateStatus}>
                                <input type="hidden" name="id" value={booking.id} />
                                <input type="hidden" name="type" value="payment_status" />
                                <input type="hidden" name="status" value="paid" /> {/* <--- C'EST CA QUI MANQUAIT ! */}
                                
                                <button type="submit" className="p-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 flex items-center gap-1 text-xs font-bold px-2 border border-indigo-200">
                                    <DollarSign className="h-3 w-3" /> Encaisser
                                </button>
                            </form>
                        )}
                       </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}