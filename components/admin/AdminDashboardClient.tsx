'use client'

import { useState } from 'react'
import { List, Calendar as CalendarIcon, Check, X, DollarSign, User, Calendar } from 'lucide-react'
import AdminCalendar from './AdminCalendar'
import { updateStatus } from '@/app/admin/actions'

// L'interface est définie ici...
interface Booking {
  id: string
  status: string
  payment_status: string | null // Peut être null parfois
  total_price: number
  start_date: string
  end_date: string
  rooms: { name: string } | null
  profiles: { full_name: string | null; email: string | null, phone: string | null } | null
}

// ... et on l'utilise ICI à la place de "any[]" 👇
export default function AdminDashboardClient({ bookings }: { bookings: Booking[] }) {
  const [view, setView] = useState<'list' | 'calendar'>('list')

  const statusTranslations: { [key: string]: string } = {
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
  pending: 'En attente'
}

  return (
    <div>
      {/* Onglets de navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setView('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            view === 'list' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <List className="h-4 w-4" />
          Vue Liste
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            view === 'calendar' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <CalendarIcon className="h-4 w-4" />
          Vue Calendrier
        </button>
      </div>

      {/* Contenu */}
      {view === 'calendar' ? (
        <AdminCalendar bookings={bookings} />
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambre & Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
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
                          {/* --- AJOUT DU TÉLÉPHONE --- */}
                        {booking.profiles?.phone && (
                            <div className="text-xs text-indigo-600 mt-1 font-mono">
                                📞 {booking.profiles.phone}
                            </div>
                        )}
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

                    {/* Statut Réservation */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {statusTranslations[booking.status]}
                        </span>
                        
                        {booking.status !== 'confirmed' && (
                            <form action={updateStatus}>
                                <input type="hidden" name="id" value={booking.id} />
                                <input type="hidden" name="type" value="booking_status" />
                                <input type="hidden" name="status" value="confirmed" />
                                <button type="submit" className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100"><Check className="h-4 w-4" /></button>
                            </form>
                        )}
                        {booking.status !== 'cancelled' && (
                            <form action={updateStatus}>
                                <input type="hidden" name="id" value={booking.id} />
                                <input type="hidden" name="type" value="booking_status" />
                                <input type="hidden" name="status" value="cancelled" />
                                <button type="submit" className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100"><X className="h-4 w-4" /></button>
                            </form>
                        )}
                      </div>
                    </td>

                    {/* Paiement */}
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
                                <input type="hidden" name="status" value="paid" />
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
      )}
    </div>
  )
}