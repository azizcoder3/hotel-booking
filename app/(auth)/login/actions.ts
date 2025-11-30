'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // On récupère ce que l'utilisateur a tapé
  let inputLogin = formData.get('email') as string
  const password = formData.get('password') as string

  // --- L'ASTUCE MAGIQUE ---
  // Si l'utilisateur a écrit "admin" (en minuscules ou majuscules), 
  // on remplace par ton email administrateur.
  if (inputLogin.trim().toLowerCase() === 'admin') {
    inputLogin = 'vitalgapene@gmail.com' // <--- TON EMAIL ADMIN ICI
  }
  // ------------------------

  // 1. Tenter la connexion avec l'email (le vrai ou le remplacé)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: inputLogin,
    password,
  })

  if (error) {
    return redirect('/login?error=Identifiants incorrects')
  }

  // 2. Vérification du rôle (Code existant)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  revalidatePath('/', 'layout')

  // 3. Redirection Intelligente
  if (profile?.role === 'admin') {
    redirect('/admin')
  } else {
    redirect('/dashboard')
  }
}



// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'

// export async function login(formData: FormData) {
//   const supabase = await createClient()

//   const email = formData.get('email') as string
//   const password = formData.get('password') as string

//   // 1. Tenter la connexion
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })

//   if (error) {
//     return redirect('/login?error=Could not authenticate user')
//   }

//   // 2. Si connecté, on va chercher le RÔLE dans la table profiles
//   // (C'est l'étape qui manquait !)
//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', data.user.id)
//     .single()

//   revalidatePath('/', 'layout')

//   // 3. Redirection Intelligente
//   if (profile?.role === 'admin') {
//     redirect('/admin')      // 👑 Direction le tableau de bord Admin
//   } else {
//     redirect('/dashboard')  // 👤 Direction l'espace Client
//   }
// }