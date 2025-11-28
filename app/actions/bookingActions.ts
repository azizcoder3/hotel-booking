'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { differenceInDays } from 'date-fns'

export async function createBooking(formData: FormData) {
  const supabase = await createClient()

  // 1. Vérifier l'Auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    // Si pas connecté, on renvoie une erreur spécifique
    return { error: "not_authenticated" }
  }

  // 2. Récupérer les données
  const roomId = formData.get('roomId') as string
  const startDateStr = formData.get('startDate') as string
  const endDateStr = formData.get('endDate') as string
  const pricePerNight = Number(formData.get('pricePerNight'))

  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  // 3. Validations de base
  if (startDate >= endDate) {
    return { error: "La date de départ doit être après la date d'arrivée." }
  }
  
  const today = new Date()
  today.setHours(0,0,0,0)
  if (startDate < today) {
    return { error: "Vous ne pouvez pas réserver dans le passé." }
  }

  // 4. Calcul du prix total (Sécurité : on recule côté serveur)
  const nights = differenceInDays(endDate, startDate)
  const totalPrice = nights * pricePerNight

  // 5. VÉRIFICATION DE DISPONIBILITÉ (Crucial)
  // On cherche s'il existe une réservation qui chevauche les dates demandées
  const { data: conflicts, error: conflictError } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .neq('status', 'cancelled') // On ignore les annulées
    .or(`and(start_date.lte.${endDateStr},end_date.gte.${startDateStr})`)

  if (conflictError) {
    console.error(conflictError)
    return { error: "Erreur lors de la vérification des disponibilités." }
  }

  if (conflicts && conflicts.length > 0) {
    return { error: "Désolé, cette chambre n'est plus disponible à ces dates." }
  }

  // 6. Création de la réservation
  const { error: insertError } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      room_id: roomId,
      start_date: startDateStr,
      end_date: endDateStr,
      total_price: totalPrice,
      status: 'confirmed' // Pour l'instant on confirme direct (pas de paiement)
    })

  if (insertError) {
    console.error(insertError)
    return { error: "Impossible de créer la réservation." }
  }

  // 7. Succès !
  revalidatePath('/dashboard')
  return { success: true }
}