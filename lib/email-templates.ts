type QuoteEmailData = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  selectedOffer?: string;
  projectType?: string;
  message?: string;
};

export function clientQuoteConfirmationTemplate(data: QuoteEmailData) {
  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2>Votre demande a bien été reçue</h2>

      <p>Bonjour ${fullName || ""},</p>

      <p>
        Merci pour votre demande. Nous avons bien reçu vos informations concernant
        ${data.selectedOffer ? `<strong>${data.selectedOffer}</strong>` : "votre projet"}.
      </p>

      <p>
        Notre équipe va analyser votre besoin et revenir vers vous rapidement avec une réponse adaptée.
      </p>

      <div style="margin-top: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
        <p><strong>Offre demandée :</strong> ${data.selectedOffer || "Non précisée"}</p>
        <p><strong>Type de projet :</strong> ${data.projectType || "Non précisé"}</p>
        <p><strong>Entreprise :</strong> ${data.companyName || "Non précisée"}</p>
      </div>

      <p style="margin-top: 24px;">
        Cordialement,<br />
        <strong>L’équipe OptimalLogic</strong>
      </p>
    </div>
  `;
}

export function adminQuoteNotificationTemplate(data: QuoteEmailData) {
  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2>Nouvelle demande tarif reçue</h2>

      <p>Une nouvelle demande vient d’être envoyée depuis la page Tarifs.</p>

      <div style="margin-top: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
        <p><strong>Nom :</strong> ${fullName || "Non renseigné"}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
        <p><strong>Entreprise :</strong> ${data.companyName || "Non renseignée"}</p>
        <p><strong>Offre choisie :</strong> ${data.selectedOffer || "Non précisée"}</p>
        <p><strong>Type de projet :</strong> ${data.projectType || "Non précisé"}</p>
      </div>

      <div style="margin-top: 24px;">
        <h3>Message du client</h3>
        <p>${data.message || "Aucun message."}</p>
      </div>

      <p style="margin-top: 24px;">
        À traiter dans l’espace administrateur.
      </p>
    </div>
  `;
}