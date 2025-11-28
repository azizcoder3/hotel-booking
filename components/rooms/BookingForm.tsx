'use client'

import { useState } from 'react' // J'ai retiré useEffect
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { fr } from 'date-fns/locale'
import { differenceInDays, addDays, format } from 'date-fns'
import { createBooking } from '@/app/actions/bookingActions'

import './datepicker-custom.css' 

export default function BookingForm({ price, roomId }: { price: number, roomId: string }) {
  const router = useRouter()
  
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 1))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0
  const totalRoomPrice = nights * price
  const cleaningFee = 30
  const totalPrice = totalRoomPrice + cleaningFee

  async function handleSubmit() {
    setError(null)
    setIsSubmitting(true)

    if (!startDate || !endDate) {
      setError("Veuillez sélectionner vos dates.")
      setIsSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.append('roomId', roomId)
    formData.append('startDate', format(startDate, 'yyyy-MM-dd'))
    formData.append('endDate', format(endDate, 'yyyy-MM-dd'))
    formData.append('pricePerNight', price.toString())

    const result = await createBooking(formData)

    if (result?.error) {
      if (result.error === 'not_authenticated') {
        router.push(`/login?next=/rooms/${roomId}`)
      } else {
        setError(result.error)
      }
      setIsSubmitting(false)
    } else if (result?.success) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sticky top-24">
      <div className="mb-6 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-gray-900">{price}€</span>
        <span className="text-gray-500">/ nuit</span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Arrivée</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              locale={fr}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Départ</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate ? addDays(startDate, 1) : new Date()}
              locale={fr}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
           <label className="text-xs font-bold text-gray-500 uppercase mb-1">Voyageurs</label>
           <select className="block w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500">
             <option>1 adulte</option>
             <option>2 adultes</option>
             <option>2 adultes, 1 enfant</option>
           </select>
        </div>
      </div>

      {nights > 0 && (
        <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="underline">{price}€ x {nights} nuits</span>
            <span>{totalRoomPrice}€</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Frais de ménage</span>
            <span>{cleaningFee}€</span>
          </div>
          <div className="flex justify-between border-t pt-3 font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>{totalPrice}€</span>
          </div>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        disabled={isSubmitting || nights <= 0}
        // J'ai retiré "transition-colors" ici 👇
        className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-95 transition-all"
      >
        {isSubmitting ? 'Traitement...' : 'Réserver maintenant'}
      </button>
      
      <p className="mt-4 text-center text-xs text-gray-400">
        Vous ne serez débité que si la réservation est confirmée.
      </p>
    </div>
  )
}