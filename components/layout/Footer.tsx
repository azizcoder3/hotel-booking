// components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">LuxeHotel</h3>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Une expérience inoubliable au cœur de la ville. Le confort moderne rencontre l&apos;élégance intemporelle.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/rooms" className="text-base text-gray-600 hover:text-indigo-600">
                  Nos Chambres
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-base text-gray-600 hover:text-indigo-600">
                  Mes Réservations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-600">123 Avenue des Champs-Élysées</li>
              <li className="text-base text-gray-600">Paris, France</li>
              <li className="text-base text-gray-600">+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} LuxeHotel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}