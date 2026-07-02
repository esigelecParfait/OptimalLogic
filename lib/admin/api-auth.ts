import { createHash, timingSafeEqual } from "crypto";

/**
 * Comparaison de secrets à temps constant (anti timing-attack).
 * On hash les deux valeurs pour éviter aussi la fuite de longueur.
 */
function timingSafeEqualStr(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Vérifie le header `x-admin-secret` contre ADMIN_SECRET.
 * Fail-closed : renvoie false si ADMIN_SECRET n'est pas défini côté serveur.
 */
export function verifyAdminSecret(request: Request): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  const provided = request.headers.get("x-admin-secret");
  if (!provided) return false;
  return timingSafeEqualStr(provided, expected);
}

/**
 * Vérifie le header `Authorization: Bearer <CRON_SECRET>` (Vercel Cron).
 * Fail-closed : renvoie false si CRON_SECRET n'est pas défini (évite le
 * contournement trivial via "Bearer undefined").
 */
export function verifyCronSecret(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const provided = request.headers.get("authorization");
  if (!provided) return false;
  return timingSafeEqualStr(provided, `Bearer ${expected}`);
}
