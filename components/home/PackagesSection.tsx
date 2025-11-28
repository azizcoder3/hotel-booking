'use client'

import { useState } from 'react'
import { Plus, Minus, Check, AlertCircle } from 'lucide-react'

// Les données des forfaits
const packages = [
  {
    id: 1,
    title: "Prépayé Intelligent (Smart Booking)",
    subtitle: "Payez maintenant, économisez gros.",
    description: "Soyez malin ! Bénéficiez d'une réduction exclusive en réglant votre réservation dès maintenant en ligne.",
    benefits: [
      "15 % de réduction immédiate sur le tarif flexible",
      "Petit-déjeuner buffet inclus",
      "Connexion Wi-Fi Premium haut débit"
    ],
    terms: [
      "Prépaiement de 100 % à la réservation",
      "Non modifiable, non remboursable",
      "Offre soumise à disponibilité"
    ],
    highlight: true // Pour mettre en avant ce pack
  },
  {
    id: 2,
    title: "Escapade Romantique",
    subtitle: "Le cadre parfait pour les amoureux.",
    description: "Surprenez votre moitié avec un séjour inoubliable comprenant des attentions particulières en chambre.",
    benefits: [
      "Surclassement en Chambre Vue Mer (selon disponibilité)",
      "Bouteille de Champagne & Chocolats à l'arrivée",
      "Petit-déjeuner au lit",
      "Départ tardif (Late Check-out) jusqu'à 14h00"
    ],
    terms: [
      "Annulation gratuite jusqu'à 48h avant l'arrivée",
      "Taxe de séjour non incluse"
    ],
    highlight: false
  },
  {
    id: 3,
    title: "Forfait Bien-être & Spa",
    subtitle: "Déconnectez du quotidien.",
    description: "Un séjour placé sous le signe de la relaxation avec un accès illimité à nos installations.",
    benefits: [
      "Accès illimité au Spa, Sauna et Hammam",
      "Un massage de 50 minutes par personne",
      "Thé détox offert après le soin",
      "Peignoirs et chaussons de luxe"
    ],
    terms: [
      "Réservation des soins requise à l'avance",
      "Annulation gratuite jusqu'à 24h avant l'arrivée"
    ],
    highlight: false
  },
  {
    id: 4,
    title: "Séjour Business Premium",
    subtitle: "Efficacité et confort pour vos déplacements.",
    description: "Tout ce dont vous avez besoin pour travailler sereinement et vous reposer.",
    benefits: [
      "Accès au Business Lounge (imprimante, café, snacks)",
      "Service de pressing (1 chemise offerte par jour)",
      "Navette aéroport aller-retour incluse",
      "Check-in express prioritaire"
    ],
    terms: [
      "Facture détaillée envoyée par email",
      "Annulation flexible (jusqu'à 18h le jour J)"
    ],
    highlight: false
  }
]

export default function PackagesSection() {
  // On stocke l'ID du panneau ouvert (par défaut le premier, ou null si tout fermé)
  const [openId, setOpenId] = useState<number | null>(1)

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Offres Spéciales</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Nos Forfaits Exclusifs</h2>
          <p className="mt-4 text-gray-600">Profitez de nos meilleures offres conçues pour rendre votre séjour unique.</p>
        </div>

        {/* Accordéon */}
        <div className="space-y-4">
          {packages.map((pack) => {
            const isOpen = openId === pack.id

            return (
              <div 
                key={pack.id} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-indigo-600 ring-1 ring-indigo-600 bg-gray-50' : 'border-gray-200 bg-white hover:border-indigo-300'
                }`}
              >
                {/* Header du Pack (Bouton cliquable) */}
                <button
                  onClick={() => toggle(pack.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div>
                    <h3 className={`text-xl font-bold ${isOpen ? 'text-indigo-900' : 'text-gray-900'}`}>
                      {pack.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{pack.subtitle}</p>
                  </div>
                  
                  {/* Icône Plus / Moins */}
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Contenu Déroulant (Animation CSS Grid) */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 border-t border-gray-200/50">
                      
                      {/* Description */}
                      <p className="text-gray-700 mb-6 mt-4">
                        {pack.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Liste des avantages */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                Ce pack comprend :
                            </h4>
                            <ul className="space-y-2">
                                {pack.benefits.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>{item}</span>
                                </li>
                                ))}
                            </ul>
                        </div>

                        {/* Conditions */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                <AlertCircle className="w-4 h-4 text-amber-500" />
                                Conditions & Validité
                            </h4>
                            <ul className="space-y-2">
                                {pack.terms.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                                    <span className="text-amber-500 mt-1">▶</span>
                                    <span>{item}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}