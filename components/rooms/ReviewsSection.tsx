// components/rooms/ReviewsSection.tsx
'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { addReview } from '@/app/actions/reviewActions'

// 1. On définit proprement la structure d'un avis
interface Review {
  id: string
  rating: number
  comment: string
  created_at: string
  // Profiles peut être null si l'user a été supprimé, ou un objet/tableau selon la requête
  profiles: { full_name: string | null } | { full_name: string | null }[] | null
}

// 2. On utilise cette interface pour les props du composant
interface ReviewsSectionProps {
  roomId: string
  reviews: Review[]
}

// 3. On applique l'interface ici ": ReviewsSectionProps"
export default function ReviewsSection({ roomId, reviews }: ReviewsSectionProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calcul de la moyenne
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : "N/A"

  // Helper pour récupérer le nom de manière sécurisée (car Supabase peut renvoyer un tableau ou un objet)
  const getUserName = (review: Review) => {
    if (!review.profiles) return 'Voyageur inconnu'
    
    const profileData = Array.isArray(review.profiles) ? review.profiles[0] : review.profiles
    return profileData?.full_name || 'Voyageur inconnu'
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    formData.append('rating', selectedRating.toString())
    formData.append('roomId', roomId)
    
    await addReview(formData)
    setIsSubmitting(false)
    setSelectedRating(0)
    // Astuce pour recharger la page et voir l'avis
    window.location.reload()
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-10">
      
      {/* En-tête avec Moyenne */}
      <div className="flex items-center justify-between mb-8 border-b pb-6">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Avis voyageurs</h2>
           <p className="text-gray-500 text-sm mt-1">Ce que nos clients pensent de ce logement</p>
        </div>
        <div className="text-right">
           <div className="text-3xl font-bold text-indigo-600 flex items-center gap-2 justify-end">
             {averageRating} <Star className="h-6 w-6 fill-indigo-600 text-indigo-600" />
           </div>
           <p className="text-sm text-gray-400">{reviews.length} avis vérifiés</p>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-8 mb-12">
        {reviews.length === 0 ? (
            <p className="text-gray-500 italic">Aucun avis pour le moment. Soyez le premier !</p>
        ) : (
            reviews.map((review) => {
                const userName = getUserName(review)
                // On vérifie si c'est un utilisateur inconnu
                const isUnknown = userName === 'Voyageur inconnu'

                return (
                <div key={review.id} className="flex gap-4">
                    <div className="shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            {/* SI inconnu : on affiche l'icône User, SINON : la première lettre */}
                            {isUnknown ? <User className="h-5 w-5" /> : userName[0].toUpperCase()}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                                {userName}
                            </span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">
                            {new Date(review.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {review.comment}
                        </p>
                    </div>
                </div>
                )
            })
        )}
        </div>

      {/* Formulaire d'ajout */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Laisser un avis</h3>
        <form action={handleSubmit} className="space-y-4">
            
            {/* Sélection Étoiles */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Votre note</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setSelectedRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star 
                                className={`h-8 w-8 ${
                                    star <= (hoverRating || selectedRating) 
                                    ? 'fill-amber-400 text-amber-400' 
                                    : 'text-gray-300'
                                }`} 
                            />
                        </button>
                    ))}
                </div>
                <input type="hidden" name="rating" value={selectedRating} required />
            </div>

            {/* Commentaire */}
            <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Votre commentaire</label>
                <textarea 
                    name="comment" 
                    rows={3}
                    placeholder="Qu'avez-vous pensé de votre séjour ?"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
                    required
                ></textarea>
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting || selectedRating === 0}
                className="w-full sm:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {isSubmitting ? 'Envoi...' : 'Publier mon avis'}
            </button>
        </form>
      </div>

    </div>
  )
}