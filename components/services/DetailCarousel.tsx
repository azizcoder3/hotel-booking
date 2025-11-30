//components/services/DetailCarousel.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface DetailCarouselProps {
  images: string[] // Liste des URLs des images
}

export default function DetailCarousel({ images }: DetailCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // On veut afficher 2 images à la fois sur Desktop, 1 sur Mobile
  // Logique pour boucler
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header avec Flèches de navigation centrées ou écartées */}
        <div className="flex justify-between items-end mb-8">
           <div>
             <h3 className="text-2xl font-bold text-gray-900">En images</h3>
             <p className="text-gray-500">Découvrez l&apos;atmosphère des lieux</p>
           </div>
           
           <div className="flex gap-4">
             <button 
                onClick={prevSlide}
                className="p-3 rounded-full border border-gray-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
             >
                <ArrowLeft className="h-5 w-5" />
             </button>
             <button 
                onClick={nextSlide}
                className="p-3 rounded-full border border-gray-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
             >
                <ArrowRight className="h-5 w-5" />
             </button>
           </div>
        </div>

        {/* Le Slider */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Simple translate pour l'instant
          >
             {/* Note: Pour un vrai effet "infini" parfait, il faudrait dupliquer les images, 
                 mais pour un MVP ce système simple fonctionne bien si on clique doucement */}
             {images.map((src, idx) => (
               <div key={idx} className="min-w-full md:min-w-[calc(50%-12px)] relative h-80 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={src}
                    alt={`Détail ${idx}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  )
}