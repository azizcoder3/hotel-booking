'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { fr } from 'date-fns/locale'
import { differenceInDays, addDays, format, parseISO } from 'date-fns'
import { createBooking } from '@/app/actions/bookingActions'
import { useCurrency } from '@/components/providers/CurrencyContext'
import './datepicker-custom.css' 

// 1. Nouvelles Props pour recevoir les infos
interface BookingFormProps {
  price: number
  roomId: string
  initialStart?: string
  initialEnd?: string
  initialAdults?: number
  initialChildren?: number
}

export default function BookingForm({ 
  price, 
  roomId, 
  initialStart, 
  initialEnd,
  initialAdults = 1, 
  initialChildren = 0
}: BookingFormProps) {
  
  const { formatPrice } = useCurrency()
  const router = useRouter()
  
  // 2. Initialisation intelligente des États
  // Si on a une date dans l'URL, on l'utilise (parseISO), sinon on met aujourd'hui
  const [startDate, setStartDate] = useState<Date | null>(
    initialStart ? parseISO(initialStart) : new Date()
  )
  const [endDate, setEndDate] = useState<Date | null>(
    initialEnd ? parseISO(initialEnd) : addDays(new Date(), 1)
  )
  
  // 3. Séparation Adultes / Enfants comme sur l'accueil
  const [adults, setAdults] = useState(initialAdults)
  const [children, setChildren] = useState(initialChildren)

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
    // On pourrait aussi envoyer adults/children pour les sauver en base plus tard

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
        <span className="text-2xl font-bold text-gray-900">{formatPrice(price)}</span>
        <span className="text-gray-500">/ nuit</span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-6">
        {/* DATES */}
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

        {/* VOYAGEURS (Séparés) */}
        <div className="grid grid-cols-2 gap-2">
           <div className="flex flex-col">
             <label className="text-xs font-bold text-gray-500 uppercase mb-1">Adultes</label>
             <select 
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="block w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
             >
               {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
             </select>
           </div>
           <div className="flex flex-col">
             <label className="text-xs font-bold text-gray-500 uppercase mb-1">Enfants</label>
             <select 
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="block w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
             >
               {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
             </select>
           </div>
        </div>
      </div>

      {nights > 0 && (
        <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="underline">{formatPrice(price)} x {nights} nuits</span>
            <span>{formatPrice(totalRoomPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Frais de ménage</span>
            <span>{formatPrice(cleaningFee)}</span>
          </div>
          <div className="flex justify-between border-t pt-3 font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        disabled={isSubmitting || nights <= 0}
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