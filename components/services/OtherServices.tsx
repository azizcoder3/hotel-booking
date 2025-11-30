//components/services/OtherServices.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { servicesData } from '@/lib/servicesData'

interface OtherServicesProps {
  currentServiceId: string // ex: 'restaurant'
}

export default function OtherServices({ currentServiceId }: OtherServicesProps) {
  // On filtre pour enlever le service actuel
  const otherServices = servicesData.filter(s => s.id !== currentServiceId)

  return (
    <div className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Poursuivre l&apos;expérience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherServices.map((service) => (
            <Link key={service.id} href={service.link} className="group block">
              <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                />
                <div className="absolute bottom-4 left-4">
                   <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-indigo-600 font-medium">
                <span>Explorer</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}