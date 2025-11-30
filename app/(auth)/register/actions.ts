'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string // <--- NOUVEAU

  // 1. Création du compte Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        // On ne passe pas le phone ici car le trigger copie souvent juste le full_name
        // On va le mettre à jour manuellement juste après
      },
    },
  })

  if (error) {
    return redirect('/register?error=Erreur lors de l\'inscription.')
  }

  // 2. Mise à jour immédiate du profil avec le téléphone
  if (data.user) {
    await supabase
      .from('profiles')
      .update({ 
        phone: phone,
        full_name: fullName // On force aussi le nom pour être sûr
      })
      .eq('id', data.user.id)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}


// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'

// export async function signup(formData: FormData) {
//   const supabase = await createClient()

//   const email = formData.get('email') as string
//   const password = formData.get('password') as string
//   const fullName = formData.get('fullName') as string

//   // 1. Création du compte dans Supabase Auth
//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       // On passe le nom complet dans les métadonnées pour que le Trigger SQL (qu'on a fait au début) l'utilise
//       data: {
//         full_name: fullName,
//       },
//     },
//   })

//   if (error) {
//     return redirect('/register?error=Erreur lors de l\'inscription. Vérifiez vos informations.')
//   }

//   // 2. Si succès, on redirige
//   // Note : Selon ta config Supabase, l'utilisateur devra peut-être confirmer son email.
//   // Pour le MVP, on assume que "Auto Confirm" est activé dans Supabase.
//   revalidatePath('/', 'layout')
//   redirect('/dashboard')
// }