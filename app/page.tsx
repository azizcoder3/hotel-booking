//
import Link from "next/link";
import Image from "next/image";
import { Star, Wifi, Coffee, MapPin, ArrowRight } from "lucide-react";
import ServicesSlider from "@/components/home/ServicesSlider";
import PackagesSection from "@/components/home/PackagesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION (Grande image d'accueil) */}
      <section className="relative h-[85vh] flex items-center justify-center">
        {/* Image de fond assombrie */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
            alt="Vue magnifique de l'hôtel"
            fill
            className="object-cover brightness-[0.60]" // brightness assombrit l'image pour lire le texte
            priority
          />
        </div>

        {/* Contenu Texte */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Bienvenue au paradis
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            L&apos;élégance ultime au cœur de <br />
            <span className="text-indigo-400">Miami</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Découvrez un havre de paix où le luxe rencontre le confort. Profitez d&apos;une expérience inoubliable avec nos services 5 étoiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Voir les chambres
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30 font-semibold rounded-full transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* 2. NOS ATOUTS (Features) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Tout pour votre confort</h2>
            <p className="mt-4 text-gray-600">Nous avons pensé à chaque détail pour rendre votre séjour parfait.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Atout 1 */}
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wifi className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wi-Fi Haut Débit</h3>
              <p className="text-gray-500">Restez connecté partout dans l&apos;hôtel avec notre fibre optique gratuite.</p>
            </div>

            {/* Atout 2 */}
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Petit-déjeuner Inclus</h3>
              <p className="text-gray-500">Commencez la journée avec notre buffet continental varié et frais.</p>
            </div>

            {/* Atout 3 */}
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emplacement Idéal</h3>
              <p className="text-gray-500">Situé en plein centre, à 5 minutes de la plage et des commerces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APERÇU DES CHAMBRES (Preview) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Nos Chambres Favorites</h2>
              <p className="mt-2 text-gray-600">Choisissez l&apos;hébergement qui vous correspond.</p>
            </div>
            <Link href="/rooms" className="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-500">
              Voir tout le catalogue <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Carte Chambre 1 (Static pour l'instant) */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"
                  alt="Suite Deluxe"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Suite Deluxe</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500 ml-1">4.9 (120 avis)</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-indigo-600">250€<span className="text-sm text-gray-500 font-normal">/nuit</span></span>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  Une suite spacieuse avec vue sur l&apos;océan, lit King Size et salle de bain en marbre.
                </p>
                <Link href="/rooms" className="block w-full py-3 text-center border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">
                  Réserver
                </Link>
              </div>
            </div>

            {/* Carte Chambre 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
                  alt="Chambre Double"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Chambre Double</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500 ml-1">4.7 (85 avis)</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-indigo-600">140€<span className="text-sm text-gray-500 font-normal">/nuit</span></span>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  Parfaite pour les couples, avec tout le confort nécessaire et un balcon privé.
                </p>
                <Link href="/rooms" className="block w-full py-3 text-center border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">
                  Réserver
                </Link>
              </div>
            </div>

            {/* Carte Chambre 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop"
                  alt="Penthouse"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Penthouse</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500 ml-1">5.0 (24 avis)</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-indigo-600">550€<span className="text-sm text-gray-500 font-normal">/nuit</span></span>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  L&apos;expérience ultime. Dernier étage, terrasse panoramique et jacuzzi privé.
                </p>
                <Link href="/rooms" className="block w-full py-3 text-center border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">
                  Réserver
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/rooms" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-500">
              Voir tout le catalogue <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

        {/* 3. NOUVELLE SECTION : SLIDER SERVICES */}
      <section>
        <div className="text-center bg-gray-900 pt-16 pb-4 px-4">
            <h2 className="text-3xl font-bold text-white">Nos Expériences Uniques</h2>
            <p className="mt-4 text-indigo-300 max-w-2xl mx-auto">Plus qu&apos;un simple hôtel, découvrez un monde de services conçus pour votre plaisir.</p>
        </div>
        <ServicesSlider />
      </section>

      <section>
        <PackagesSection />
      </section>

        

    </div>
  );
}