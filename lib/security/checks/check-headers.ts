import { preventSsrf } from "@/lib/security/authorization/prevent-ssrf";
import { calculateSecurityScore } from "@/lib/security/scoring/calculate-score";
import type { SecurityCheckResult } from "@/lib/security/types/audit";
import type { SecurityFinding } from "@/lib/security/types/finding";

const CHECK_NAME = "security_headers";
const USER_AGENT = "OptimalLogic-Security-Audit/1.0";
const TIMEOUT_MS = 8000;
const MAX_REDIRECTS = 3;

interface HeaderSnapshot {
  url: string;
  headers: Headers;
}

function finding(
  checkId: string,
  status: SecurityFinding["status"],
  severity: SecurityFinding["severity"],
  title: string,
  evidence: string,
  impact: string,
  recommendation: string
): SecurityFinding {
  return {
    checkId,
    category: "HEADERS",
    status,
    severity,
    title,
    evidence,
    impact,
    recommendation,
  };
}

function hasFrameAncestors(csp: string | null): boolean {
  return Boolean(csp?.toLowerCase().split(";").some((part) => part.trim().startsWith("frame-ancestors")));
}

function evaluateCsp(csp: string | null): SecurityFinding {
  if (!csp?.trim()) {
    return finding(
      "headers.csp",
      "fail",
      "high",
      "Content-Security-Policy absent",
      "Header Content-Security-Policy absent.",
      "Le navigateur ne recoit pas de politique explicite limitant les sources de scripts, styles et contenus.",
      "Definir une CSP adaptee au site, au minimum avec default-src et des sources explicites."
    );
  }

  const normalized = csp.toLowerCase();
  const weak =
    normalized.includes("default-src *") ||
    normalized.includes("script-src *") ||
    normalized.includes("'unsafe-inline'") ||
    normalized.includes("'unsafe-eval'");

  if (weak) {
    return finding(
      "headers.csp",
      "warning",
      "medium",
      "Content-Security-Policy potentiellement permissive",
      `Header Content-Security-Policy present: ${csp.slice(0, 180)}`,
      "Une CSP trop permissive reduit fortement sa capacite a limiter les injections de contenu.",
      "Durcir progressivement la CSP en supprimant les jokers et directives dangereuses quand cela est possible."
    );
  }

  return finding(
    "headers.csp",
    "pass",
    "info",
    "Content-Security-Policy presente",
    "Header Content-Security-Policy present avec une valeur non vide et sans motif permissif evident.",
    "La CSP contribue a limiter certaines injections cote navigateur.",
    "Maintenir la CSP et la verifier manuellement apres chaque changement applicatif."
  );
}

function evaluateHsts(hsts: string | null): SecurityFinding {
  if (!hsts?.trim()) {
    return finding(
      "headers.hsts",
      "fail",
      "medium",
      "Strict-Transport-Security absent",
      "Header Strict-Transport-Security absent.",
      "Les navigateurs ne sont pas explicitement invites a forcer HTTPS pour les visites futures.",
      "Ajouter Strict-Transport-Security avec max-age suffisant apres validation HTTPS complete."
    );
  }

  const maxAgeMatch = /max-age=(\d+)/i.exec(hsts);
  const maxAge = maxAgeMatch ? Number(maxAgeMatch[1]) : 0;
  if (maxAge < 15552000) {
    return finding(
      "headers.hsts",
      "warning",
      "low",
      "Strict-Transport-Security faible",
      `Header Strict-Transport-Security present: ${hsts}`,
      "Un max-age faible ou absent limite la protection contre les retours accidentels en HTTP.",
      "Utiliser un max-age d'au moins 15552000 secondes, puis evaluer includeSubDomains et preload."
    );
  }

  return finding(
    "headers.hsts",
    "pass",
    "info",
    "Strict-Transport-Security present",
    `Header Strict-Transport-Security present: ${hsts}`,
    "Les navigateurs compatibles peuvent memoriser l'obligation HTTPS.",
    "Verifier manuellement l'opportunite de includeSubDomains et preload selon le perimetre."
  );
}

function evaluateNoSniff(value: string | null): SecurityFinding {
  if (value?.toLowerCase() === "nosniff") {
    return finding(
      "headers.x_content_type_options",
      "pass",
      "info",
      "X-Content-Type-Options correct",
      "Header X-Content-Type-Options: nosniff.",
      "Le navigateur est invite a respecter le type MIME annonce.",
      "Conserver cette configuration."
    );
  }

  return finding(
    "headers.x_content_type_options",
    "fail",
    "medium",
    "X-Content-Type-Options absent ou incorrect",
    value ? `Valeur recue: ${value}` : "Header X-Content-Type-Options absent.",
    "L'absence de nosniff peut faciliter certaines interpretations MIME dangereuses.",
    "Configurer X-Content-Type-Options avec la valeur nosniff."
  );
}

function evaluateReferrerPolicy(value: string | null): SecurityFinding {
  const accepted = new Set([
    "no-referrer",
    "same-origin",
    "strict-origin",
    "strict-origin-when-cross-origin",
  ]);

  if (!value) {
    return finding(
      "headers.referrer_policy",
      "warning",
      "low",
      "Referrer-Policy absent",
      "Header Referrer-Policy absent.",
      "Des URLs internes peuvent etre transmises comme referer a des destinations externes.",
      "Configurer une politique explicite, par exemple strict-origin-when-cross-origin."
    );
  }

  if (!accepted.has(value.toLowerCase())) {
    return finding(
      "headers.referrer_policy",
      "warning",
      "low",
      "Referrer-Policy a verifier",
      `Header Referrer-Policy present: ${value}`,
      "La politique peut etre trop permissive selon les pages et les donnees manipulees.",
      "Verifier manuellement que la politique limite suffisamment les informations transmises."
    );
  }

  return finding(
    "headers.referrer_policy",
    "pass",
    "info",
    "Referrer-Policy presente",
    `Header Referrer-Policy present: ${value}`,
    "La transmission du referer est encadree par une politique explicite.",
    "Conserver une politique coherente avec les besoins analytics et confidentialite."
  );
}

function evaluatePermissionsPolicy(value: string | null): SecurityFinding {
  if (!value?.trim()) {
    return finding(
      "headers.permissions_policy",
      "warning",
      "low",
      "Permissions-Policy absent",
      "Header Permissions-Policy absent.",
      "Certaines APIs navigateur ne sont pas explicitement restreintes.",
      "Ajouter une Permissions-Policy minimale pour les fonctionnalites non utilisees."
    );
  }

  return finding(
    "headers.permissions_policy",
    "manual_review",
    "info",
    "Permissions-Policy presente",
    `Header Permissions-Policy present: ${value.slice(0, 180)}`,
    "La presence du header est utile, mais sa pertinence depend des fonctionnalites attendues.",
    "Verifier manuellement que les directives correspondent aux besoins reels du site."
  );
}

function evaluateFraming(xFrameOptions: string | null, csp: string | null): SecurityFinding {
  const frameAncestors = hasFrameAncestors(csp);
  const xfo = xFrameOptions?.toLowerCase();

  if (frameAncestors || xfo === "deny" || xfo === "sameorigin") {
    return finding(
      "headers.framing",
      "pass",
      "info",
      "Protection anti-framing presente",
      frameAncestors
        ? "Directive frame-ancestors detectee dans la CSP."
        : `Header X-Frame-Options present: ${xFrameOptions}`,
      "La page annonce une politique limitant son affichage dans une frame.",
      "Preferer frame-ancestors dans la CSP pour les politiques modernes, en conservant X-Frame-Options si necessaire."
    );
  }

  if (xFrameOptions) {
    return finding(
      "headers.framing",
      "warning",
      "low",
      "X-Frame-Options potentiellement faible",
      `Header X-Frame-Options present: ${xFrameOptions}`,
      "Une valeur non standard peut ne pas proteger contre le clickjacking.",
      "Utiliser DENY, SAMEORIGIN ou une directive CSP frame-ancestors adaptee."
    );
  }

  return finding(
    "headers.framing",
    "fail",
    "medium",
    "Protection anti-framing absente",
    "Aucun X-Frame-Options valide ni directive frame-ancestors detecte.",
    "Le site peut etre affichable dans une frame malveillante selon les navigateurs.",
    "Ajouter frame-ancestors dans la CSP ou X-Frame-Options: DENY/SAMEORIGIN."
  );
}

async function fetchHeaders(url: URL): Promise<HeaderSnapshot> {
  let currentUrl = new URL(url);

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const ssrf = await preventSsrf(currentUrl);
    if (!ssrf.safe) {
      throw new Error("SSRF_BLOCKED");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
          Range: "bytes=0-0",
        },
      });

      if (response.body) {
        await response.body.cancel();
      }

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location) {
          throw new Error("REDIRECT_WITHOUT_LOCATION");
        }

        currentUrl = new URL(location, currentUrl);
        continue;
      }

      return {
        url: currentUrl.toString(),
        headers: response.headers,
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("TOO_MANY_REDIRECTS");
}

export async function checkSecurityHeaders(targetUrl: URL): Promise<SecurityCheckResult> {
  const snapshot = await fetchHeaders(targetUrl);
  const csp = snapshot.headers.get("content-security-policy");
  const findings = [
    evaluateCsp(csp),
    evaluateHsts(snapshot.headers.get("strict-transport-security")),
    evaluateNoSniff(snapshot.headers.get("x-content-type-options")),
    evaluateReferrerPolicy(snapshot.headers.get("referrer-policy")),
    evaluatePermissionsPolicy(snapshot.headers.get("permissions-policy")),
    evaluateFraming(snapshot.headers.get("x-frame-options"), csp),
  ];

  const summary = {
    total: findings.length,
    passed: findings.filter((item) => item.status === "pass").length,
    failed: findings.filter((item) => item.status === "fail").length,
    warnings: findings.filter((item) => item.status === "warning").length,
    manualReview: findings.filter((item) => item.status === "manual_review").length,
  };

  const score = calculateSecurityScore(findings);

  return {
    checkName: CHECK_NAME,
    target: snapshot.url,
    executedAt: new Date().toISOString(),
    status: summary.failed > 0 ? "fail" : summary.warnings > 0 ? "warning" : "pass",
    score,
    summary,
    findings,
  };
}
