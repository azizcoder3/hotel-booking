'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { sendContactMessage } from '@/app/actions/contactActions'
import Image from 'next/image'

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    const result = await sendContactMessage(formData)
    setIsLoading(false)
    
    if (result?.success) {
      setIsSent(true)
    } else {
      alert("Une erreur est survenue. Veuillez réessayer.")
    }
  }

  return (
    <div className="bg-white">
      {/* En-tête Hero avec Image */}
      <div className="relative bg-gray-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
            {/* 1. L'IMAGE DE FOND */}
            <Image 
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2000&auto=format&fit=crop"
                alt="Réception Hôtel"
                fill
                className="object-cover"
                priority
            />
            {/* 2. LE FILTRE SOMBRE (Overlay) pour que le texte reste lisible */}
            <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Contactez-nous</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Une question ? Une envie particulière ? Notre équipe est à votre écoute pour organiser votre expérience parfaite.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            
            {/* Colonne Gauche : Coordonnées (Inchangé) */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Nos Coordonnées</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Venez nous rendre visite ou appelez-nous directement.
              </p>

              <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none"><MapPin className="h-7 w-6 text-indigo-600" /></dt>
                  <dd>1191 NW 60e rue<br />Miami, Floride (FL), 33127</dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none"><Phone className="h-7 w-6 text-indigo-600" /></dt>
                  <dd><strong>Hôtel :</strong> +1 (480) - 624 - 5200</dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none"><Mail className="h-7 w-6 text-indigo-600" /></dt>
                  <dd>info@luxehotel.com</dd>
                </div>
              </dl>
            </div>

            {/* Colonne Droite : Formulaire Interactif */}
            <div className="rounded-2xl bg-gray-50 p-10 ring-1 ring-inset ring-gray-900/5">
                
                {isSent ? (
                    // Message de succès
                    <div className="text-center py-10">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                            <Send className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Message envoyé !</h3>
                        <p className="mt-2 text-gray-600">
                            Merci de nous avoir contactés. Vous allez recevoir un email de confirmation d&apos;ici quelques instants.
                        </p>
                        <button onClick={() => setIsSent(false)} className="mt-6 text-indigo-600 hover:text-indigo-500 text-sm font-semibold">
                            Envoyer un autre message
                        </button>
                    </div>
                ) : (
                    // Le Formulaire
                    <>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h3>
                        <form action={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
                                <input type="text" name="name" id="name" required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Votre nom" />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <input type="email" name="email" id="email" required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="vous@exemple.com" />
                            </div>

                            {/* Sélecteur de Sujet */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">Sujet de la demande</label>
                                <select id="subject" name="subject" className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option>Renseignement général</option>
                                    <option>🍽️ Réservation Restaurant</option>
                                    <option>🎉 Privatisation / Salle de Fête</option>
                                    <option>💆 Spa & Bien-être</option>
                                    <option>💼 Conférence & Séminaire</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
                                <textarea name="message" id="message" rows={4} required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Détaillez votre demande (date, nombre de personnes, etc.)"></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-400 transition-colors"
                            >
                                {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>
                        </form>
                    </>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}




// // app/contact/page.tsx
// import { MapPin, Phone, Mail } from 'lucide-react'

// // On récupère les paramètres de l'URL (ex: ?subject=restaurant)
// export default async function ContactPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ subject?: string }>
// }) {
//   const { subject } = await searchParams

//   // On détermine la valeur par défaut du select
//   let defaultSubject = "general"
//   if (subject === 'restaurant') defaultSubject = "restaurant"
//   if (subject === 'conference') defaultSubject = "conference"
//   if (subject === 'event') defaultSubject = "event"
//   if (subject === 'wellness') defaultSubject = "wellness"

//   return (
//     <div className="bg-white">
//       {/* En-tête de page */}
//       <div className="relative bg-gray-900 py-24 sm:py-32">
//         <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute inset-0 bg-gray-900/90" />
//         </div>
//         <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:mx-0">
//             <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Contactez-nous</h2>
//             <p className="mt-6 text-lg leading-8 text-gray-300">
//               Une question ? Une demande spécifique ? Notre équipe vous répond sous 24h.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
//           <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            
//             {/* Colonne Gauche : Coordonnées (Inchangé) */}
//             <div>
//               <h3 className="text-2xl font-bold tracking-tight text-gray-900">Nos Coordonnées</h3>
//               <p className="mt-4 text-base leading-7 text-gray-600">
//                 Vous préférez le téléphone ? Appelez-nous directement pour une réponse immédiate.
//               </p>

//               <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
//                 <div className="flex gap-x-4">
//                   <dt className="flex-none">
//                     <span className="sr-only">Adresse</span>
//                     <MapPin className="h-7 w-6 text-indigo-600" aria-hidden="true" />
//                   </dt>
//                   <dd>1191 NW 60e rue, Miami, FL 33127, USA</dd>
//                 </div>
//                 <div className="flex gap-x-4">
//                   <dt className="flex-none">
//                     <span className="sr-only">Téléphone</span>
//                     <Phone className="h-7 w-6 text-indigo-600" aria-hidden="true" />
//                   </dt>
//                   <dd>
//                     <p>Hôtel : +1 (480) 624-5200</p>
//                     <p>Restaurant : +1 (480) 624-5201</p>
//                   </dd>
//                 </div>
//                 <div className="flex gap-x-4">
//                   <dt className="flex-none">
//                     <span className="sr-only">Email</span>
//                     <Mail className="h-7 w-6 text-indigo-600" aria-hidden="true" />
//                   </dt>
//                   <dd>
//                     <a href="mailto:vitalgapene@gmail.com" className="hover:text-indigo-600">info@luxehotel.com</a>
//                   </dd>
//                 </div>
//               </dl>
//             </div>

//             {/* Colonne Droite : Formulaire Intelligent */}
//             <div className="rounded-2xl bg-gray-50 p-10 ring-1 ring-inset ring-gray-900/5">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h3>
//                 <form className="space-y-4">
                    
//                     {/* NOUVEAU : Champ Sujet Pré-rempli */}
//                     <div>
//                         <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">Sujet de la demande</label>
//                         <select 
//                           id="subject" 
//                           name="subject" 
//                           defaultValue={defaultSubject}
//                           className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         >
//                           <option value="general">Renseignement général</option>
//                           <option value="restaurant">🍽️ Réservation Restaurant</option>
//                           <option value="conference">💼 Devis Conférence / Séminaire</option>
//                           <option value="event">💍 Mariage & Événement</option>
//                           <option value="wellness">💆 Soin Spa</option>
//                         </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                           <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
//                           <input type="text" name="name" id="name" className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                       </div>
//                       <div>
//                           <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Téléphone</label>
//                           <input type="tel" name="phone" id="phone" className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                       </div>
//                     </div>

//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
//                         <input type="email" name="email" id="email" className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//                     </div>

//                     <div>
//                         <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
//                           {/* Le label change selon le sujet pour guider l'utilisateur */}
//                           {defaultSubject === 'restaurant' ? 'Date, heure et nombre de personnes :' : 
//                            defaultSubject === 'conference' ? 'Date, nombre de participants et besoins :' : 
//                            'Votre message :'}
//                         </label>
//                         <textarea name="message" id="message" rows={4} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
//                     </div>

//                     <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
//                         Envoyer la demande
//                     </button>
//                 </form>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }