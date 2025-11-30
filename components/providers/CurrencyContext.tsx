'use client'

import React, { createContext, useContext, useState } from 'react'

export type Currency = 'EUR' | 'XAF' | 'XOF' | 'USD' | 'CAD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (priceInEur: number) => string
  convertPrice: (priceInEur: number) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EUR')

  const RATES = {
    EUR: 1,
    USD: 1.08,
    CAD: 1.50,
    XAF: 655.957, // Afrique Centrale (BEAC)
    XOF: 655.957, // Afrique de l'Ouest (BCEAO)
  }

  const convertPrice = (priceInEur: number) => {
    return Math.round(priceInEur * RATES[currency])
  }

  const formatPrice = (priceInEur: number) => {
    const converted = convertPrice(priceInEur)
    
    // On laisse le formatage standard faire son travail.
    // Avec la locale 'fr-FR', cela affichera : "100 000 XAF" ou "50 000 XOF"
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}




// 'use client'

// import React, { createContext, useContext, useState } from 'react'

// export type Currency = 'EUR' | 'XAF' | 'USD' | 'CAD' // On prévoit le USD pour plus tard

// interface CurrencyContextType {
//   currency: Currency
//   setCurrency: (c: Currency) => void
//   formatPrice: (priceInEur: number) => string
//   convertPrice: (priceInEur: number) => number
// }

// const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// export function CurrencyProvider({ children }: { children: React.ReactNode }) {
//   const [currency, setCurrency] = useState<Currency>('EUR')

//   // Taux de conversion fixe (1 EUR = 655.957 XAF)
//   const RATES = {
//     EUR: 1,
//     XAF: 655.957,
//     USD: 1.08, // Exemple variable
//     CAD: 1.26, // Exemple variable
//   }

//   const convertPrice = (priceInEur: number) => {
//     return Math.round(priceInEur * RATES[currency])
//   }

//   const formatPrice = (priceInEur: number) => {
//     const converted = convertPrice(priceInEur)
    
//     // Formattage joli (ex: 100 000 FCFA)
//     return new Intl.NumberFormat('fr-FR', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(converted).replace('XAF', 'FCFA') // On remplace le code technique par le nom commun
//   }

//   return (
//     <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
//       {children}
//     </CurrencyContext.Provider>
//   )
// }

// // Hook personnalisé pour utiliser la devise facilement
// export function useCurrency() {
//   const context = useContext(CurrencyContext)
//   if (!context) {
//     throw new Error('useCurrency must be used within a CurrencyProvider')
//   }
//   return context
// }

// 'use client'

// import React, { createContext, useContext, useState } from 'react'

// // 1. AJOUTER 'XOF' DANS LE TYPE
// export type Currency = 'EUR' | 'XAF' | 'XOF' | 'USD' | 'CAD'

// interface CurrencyContextType {
//   currency: Currency
//   setCurrency: (c: Currency) => void
//   formatPrice: (priceInEur: number) => string
//   convertPrice: (priceInEur: number) => number
// }

// const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// export function CurrencyProvider({ children }: { children: React.ReactNode }) {
//   const [currency, setCurrency] = useState<Currency>('EUR')

//   // 2. AJOUTER LE TAUX POUR XOF (C'est le même que XAF)
//   const RATES = {
//     EUR: 1,
//     USD: 1.08,
//     CAD: 1.50,
//     XAF: 655.957, // Afrique Centrale (Congo, etc.)
//     XOF: 655.957, // Afrique de l'Ouest (Sénégal, CI, etc.)
//   }

//   const convertPrice = (priceInEur: number) => {
//     return Math.round(priceInEur * RATES[currency])
//   }

//   const formatPrice = (priceInEur: number) => {
//     const converted = convertPrice(priceInEur)
    
//     // 3. LOGIQUE D'AFFICHAGE
//     // On formate le nombre, puis on remplace le code technique par "FCFA" qui est compris partout
//     let formatted = new Intl.NumberFormat('fr-FR', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(converted)

//     // Petite astuce pour afficher "FCFA" que ce soit XAF ou XOF
//     if (currency === 'XAF' || currency === 'XOF') {
//       formatted = formatted
//         .replace('XAF', 'FCFA')
//         .replace('XOF', 'FCFA')
//     }

//     return formatted
//   }

//   return (
//     <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
//       {children}
//     </CurrencyContext.Provider>
//   )
// }

// export function useCurrency() {
//   const context = useContext(CurrencyContext)
//   if (!context) {
//     throw new Error('useCurrency must be used within a CurrencyProvider')
//   }
//   return context
// }