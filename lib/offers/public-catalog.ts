export const PUBLIC_OFFER_CODES = [
  "commerce_intelligent",
  "commerce_premium",
  "tpe_pme_croissance",
  "tpe_pme_performance",
  "startup_launch",
] as const;

export type PublicOfferCode = (typeof PUBLIC_OFFER_CODES)[number];

export type PublicDatabaseOffer = {
  code: PublicOfferCode;
  nom_offre: string;
  client_type: string;
  prix: number | string | null;
  prix_abonnement: number | string | null;
  is_active: boolean;
  created_at?: string | null;
};

export function isPublicOfferCode(code: string): code is PublicOfferCode {
  return PUBLIC_OFFER_CODES.some((publicCode) => publicCode === code);
}

export function formatDatabasePrice(
  value: number | string | null | undefined,
  period?: "month",
): string | null {
  if (value === null || value === undefined || value === "") return null;

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) return null;

  const amount = `${new Intl.NumberFormat("fr-FR").format(numericValue)} €`;
  return period === "month" ? `${amount} / mois` : amount;
}
