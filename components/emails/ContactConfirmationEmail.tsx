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

interface ContactConfirmationEmailProps {
  clientName: string;
  subject: string; // Ex: "Réservation Restaurant" ou "Salle de Fête"
  messageCopy: string; // On rappelle ce qu'il a écrit
  baseUrl?: string;
}

export const ContactConfirmationEmail = ({
  clientName,
  subject,
  messageCopy,
  baseUrl = "https://hotel-booking-aziz.vercel.app", // Mets ton URL Vercel ici
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nous avons bien reçu votre demande - LuxeHotel</Preview>
    <Body style={main}>
      <Container style={container}>
        
        {/* Logo */}
        <Section style={logoSection}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="220"
            height="auto"
            alt="LuxeHotel"
            style={logoImage}
          />
        </Section>
        
        <Heading style={h1}>Demande reçue !</Heading>
        
        <Text style={text}>
          Bonjour <strong>{clientName}</strong>,
        </Text>
        
        <Text style={text}>
          Merci d&apos;avoir contacté l&apos;équipe de LuxeHotel. Nous avons bien pris en compte votre demande concernant :
        </Text>

        <Section style={highlightBox}>
          <Text style={subjectText}><strong>Sujet :</strong> {subject}</Text>
        </Section>

        <Text style={text}>
          Notre équipe examine votre demande et reviendra vers vous sous <strong>24 heures</strong> pour confirmer la disponibilité ou établir un devis.
        </Text>

        <Hr style={hr} />

        <Text style={label}>Rappel de votre message :</Text>
        <Text style={messageContent}>&quot;{messageCopy}&quot;</Text>

        <Hr style={hr} />
        
        <Text style={footer}>
          LuxeHotel Service Client<br />
          +33 1 23 45 67 89
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactConfirmationEmail;

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

const logoSection = {
  marginTop: "30px",
  marginBottom: "30px",
  textAlign: "center" as const,
};

const logoImage = {
  margin: "0 auto",
  display: "block",
  maxWidth: "100%",
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
  padding: "0 20px",
};

const highlightBox = {
  backgroundColor: "#e0e7ff", // Indigo très clair
  padding: "15px",
  margin: "20px",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const subjectText = {
  color: "#4338ca", // Indigo foncé
  fontSize: "18px",
  fontWeight: "bold",
  margin: 0,
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "0 20px",
  marginTop: "20px",
};

const messageContent = {
  color: "#666",
  fontSize: "14px",
  fontStyle: "italic",
  padding: "0 20px",
  lineHeight: "20px",
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