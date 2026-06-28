/**
 * Google Business Profile API
 *
 * Variables d'environnement requises :
 *   GOOGLE_CLIENT_ID       → OAuth 2.0 client ID (Google Cloud Console)
 *   GOOGLE_CLIENT_SECRET   → OAuth 2.0 client secret
 *   GOOGLE_REFRESH_TOKEN   → Token obtenu lors de l'autorisation initiale
 *
 * Pour obtenir le GOOGLE_REFRESH_TOKEN la première fois :
 *   1. Aller sur https://console.cloud.google.com → activer "Business Profile API"
 *   2. Créer des identifiants OAuth 2.0 (type "Web application")
 *   3. Ajouter l'URL de redirection : http://localhost:3000/api/admin/google-auth/callback
 *   4. Aller sur /api/admin/google-auth pour lancer le flow
 *   5. Copier le refresh_token reçu dans les variables d'environnement Vercel
 */

const TOKEN_URL  = "https://oauth2.googleapis.com/token";
const PERF_API   = "https://businessprofileperformance.googleapis.com/v1";
const REVIEW_API = "https://mybusiness.googleapis.com/v4";

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function getGoogleAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type:    "refresh_token",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Échec token Google: ${err}`);
  }

  const { access_token } = await res.json();
  if (!access_token) throw new Error("access_token absent de la réponse Google");
  return access_token;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type GBPMetrics = {
  nb_vues_google:  number;
  nb_clics_google: number;
  nb_avis_google:  number;
  note_google:     number | null;
};

// ── Performance (vues + clics) ────────────────────────────────────────────────

export async function fetchLocationPerformance(
  locationName: string, // format : "locations/12345678901234567"
  startDate: { year: number; month: number; day: number },
  endDate:   { year: number; month: number; day: number },
  token: string
): Promise<{ vues: number; clics: number }> {

  const params = new URLSearchParams({
    "dailyMetrics":                           "BUSINESS_IMPRESSIONS_DESKTOP_MAPS",
    "dailyRange.start_date.year":             String(startDate.year),
    "dailyRange.start_date.month":            String(startDate.month),
    "dailyRange.start_date.day":              String(startDate.day),
    "dailyRange.end_date.year":               String(endDate.year),
    "dailyRange.end_date.month":              String(endDate.month),
    "dailyRange.end_date.day":                String(endDate.day),
  });

  // Deux appels : vues (impressions) et clics
  const [vuesRes, clicsRes] = await Promise.all([
    fetch(`${PERF_API}/${locationName}:getDailyMetricsTimeSeries?${params}&dailyMetrics=BUSINESS_IMPRESSIONS_DESKTOP_MAPS&dailyMetrics=BUSINESS_IMPRESSIONS_MOBILE_MAPS`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${PERF_API}/${locationName}:getDailyMetricsTimeSeries?${params}&dailyMetrics=WEBSITE_CLICKS&dailyMetrics=CALL_CLICKS`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  const sumTimeSeries = (data: Record<string, unknown>): number => {
    if (!data?.timeSeries) return 0;
    const series = (data.timeSeries as { dailyValues?: { value?: number }[] }[]);
    return series.reduce((total: number, s) => {
      return total + (s.dailyValues ?? []).reduce((sum: number, v) => sum + (v.value ?? 0), 0);
    }, 0);
  };

  const vuesData  = vuesRes.ok  ? await vuesRes.json()  : {};
  const clicsData = clicsRes.ok ? await clicsRes.json() : {};

  return {
    vues:  sumTimeSeries(vuesData),
    clics: sumTimeSeries(clicsData),
  };
}

// ── Avis + note ───────────────────────────────────────────────────────────────

export async function fetchLocationReviews(
  locationName: string, // format : "accounts/123/locations/456"
  token: string
): Promise<{ count: number; rating: number | null }> {

  const res = await fetch(`${REVIEW_API}/${locationName}/reviews?pageSize=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return { count: 0, rating: null };

  const data = await res.json();
  return {
    count:  data.totalReviewCount  ?? 0,
    rating: data.averageRating     ?? null,
  };
}

// ── Fonction principale : toutes les métriques d'une semaine ──────────────────

export async function fetchWeeklyGBPMetrics(
  locationName: string,        // "locations/12345678901234567"
  accountLocationName: string, // "accounts/123/locations/456"  (pour les avis)
  weekStart: Date
): Promise<GBPMetrics> {

  const token = await getGoogleAccessToken();

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const toDateParts = (d: Date) => ({
    year:  d.getFullYear(),
    month: d.getMonth() + 1,
    day:   d.getDate(),
  });

  const [perf, reviews] = await Promise.all([
    fetchLocationPerformance(locationName, toDateParts(weekStart), toDateParts(weekEnd), token),
    fetchLocationReviews(accountLocationName, token),
  ]);

  return {
    nb_vues_google:  perf.vues,
    nb_clics_google: perf.clics,
    nb_avis_google:  reviews.count,
    note_google:     reviews.rating,
  };
}
