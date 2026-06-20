-- ============================================================
-- Fonction d'agrégation des métriques mensuelles
-- À coller dans Supabase → SQL Editor → Run
-- ============================================================

-- Fonction principale : agrège les données du mois demandé
-- Appel manuel  : SELECT public.refresh_client_metrics('2026-06');
-- Appel auto    : SELECT public.refresh_client_metrics(); -- mois courant
CREATE OR REPLACE FUNCTION public.refresh_client_metrics(p_month TEXT DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_month TEXT;
BEGIN
  v_month := COALESCE(p_month, TO_CHAR(CURRENT_DATE, 'YYYY-MM'));

  -- ── 1. RDV et demandes depuis commerce_rdv ──────────────────
  INSERT INTO public.client_metrics (id_client, mois, nb_rdv, nb_demandes)
  SELECT
    id_client,
    v_month,
    COUNT(*) FILTER (WHERE statut IN ('confirme', 'termine')),
    COUNT(*)
  FROM public.commerce_rdv
  WHERE TO_CHAR(created_at AT TIME ZONE 'Europe/Paris', 'YYYY-MM') = v_month
  GROUP BY id_client
  ON CONFLICT (id_client, mois) DO UPDATE SET
    nb_rdv      = EXCLUDED.nb_rdv,
    nb_demandes = EXCLUDED.nb_demandes,
    updated_at  = now();

  -- ── 2. Sessions chatbot ─────────────────────────────────────
  INSERT INTO public.client_metrics (id_client, mois, nb_sessions_chatbot)
  SELECT
    id_client,
    v_month,
    COUNT(*)
  FROM public.commerce_chatbot_sessions
  WHERE TO_CHAR(created_at AT TIME ZONE 'Europe/Paris', 'YYYY-MM') = v_month
  GROUP BY id_client
  ON CONFLICT (id_client, mois) DO UPDATE SET
    nb_sessions_chatbot = EXCLUDED.nb_sessions_chatbot,
    updated_at          = now();

END;
$$;

-- ── 3. Cron automatique le 1er de chaque mois à 6h ───────────
-- Nécessite l'extension pg_cron (activée dans Supabase par défaut)
-- Vérifier : SELECT * FROM pg_extension WHERE extname = 'pg_cron';

SELECT cron.schedule(
  'refresh-metrics-monthly',          -- nom du job
  '0 6 1 * *',                        -- 1er du mois à 6h00
  'SELECT public.refresh_client_metrics()'
);

-- Pour lister les jobs cron actifs :
-- SELECT * FROM cron.job;

-- Pour supprimer le job :
-- SELECT cron.unschedule('refresh-metrics-monthly');

-- ── 4. Test immédiat ──────────────────────────────────────────
-- Déclencher manuellement pour le mois courant :
-- SELECT public.refresh_client_metrics();

-- Déclencher pour un mois passé :
-- SELECT public.refresh_client_metrics('2026-05');
