'use client'

import { useState, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { fr } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar-override.css'

// Configuration de la langue française
const locales = {
  'fr': fr,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface BookingInput {
  id: string
  start_date: string
  end_date: string
  status: string
  rooms: { name: string } | null
  profiles: { full_name: string | null } | null
}

interface BookingEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource: string
  status: string
}

export default function AdminCalendar({ bookings }: { bookings: BookingInput[] }) {
  // --- ÉTATS AJOUTÉS POUR RENDRE LES BOUTONS ACTIFS ---
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>(Views.MONTH)

  // Fonction pour gérer le changement de date (Aujourd'hui, Suivant, Précédent)
  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])

  // Fonction pour gérer le changement de vue (Mois, Semaine, Planning)
  const onView = useCallback((newView: View) => setView(newView), [setView])
  // ----------------------------------------------------

  // Transformation des données
  const events: BookingEvent[] = bookings.map((b) => {
    // Petit correctif : react-big-calendar arrête l'event à 00:00.
    // Pour que la barre aille jusqu'au bout du jour de fin, on peut ajouter 23h59 ou laisser tel quel.
    // Ici on laisse tel quel car c'est souvent plus clair pour les nuitées.
    return {
      id: b.id,
      title: `${b.profiles?.full_name || 'Client'} - ${b.rooms?.name}`,
      start: new Date(b.start_date),
      end: new Date(b.end_date), 
      resource: b.rooms?.name || 'Chambre inconnue',
      status: b.status
    }
  })

  const eventPropGetter = (event: BookingEvent) => {
    let backgroundColor = '#4f46e5' // Indigo
    if (event.status === 'cancelled') backgroundColor = '#ef4444' // Rouge
    if (event.status === 'pending') backgroundColor = '#eab308' // Jaune
    return { style: { 
        backgroundColor,
        color: 'white',
        display: 'block'
    } }
  }

  return (
    <div className="h-[600px] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <Calendar
        localizer={localizer}
        events={events}
        
        // --- PROPS AJOUTÉES POUR LA NAVIGATION ---
        date={date}
        onNavigate={onNavigate}
        view={view}
        onView={onView}
        // -----------------------------------------

        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        culture="fr"
        views={['month', 'week', 'agenda']} // Les vues disponibles
        eventPropGetter={eventPropGetter}
        messages={{
          allDay: "Toute la journée",
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Planning",
          date: "Date",
          time: "Heure",
          event: "Réservation",
          noEventsInRange: "Aucune réservation sur cette période."
        }}
      />
    </div>
  )
}


// 'use client'

// import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
// import { format, parse, startOfWeek, getDay } from 'date-fns'
// import { fr } from 'date-fns/locale'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import './calendar-override.css'

// // Configuration de la langue française
// const locales = {
//   'fr': fr,
// }

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })

// // Ce que le calendrier attend (Events)
// interface BookingEvent {
//   id: string
//   title: string
//   start: Date
//   end: Date
//   resource: string
//   status: string
// }

// // Ce qu'on reçoit de Supabase (Booking Input)
// // C'est ça qui remplace le "any" !
// interface BookingInput {
//   id: string
//   start_date: string
//   end_date: string
//   status: string
//   rooms: { name: string } | null
//   profiles: { full_name: string | null } | null
// }

// export default function AdminCalendar({ bookings }: { bookings: BookingInput[] }) {
  
//   // 1. Transformer les données Supabase en format Calendrier
//   const events: BookingEvent[] = bookings.map((b) => ({
//     id: b.id,
//     title: `${b.profiles?.full_name || 'Client'} - ${b.rooms?.name}`,
//     start: new Date(b.start_date),
//     end: new Date(b.end_date),
//     resource: b.rooms?.name || 'Chambre inconnue',
//     status: b.status
//   }))

//   // 2. Personnalisation de l'apparence des événements (couleurs)
//   const eventPropGetter = (event: BookingEvent) => {
//     let backgroundColor = '#4f46e5' // Indigo (défaut)

//     if (event.status === 'cancelled') backgroundColor = '#ef4444' // Rouge
//     if (event.status === 'pending') backgroundColor = '#eab308' // Jaune

//     return { style: { backgroundColor } }
//   }

//   return (
//     <div className="h-[600px] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//         culture="fr"
//         views={['month', 'week', 'agenda']}
//         defaultView='month'
//         eventPropGetter={eventPropGetter}
//         messages={{
//           next: "Suivant",
//           previous: "Précédent",
//           today: "Aujourd'hui",
//           month: "Mois",
//           week: "Semaine",
//           day: "Jour",
//           agenda: "Planning",
//           date: "Date",
//           time: "Heure",
//           event: "Réservation",
//           noEventsInRange: "Aucune réservation sur cette période."
//         }}
//       />
//     </div>
//   )
// }