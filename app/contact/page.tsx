// app/contact/page.tsx
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* En-tête de page */}
      <div className="relative bg-gray-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
            {/* Une image de fond sombre ou une couleur unie */}
            <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Contactez-nous</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et préparer votre séjour.
            </p>
          </div>
        </div>
      </div>

      {/* Section Informations */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            
            {/* Colonne Gauche : Coordonnées */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Nos Coordonnées</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                N&apos;hésitez pas à nous contacter par téléphone ou par email. Nous vous répondrons dans les plus brefs délais.
              </p>

              <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                
                {/* Adresse */}
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Adresse</span>
                    <MapPin className="h-7 w-6 text-indigo-600" aria-hidden="true" />
                  </dt>
                  <dd>
                    1191 NW 60e rue<br />
                    Miami, Floride (FL), 33127<br />
                    États-Unis
                  </dd>
                </div>

                {/* Téléphone Hôtel */}
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Téléphone Hôtel</span>
                    <Phone className="h-7 w-6 text-indigo-600" aria-hidden="true" />
                  </dt>
                  <dd>
                    <strong>Hôtel :</strong> <a href="tel:+14806245200" className="hover:text-indigo-600">+1 (480) - 624 - 5200</a>
                  </dd>
                </div>

                {/* Téléphone Réservation */}
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Téléphone Réservation</span>
                    <Clock className="h-7 w-6 text-indigo-600" aria-hidden="true" />
                  </dt>
                  <dd>
                    <strong>Réservation :</strong> <a href="tel:+14806544400" className="hover:text-indigo-600">+1 (480) - 654 - 4400</a>
                  </dd>
                </div>

                {/* Email */}
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <Mail className="h-7 w-6 text-indigo-600" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a href="mailto:info@example.com" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      info@example.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Colonne Droite : Formulaire ou Map (Placeholder) */}
            <div className="rounded-2xl bg-gray-50 p-10 ring-1 ring-inset ring-gray-900/5">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h3>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
                        <input type="text" name="name" id="name" className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Votre nom" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <input type="email" name="email" id="email" className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="vous@exemple.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
                        <textarea name="message" id="message" rows={4} className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                    </div>
                    <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Envoyer le message
                    </button>
                </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}