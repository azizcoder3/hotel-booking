// 'use server'

// import { createClient } from '@/lib/supabase/server'
// import { revalidatePath } from 'next/cache'
// import { differenceInDays } from 'date-fns'

// export async function createBooking(formData: FormData) {
//   const supabase = await createClient()

//   // 1. Vérifier l'Auth
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) {
//     // Si pas connecté, on renvoie une erreur spécifique
//     return { error: "not_authenticated" }
//   }

//   // 2. Récupérer les données
//   const roomId = formData.get('roomId') as string
//   const startDateStr = formData.get('startDate') as string
//   const endDateStr = formData.get('endDate') as string
//   const pricePerNight = Number(formData.get('pricePerNight'))

//   const startDate = new Date(startDateStr)
//   const endDate = new Date(endDateStr)

//   // 3. Validations de base
//   if (startDate >= endDate) {
//     return { error: "La date de départ doit être après la date d'arrivée." }
//   }
  
//   const today = new Date()
//   today.setHours(0,0,0,0)
//   if (startDate < today) {
//     return { error: "Vous ne pouvez pas réserver dans le passé." }
//   }

//   // 4. Calcul du prix total (Sécurité : on recule côté serveur)
//   const nights = differenceInDays(endDate, startDate)
//   const totalPrice = nights * pricePerNight

//   // 5. VÉRIFICATION DE DISPONIBILITÉ (Crucial)
//   // On cherche s'il existe une réservation qui chevauche les dates demandées
//   const { data: conflicts, error: conflictError } = await supabase
//     .from('bookings')
//     .select('id')
//     .eq('room_id', roomId)
//     .neq('status', 'cancelled') // On ignore les annulées
//     .or(`and(start_date.lte.${endDateStr},end_date.gte.${startDateStr})`)

//   if (conflictError) {
//     console.error(conflictError)
//     return { error: "Erreur lors de la vérification des disponibilités." }
//   }

//   if (conflicts && conflicts.length > 0) {
//     return { error: "Désolé, cette chambre n'est plus disponible à ces dates." }
//   }

//   // 6. Création de la réservation
//   const { error: insertError } = await supabase
//     .from('bookings')
//     .insert({
//       user_id: user.id,
//       room_id: roomId,
//       start_date: startDateStr,
//       end_date: endDateStr,
//       total_price: totalPrice,
//       status: 'confirmed' // Pour l'instant on confirme direct (pas de paiement)
//     })

//   if (insertError) {
//     console.error(insertError)
//     return { error: "Impossible de créer la réservation." }
//   }

//   // 7. Succès !
//   revalidatePath('/dashboard')
//   return { success: true }
// }


'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { differenceInDays, format } from 'date-fns' // Assure-toi d'avoir importé format
import { fr } from 'date-fns/locale' // Pour formater la date en français

// 1. Nouveaux imports pour l'email
import { Resend } from 'resend'
import BookingConfirmationEmail from '@/components/emails/BookingConfirmationEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function createBooking(formData: FormData) {
  const supabase = await createClient()

  // ... (Code existant: Vérification Auth, Récupération Données, Validations) ...
  // Je remets juste les variables dont on a besoin pour la suite
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "not_authenticated" }

  const roomId = formData.get('roomId') as string
  const startDateStr = formData.get('startDate') as string
  const endDateStr = formData.get('endDate') as string
  const pricePerNight = Number(formData.get('pricePerNight'))
  
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  const nights = differenceInDays(endDate, startDate)
  const totalPrice = nights * pricePerNight

  // ... (Code existant: Vérification Disponibilité) ...

  // 6. Création de la réservation
  const { data: booking, error: insertError } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      room_id: roomId,
      start_date: startDateStr,
      end_date: endDateStr,
      total_price: totalPrice,
      status: 'confirmed',
      payment_status: 'pay_on_arrival'
    })
    .select() // IMPORTANT : On ajoute .select() pour récupérer l'ID créé
    .single()

  if (insertError) {
    console.error(insertError)
    return { error: "Impossible de créer la réservation." }
  }

  // ============================================================
  // 7. ENVOI DE L'EMAIL (NOUVEAU CODE)
  // ============================================================
  try {
    // a. Récupérer les infos manquantes (Email du client et Nom de la chambre)
    // On a déjà l'email de l'user connecté via supabase.auth.getUser() -> user.email
    
    // Il nous faut le nom de la chambre
    const { data: room } = await supabase
      .from('rooms')
      .select('name')
      .eq('id', roomId)
      .single()

    // Il nous faut le nom du client (depuis le profil)
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    const customerEmail = user.email
    const customerName = profile?.full_name || "Cher Client"
    const roomName = room?.name || "Chambre LuxeHotel"

    // b. Envoi via Resend
    if (customerEmail) {
      await resend.emails.send({
        from: 'LuxeHotel <onboarding@resend.dev>', // Email par défaut obligatoire en test
        to: [customerEmail], // Envoi à l'email du client (doit être le tien en mode test !)
        subject: 'Confirmation de votre réservation - LuxeHotel',
        react: BookingConfirmationEmail({
          customerName: customerName,
          roomName: roomName,
          startDate: format(startDate, 'dd MMMM yyyy', { locale: fr }),
          endDate: format(endDate, 'dd MMMM yyyy', { locale: fr }),
          totalPrice: totalPrice,
          bookingId: booking.id.slice(0, 8).toUpperCase() // Un petit ID court
        }),
      })
      console.log("📧 Email envoyé avec succès à", customerEmail)
    }

  } catch (emailError) {
    // On ne bloque pas la réservation si l'email échoue, on log juste l'erreur
    console.error("❌ Erreur envoi email:", emailError)
  }
  // ============================================================

  // 8. Succès !
  revalidatePath('/dashboard')
  return { success: true }
}

// --- NOUVELLE FONCTION : ANNULATION ---
export async function cancelBooking(bookingId: string) {
  const supabase = await createClient()

  // 1. Vérif Auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Non connecté" }

  // 2. Vérifier que la réservation appartient bien à l'utilisateur
  // et qu'elle n'est pas déjà annulée
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('status, start_date')
    .eq('id', bookingId)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !booking) {
    return { error: "Réservation introuvable." }
  }

  if (booking.status === 'cancelled') {
    return { error: "Cette réservation est déjà annulée." }
  }

  // 3. Règle métier : Annulation possible jusqu'à 48h avant ?
  // Pour le MVP, on autorise tout, mais on pourrait bloquer ici.

  // 4. Mettre à jour le statut
  const { error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' }) // On passe en annulé
    .eq('id', bookingId)

  if (updateError) {
    return { error: "Erreur lors de l'annulation." }
  }

  // NOTE SUR LE REMBOURSEMENT :
  // Comme tu n'as pas de système de paiement en ligne (Stripe), le remboursement est "Manuel".
  // Si le statut était "paid", tu verras dans ton admin que la réservation est "Annulée" mais "Payé".
  // C'est à toi (Admin) de rembourser le client par virement/espèces.
  // Tu pourras ensuite passer le statut paiement à "unpaid" ou "refunded" via Supabase.

  revalidatePath('/dashboard')
  return { success: true }
}