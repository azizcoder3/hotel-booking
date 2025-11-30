'use client'
import { useCurrency } from '@/components/providers/CurrencyContext'

export default function PriceDisplay({ amount }: { amount: number }) {
  const { formatPrice } = useCurrency()
  return <>{formatPrice(amount)}</>
}