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

const EMAIL_COLORS = {
  background: "#f7f4ef",
  card: "#ffffff",
  cardSoft: "#fbfaf7",
  border: "#e7ded2",
  text: "#171717",
  title: "#111111",
  paragraph: "#444444",
  muted: "#777777",
  navy: "#020817",
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
    <div style="margin:0;padding:0;background:${EMAIL_COLORS.background};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_COLORS.text};">
      <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
        <div style="background:${EMAIL_COLORS.card};border:1px solid ${EMAIL_COLORS.border};border-radius:24px;padding:32px;box-shadow:0 18px 45px rgba(15,23,42,0.06);">
          
          <img
            src="${logoUrl}"
            alt="OL - OptimalLogic"
            width="56"
            style="display:block;width:56px;height:auto;margin:0 0 18px 0;border-radius:16px;"
          />

          <p style="margin:0 0 10px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${EMAIL_COLORS.muted};font-weight:600;">
            OptimalLogic
          </p>

          <h1 style="margin:0 0 22px;font-size:28px;line-height:1.25;color:${EMAIL_COLORS.title};font-weight:700;">
            ${escapeHtml(title)}
          </h1>

          ${content}

          <p style="margin:30px 0 0;font-size:14px;line-height:1.7;color:#555555;">
            À très bientôt,<br />
            L’équipe OptimalLogic
          </p>
        </div>

        <p style="margin:18px 0 0;text-align:center;font-size:12px;line-height:1.6;color:${EMAIL_COLORS.muted};">
          Cet email fait suite à une demande effectuée sur le site OptimalLogic.
        </p>
      </div>
    </div>
  `;
}

export function buildClientImmediateEmail(
  params: BaseMailParams
): EmailTemplate {
  const firstName = params.firstName.trim();
  const subject = getClientSubject(params.requestSource);

  const html = buildEmailShell({
    title: `Bonjour ${firstName},`,
    content: `
      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:${EMAIL_COLORS.paragraph};">
        Nous avons bien reçu votre demande et nous vous remercions pour votre intérêt envers OptimalLogic.
      </p>

      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:${EMAIL_COLORS.paragraph};">
        Notre équipe va prendre le temps d’analyser les informations transmises afin de mieux comprendre votre besoin et de vous proposer une réponse adaptée.
      </p>

      <p style="margin:0;font-size:16px;line-height:1.7;color:${EMAIL_COLORS.paragraph};">
        Nous reviendrons vers vous prochainement avec les prochaines étapes.
      </p>
    `,
  });

  const text = `Bonjour ${firstName},

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
    title: "Nouvelle demande reçue",
    content: `
      <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:${EMAIL_COLORS.paragraph};">
        Une nouvelle demande a été enregistrée depuis le site OptimalLogic.
      </p>

      <div style="background:${EMAIL_COLORS.cardSoft};border:1px solid ${EMAIL_COLORS.border};border-radius:18px;padding:18px;">
        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Provenance :</strong> ${escapeHtml(
            sourceLabel
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Type de client :</strong> ${escapeHtml(
            typeClientLabel
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Nom :</strong> ${escapeHtml(
            fullName
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Email :</strong> ${escapeHtml(
            params.email
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Téléphone :</strong> ${escapeHtml(
            params.phone
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Entreprise :</strong> ${escapeHtml(
            params.company
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Ville :</strong> ${escapeHtml(
            params.businessCity
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Offre demandée :</strong> ${escapeHtml(
            params.offerName || params.offerCode || "Non renseignée"
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Objectif :</strong> ${escapeHtml(
            params.objective
          )}
        </p>

        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">Message :</strong><br />
          ${escapeHtml(params.message)}
        </p>

        <p style="margin:0;font-size:14px;line-height:1.6;color:${EMAIL_COLORS.paragraph};">
          <strong style="color:${EMAIL_COLORS.title};">ID demande :</strong> ${escapeHtml(
            params.demandeId
          )}
        </p>
      </div>

      <p style="margin:18px 0 0;font-size:16px;line-height:1.7;color:${EMAIL_COLORS.paragraph};">
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