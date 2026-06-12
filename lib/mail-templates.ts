export type RequestSource = "contact" | "tarifs" | "prise_de_rdv";
export type TypeClient = "commerce" | "tpe_pme" | "startup" | "autre";

type BaseMailParams = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  businessCity?: string | null;
  typeClient?: TypeClient | null;
  requestSource: RequestSource;
  offerName?: string | null;
  offerCode?: string | null;
  objective?: string | null;
  message?: string | null;
  demandeId?: string | null;
};

type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string | null | undefined) {
  if (!value) return "";

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

function getLogoUrl() {
  return `${getSiteUrl()}/ol-logo-black.png`;
}

function getSourceLabel(source: RequestSource) {
  switch (source) {
    case "contact":
      return "Contact";
    case "tarifs":
      return "Tarifs";
    case "prise_de_rdv":
      return "Prise de rendez-vous";
  }
}

function getTypeClientLabel(typeClient: TypeClient | null | undefined) {
  switch (typeClient) {
    case "commerce":
      return "Commerce local";
    case "tpe_pme":
      return "TPE / PME";
    case "startup":
      return "Startup";
    case "autre":
      return "Autre";
    default:
      return "Non renseigné";
  }
}

function getClientSubject(source: RequestSource) {
  switch (source) {
    case "contact":
      return "Nous avons bien reçu votre demande";
    case "tarifs":
      return "Nous avons bien reçu votre demande d’offre";
    case "prise_de_rdv":
      return "Votre demande de rendez-vous a bien été prise en compte";
  }
}

function buildEmailShell({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const logoUrl = getLogoUrl();

  return `
    <div style="margin:0;padding:0;background:#f7f4ef;font-family:Arial,Helvetica,sans-serif;color:#171717;">
      <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
        <div style="background:#ffffff;border:1px solid #e8e2d8;border-radius:24px;padding:32px;">
          <img
            src="${logoUrl}"
            alt="OL - OptimalLogic"
            style="display:block;width:56px;height:auto;margin:0 0 18px 0;"
          />

          <p style="margin:0 0 10px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#777;">
            OptimalLogic
          </p>

          <h1 style="margin:0 0 20px;font-size:28px;line-height:1.2;color:#111;">
            ${escapeHtml(title)}
          </h1>

          ${content}

          <p style="margin:28px 0 0;font-size:14px;line-height:1.7;color:#555;">
            À très bientôt,<br />
            L’équipe OptimalLogic
          </p>
        </div>

        <p style="margin:18px 0 0;text-align:center;font-size:12px;color:#777;">
          Cet email fait suite à une demande effectuée sur le site OptimalLogic.
        </p>
      </div>
    </div>
  `;
}

export function buildClientImmediateEmail(
  params: BaseMailParams
): EmailTemplate {
  const firstName = escapeHtml(params.firstName);
  const subject = getClientSubject(params.requestSource);

  const html = buildEmailShell({
    title: `Bonjour ${firstName},`,
    content: `
      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#444;">
        Nous avons bien reçu votre demande et nous vous remercions pour votre intérêt envers OptimalLogic.
      </p>

      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#444;">
        Notre équipe va prendre le temps d’analyser les informations transmises afin de mieux comprendre votre besoin et de vous proposer une réponse adaptée.
      </p>

      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#444;">
        Nous reviendrons vers vous prochainement avec les prochaines étapes.
      </p>
    `,
  });

  const text = `Bonjour ${params.firstName},

Nous avons bien reçu votre demande et nous vous remercions pour votre intérêt envers OptimalLogic.

Notre équipe va prendre le temps d’analyser les informations transmises afin de mieux comprendre votre besoin et de vous proposer une réponse adaptée.

Nous reviendrons vers vous prochainement avec les prochaines étapes.

À très bientôt,
L’équipe OptimalLogic`;

  return {
    subject,
    html,
    text,
  };
}

export function buildAdminImmediateEmail(
  params: BaseMailParams
): EmailTemplate {
  const sourceLabel = getSourceLabel(params.requestSource);
  const typeClientLabel = getTypeClientLabel(params.typeClient);
  const fullName = `${params.firstName} ${params.lastName}`.trim();

  const subject = `[OptimalLogic] Nouvelle demande - ${sourceLabel}`;

  const html = buildEmailShell({
    title: `Nouvelle demande reçue`,
    content: `
      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#444;">
        Une nouvelle demande a été enregistrée depuis le site OptimalLogic.
      </p>

      <div style="background:#f7f4ef;border-radius:18px;padding:18px;">
        <p style="margin:0 0 10px;"><strong>Provenance :</strong> ${escapeHtml(
          sourceLabel
        )}</p>
        <p style="margin:0 0 10px;"><strong>Type de client :</strong> ${escapeHtml(
          typeClientLabel
        )}</p>
        <p style="margin:0 0 10px;"><strong>Nom :</strong> ${escapeHtml(
          fullName
        )}</p>
        <p style="margin:0 0 10px;"><strong>Email :</strong> ${escapeHtml(
          params.email
        )}</p>
        <p style="margin:0 0 10px;"><strong>Téléphone :</strong> ${escapeHtml(
          params.phone
        )}</p>
        <p style="margin:0 0 10px;"><strong>Entreprise :</strong> ${escapeHtml(
          params.company
        )}</p>
        <p style="margin:0 0 10px;"><strong>Ville :</strong> ${escapeHtml(
          params.businessCity
        )}</p>
        <p style="margin:0 0 10px;"><strong>Offre demandée :</strong> ${escapeHtml(
          params.offerName || params.offerCode || "Non renseignée"
        )}</p>
        <p style="margin:0 0 10px;"><strong>Objectif :</strong> ${escapeHtml(
          params.objective
        )}</p>
        <p style="margin:0 0 10px;"><strong>Message :</strong><br />${escapeHtml(
          params.message
        )}</p>
        <p style="margin:0;"><strong>ID demande :</strong> ${escapeHtml(
          params.demandeId
        )}</p>
      </div>

      <p style="margin:18px 0 0;font-size:16px;line-height:1.7;color:#444;">
        Action recommandée : traiter la demande dans l’espace de suivi et revenir vers le prospect.
      </p>
    `,
  });

  const text = `Nouvelle demande reçue depuis le site OptimalLogic.

Provenance : ${sourceLabel}
Type de client : ${typeClientLabel}
Nom : ${fullName}
Email : ${params.email}
Téléphone : ${params.phone || ""}
Entreprise : ${params.company || ""}
Ville : ${params.businessCity || ""}
Offre demandée : ${params.offerName || params.offerCode || "Non renseignée"}
Objectif : ${params.objective || ""}
Message : ${params.message || ""}
ID demande : ${params.demandeId || ""}

Action recommandée : traiter la demande dans l’espace de suivi et revenir vers le prospect.`;

  return {
    subject,
    html,
    text,
  };
}