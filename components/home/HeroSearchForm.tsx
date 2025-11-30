'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { fr } from 'date-fns/locale'
import { addDays, format } from 'date-fns'
import { Calendar, Users, Search, Baby } from 'lucide-react' // J'ai ajouté l'icône Baby

import '@/components/rooms/datepicker-custom.css' 

export default function HeroSearchForm() {
  const router = useRouter()
  
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 1))
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0) // Maintenant utilisé !

  const handleSearch = () => {
    const startStr = startDate ? format(startDate, 'yyyy-MM-dd') : ''
    const endStr = endDate ? format(endDate, 'yyyy-MM-dd') : ''
    
    // On envoie tout dans l'URL
    router.push(`/rooms?start=${startStr}&end=${endStr}&adults=${adults}&children=${children}`)
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-1 md:p-2 flex flex-col md:flex-row gap-2 items-center transform translate-y-8 md:translate-y-16">
      
      {/* 1. DATES (Arrivée / Départ) */}
      <div className="flex-1 w-full flex flex-col sm:flex-row border-b md:border-b-0 md:border-r border-gray-100">
          <div className="flex-1 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Arrivée</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-500" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                locale={fr}
                dateFormat="dd MMM yyyy"
                className="w-full text-gray-900 font-semibold focus:outline-none cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-1 px-4 py-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Départ</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-500" />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ? addDays(startDate, 1) : new Date()}
                locale={fr}
                dateFormat="dd MMM yyyy"
                className="w-full text-gray-900 font-semibold focus:outline-none cursor-pointer"
              />
            </div>
          </div>
      </div>

      {/* 2. VOYAGEURS (Divisé en Adultes et Enfants) */}
      <div className="flex-1 w-full flex flex-row border-b md:border-b-0 md:border-r border-gray-100">
          {/* Adultes */}
          <div className="flex-1 px-4 py-2 border-r border-gray-100">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adultes</label>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-500" />
              <select 
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none cursor-pointer"
              >
                {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
          </div>

          {/* Enfants */}
          <div className="flex-1 px-4 py-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Enfants</label>
            <div className="flex items-center gap-2">
              <Baby className="h-4 w-4 text-indigo-500" />
              <select 
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none cursor-pointer"
              >
                {[0,1,2,3,4].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
          </div>
      </div>

      {/* 3. BOUTON ACTION */}
      <div className="w-full md:w-auto p-2">
        <button 
          onClick={handleSearch}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-md transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Search className="h-5 w-5" />
          <span className="uppercase text-sm tracking-wide">Vérifier</span>
        </button>
      </div>

    </div>
  )
}