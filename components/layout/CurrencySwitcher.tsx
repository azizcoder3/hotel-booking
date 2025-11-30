'use client'

import { useCurrency, type Currency } from '@/components/providers/CurrencyContext'

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency()

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      className="bg-transparent border border-gray-200 rounded-md text-xs font-medium py-1 px-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
    >
      <option value="EUR">EUR (€)</option>
      <option value="USD">USD ($)</option>
      <option value="CAD">CAD ($)</option>
      
      {/* On sépare les deux zones pour la clarté */}
      <option value="XAF">XAF</option>
      <option value="XOF">XOF</option>
    </select>
  )
}