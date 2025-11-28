'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface RoomGalleryProps {
  images: { url: string; caption?: string }[]
}

export default function RoomGallery({ images }: RoomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Si aucune image n'est fournie, on met un placeholder
  const safeImages = images.length > 0 ? images : [{ url: '/placeholder.jpg', caption: 'Aperçu' }]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1))
  }

  return (
    <div className="space-y-4">
      {/* Grande Image Principale */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-200 shadow-md group">
        <Image
          src={safeImages[currentIndex].url}
          alt={safeImages[currentIndex].caption || "Photo chambre"}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          priority
        />
        
        {/* Flèches de navigation (apparaissent au survol) */}
        {safeImages.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Caption */}
        {safeImages[currentIndex].caption && (
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                {safeImages[currentIndex].caption}
            </div>
        )}
      </div>

      {/* Miniatures (Thumbnails) */}
      {safeImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                idx === currentIndex ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt="Miniature"
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}