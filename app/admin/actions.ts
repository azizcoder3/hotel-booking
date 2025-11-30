'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export async function updateStatus(formData: FormData) {
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const id = formData.get('id')
  const newStatus = formData.get('status')
  const type = formData.get('type')

  console.log(`⚡ Admin Update : ${type} -> ${newStatus} pour ID ${id}`)

  if (type === 'booking_status') {
    await supabaseAdmin.from('bookings').update({ status: newStatus }).eq('id', id)
  } else {
    await supabaseAdmin.from('bookings').update({ payment_status: newStatus }).eq('id', id)
  }
  
  revalidatePath('/admin')
}