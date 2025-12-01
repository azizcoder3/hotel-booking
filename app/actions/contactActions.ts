'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import ContactConfirmationEmail from '@/components/emails/ContactConfirmationEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'azizcoder3.0@gmail.com' // J'ai remplacé mon email admin vitalgapene@gmail.com par azizcoder3.0@gmail.com pour des tests, apress je remet mon vrai email

export async function sendContactMessage(formData: FormData) {
  // Ici, on utilise 'supabase', donc l'avertissement va disparaître !
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    // 1. SAUVEGARDE EN BASE DE DONNÉES (Sécurité)
    const { error: dbError } = await supabase
      .from('messages')
      .insert({
        name,
        email,
        subject,
        message,
        status: 'unread'
      })

    if (dbError) {
      console.error("Erreur lors de la sauvegarde en base :", dbError)
      // On continue quand même pour essayer d'envoyer l'email
    }

    // 2. ENVOI DES EMAILS (Resend)
    
    // A. Au Client
    await resend.emails.send({
      from: 'LuxeHotel <onboarding@resend.dev>',
      to: ['azizcoder3.0@gmail.com'], // j'ai remplacé le mot email sans '' par azizcoder3.0@gmail.com pour des tests, donc il remettre le mot email sans '' apres les tests quand on achetera le domaine
      subject: `Réception de votre demande : ${subject}`,
      react: ContactConfirmationEmail({
        clientName: name,
        subject: subject,
        messageCopy: message,
        baseUrl: 'https://hotel-booking-pi-azure.vercel.app'
      }),
    })

    // B. À l'Admin (Toi)
    await resend.emails.send({
      from: 'LuxeHotel System <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `🔔 Nouveau Message : ${subject}`,
      html: `
        <h1>Nouveau message reçu du site</h1>
        <p><strong>De :</strong> ${name} (${email})</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><em>Sauvegardé en base de données.</em></p>
      `
    })
    
    return { success: true }

  } catch (error) {
    console.error("Erreur générale :", error)
    return { error: "Erreur lors de l'envoi." }
  }
}