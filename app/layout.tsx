// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // On utilise une police Google propre
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeHotel - Réservation de chambres",
  description: "Réservez votre séjour de rêve dans notre hôtel de luxe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        {/* Le Header sera visible sur toutes les pages */}
        <Header />
        
        {/* Le contenu de la page (ex: login, accueil) s'affiche ici */}
        <main className="flex-1">
          {children}
        </main>

        {/* Le Footer sera visible sur toutes les pages */}
        <Footer />
      </body>
    </html>
  )
}