// middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // On délègue la logique à une fonction helper pour garder ce fichier propre
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Appliquer le middleware sur toutes les routes sauf fichiers statiques, images, etc.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}