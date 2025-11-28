// components/home/ServicesSlider.tsx
'use client'

import { useState, useEffect, useCallback } from 'react' // J'ai ajouté useCallback
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Les données restent en dehors du composant (c'est très bien pour la performance)
const slides = [
  {
    id: 1,
    title: "Gastronomie Raffinée",
    subtitle: "Éveillez vos papilles",
    description: "Une cuisine locale et internationale préparée par nos chefs étoilés dans un cadre somptueux.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    link: "/services/restaurant",
    buttonText: "Découvrir le Restaurant"
  },
  {
    id: 2,
    title: "Bien-être & Spa",
    subtitle: "Détente absolue",
    description: "Oubliez le stress du quotidien. Massages, sauna et soins du visage pour une régénération totale.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
    link: "/services/wellness",
    buttonText: "Explorer le Spa"
  },
  {
    id: 3,
    title: "Piscine Infinity",
    subtitle: "Plongez dans le bleu",
    description: "Profitez de notre piscine chauffée avec vue panoramique sur la ville et cocktail bar intégré.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
    link: "/services/pool",
    buttonText: "Voir la Piscine"
  },
  {
    id: 4,
    title: "Conférences & Business",
    subtitle: "Travaillez avec style",
    description: "Des espaces modulables tout équipés pour vos réunions, séminaires et événements d'entreprise.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop",
    link: "/services/conference",
    buttonText: "Nos Salles"
  },
  {
    id: 5,
    title: "Mariages & Banquets",
    subtitle: "Des moments inoubliables",
    description: "Célébrez vos plus beaux événements dans notre salle de bal luxueuse pouvant accueillir 300 convives.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    link: "/services/events",
    buttonText: "Organiser un événement"
  }
]

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0)

  // CORRECTION ICI : On définit nextSlide AVANT de l'utiliser
  // On utilise useCallback pour éviter que la fonction ne soit recréée à chaque rendu
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Changement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    
    // Nettoyage du timer si on quitte la page
    return () => clearInterval(timer)
  }, [nextSlide]) // nextSlide est maintenant reconnu comme dépendance valide

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      
      {/* Les Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image de fond */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-50"
              priority={index === 0}
            />
          </div>

          {/* Contenu Texte */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div className={`transition-all duration-700 delay-300 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="block text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2">
                {slide.subtitle}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                {slide.description}
              </p>
              <Link
                href={slide.link}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 transition-colors shadow-lg"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Boutons de navigation (Flèches) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
        aria-label="Précédent"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
        aria-label="Suivant"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Indicateurs (petits points en bas) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}