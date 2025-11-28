'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addReview(formData: FormData) {
  const supabase = await createClient()

  // 1. Vérifier si l'utilisateur est connecté
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Vous devez être connecté pour laisser un avis." }
  }

  // 2. Récupérer les données du formulaire
  const roomId = formData.get('roomId') as string
  const rating = parseInt(formData.get('rating') as string)
  const comment = formData.get('comment') as string

  // 3. Validation simple
  if (!rating || rating < 1 || rating > 5) {
    return { error: "La note doit être entre 1 et 5 étoiles." }
  }
  if (!comment || comment.trim().length < 5) {
    return { error: "Votre commentaire est trop court." }
  }

  // 4. Insertion en base
  const { error } = await supabase
    .from('reviews')
    .insert({
      room_id: roomId,
      user_id: user.id,
      rating: rating,
      comment: comment
    })

  if (error) {
    console.error(error)
    return { error: "Erreur lors de l'enregistrement de l'avis." }
  }

  // 5. Rafraîchir la page pour afficher le nouvel avis
  revalidatePath(`/rooms`) 
  return { success: true }
}