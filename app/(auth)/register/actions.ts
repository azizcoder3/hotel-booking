'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  // 1. Création du compte dans Supabase Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // On passe le nom complet dans les métadonnées pour que le Trigger SQL (qu'on a fait au début) l'utilise
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    return redirect('/register?error=Erreur lors de l\'inscription. Vérifiez vos informations.')
  }

  // 2. Si succès, on redirige
  // Note : Selon ta config Supabase, l'utilisateur devra peut-être confirmer son email.
  // Pour le MVP, on assume que "Auto Confirm" est activé dans Supabase.
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}