import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  // Vérifier si une session existe
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  
  // Redirection vers la page de login après déconnexion
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}