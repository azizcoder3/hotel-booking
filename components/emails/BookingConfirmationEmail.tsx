import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BookingConfirmationEmailProps {
  customerName: string;
  roomName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  bookingId: string;
  // On ajoute baseUrl ici pour pouvoir passer l'URL du site
  baseUrl?: string; 
}

export const BookingConfirmationEmail = ({
  customerName,
  roomName,
  startDate,
  endDate,
  totalPrice,
  bookingId,
  // Valeur par défaut si non fournie (à remplacer par ton vrai domaine Vercel plus tard)
  baseUrl = "https://ton-projet-vercel.app", 
}: BookingConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Votre réservation chez LuxeHotel est confirmée !</Preview>
    <Body style={main}>
      <Container style={container}>
        
        {/* --- LOGO IMAGE --- */}
        <Section style={logoSection}>
          <Img
            src={`${baseUrl}/logo.png`} // Cela va chercher public/logo.png
            width="150"
            height="50"
            alt="LuxeHotel"
            style={logoImage}
          />
        </Section>
        {/* ------------------ */}
        
        <Heading style={h1}>Réservation Confirmée</Heading>
        
        <Text style={text}>
          Bonjour <strong>{customerName}</strong>,
        </Text>
        
        <Text style={text}>
          Nous sommes ravis de vous confirmer votre séjour chez nous. Voici les détails de votre réservation :
        </Text>

        <Section style={box}>
          <Text style={paragraph}><strong>Chambre :</strong> {roomName}</Text>
          <Text style={paragraph}><strong>Arrivée :</strong> {startDate}</Text>
          <Text style={paragraph}><strong>Départ :</strong> {endDate}</Text>
          <Text style={paragraph}><strong>Prix total :</strong> {totalPrice}€</Text>
          <Text style={paragraph}><strong>N° de référence :</strong> {bookingId}</Text>
        </Section>

        <Text style={text}>
          Le paiement se fera sur place à votre arrivée. Si vous avez des questions, n&apos;hésitez pas à répondre à cet email.
        </Text>

        <Hr style={hr} />
        
        <Text style={footer}>
          LuxeHotel - 123 Avenue des Champs-Élysées, Paris<br />
          Ceci est un email automatique.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default BookingConfirmationEmail;

// --- STYLES CSS ---

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  marginTop: "20px",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  maxWidth: "600px",
  width: "100%",
};

// Style du conteneur du logo
const logoSection = {
  marginTop: "30px",
  marginBottom: "30px",
  textAlign: "center" as const,
};

// Style de l'image elle-même (centrage)
const logoImage = {
  margin: "0 auto",
  display: "block",
  objectFit: "contain" as const,
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  padding: "0 20px", // Marges réduites pour éviter le débordement
};

const box = {
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "4px",
  margin: "24px 20px", // Marges réduites ici aussi
  border: "1px solid #e5e7eb",
};

const paragraph = {
  margin: "10px 0",
  fontSize: "15px",
  color: "#333",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};