-- ============================================================
-- Script Supabase COMPLET — OptimalLogic + Pack Commerce
-- Coller intégralement dans Supabase → SQL Editor → Run
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- HELPER : trigger updated_at (utilisé par plusieurs tables)
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ────────────────────────────────────────────────────────────
-- 1. commerce_rdv — commandes et demandes de RDV
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.commerce_rdv (
  id                    UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  id_client             UUID        NOT NULL,
  prospect_nom          TEXT        NOT NULL CHECK (char_length(prospect_nom) >= 2),
  prospect_email        TEXT        NOT NULL CHECK (prospect_email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'),
  prospect_phone        TEXT,
  type_commande         TEXT        NOT NULL
                          CHECK (type_commande IN ('gateau_anniversaire','piece_montee','buffet_patissier','pain_special','consultation','autre')),
  date_souhaitee        DATE,
  heure_rdv             TIME,
  nb_personnes          INTEGER     CHECK (nb_personnes > 0 AND nb_personnes <= 10000),
  details               TEXT        CHECK (char_length(details) <= 1000),
  budget_range          TEXT        CHECK (budget_range IN ('moins_50','50_100','100_200','plus_200','sur_devis') OR budget_range IS NULL),
  consentement_rgpd     BOOLEAN     NOT NULL DEFAULT false,
  statut                TEXT        NOT NULL DEFAULT 'en_attente'
                          CHECK (statut IN ('en_attente','confirme','annule','termine')),
  confirmation_envoyee  BOOLEAN     NOT NULL DEFAULT false,
  rappel_j1_envoye      BOOLEAN     NOT NULL DEFAULT false,
  avis_envoye           BOOLEAN     NOT NULL DEFAULT false,
  relance_j3_envoyee    BOOLEAN     NOT NULL DEFAULT false,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rdv_client  ON public.commerce_rdv (id_client);
CREATE INDEX IF NOT EXISTS idx_rdv_statut  ON public.commerce_rdv (statut);
CREATE INDEX IF NOT EXISTS idx_rdv_date    ON public.commerce_rdv (date_souhaitee);
CREATE INDEX IF NOT EXISTS idx_rdv_created ON public.commerce_rdv (created_at);

DROP TRIGGER IF EXISTS trg_rdv_updated_at ON public.commerce_rdv;
CREATE TRIGGER trg_rdv_updated_at
  BEFORE UPDATE ON public.commerce_rdv
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.commerce_rdv ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "rdv_anon_insert" ON public.commerce_rdv;
CREATE POLICY "rdv_anon_insert" ON public.commerce_rdv
  FOR INSERT TO anon
  WITH CHECK (consentement_rgpd = true);


-- ────────────────────────────────────────────────────────────
-- 2. commerce_rdv_slots — créneaux de consultation
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.commerce_rdv_slots (
  id           UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  id_client    UUID    NOT NULL,
  day_of_week  INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time   TIME    NOT NULL,
  end_time     TIME    NOT NULL CHECK (end_time > start_time),
  max_bookings INTEGER NOT NULL DEFAULT 1 CHECK (max_bookings > 0),
  is_active    BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_slots_client ON public.commerce_rdv_slots (id_client);

ALTER TABLE public.commerce_rdv_slots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "slots_anon_select" ON public.commerce_rdv_slots;
CREATE POLICY "slots_anon_select" ON public.commerce_rdv_slots
  FOR SELECT TO anon USING (is_active = true);


-- ────────────────────────────────────────────────────────────
-- 3. commerce_chatbot_sessions — tracking des sessions chatbot
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.commerce_chatbot_sessions (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  id_client      UUID        NOT NULL,
  nb_messages    INTEGER     NOT NULL DEFAULT 0,
  ip_hash        TEXT,
  session_end    BOOLEAN     NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_client ON public.commerce_chatbot_sessions (id_client);
CREATE INDEX IF NOT EXISTS idx_sessions_date   ON public.commerce_chatbot_sessions (created_at);

ALTER TABLE public.commerce_chatbot_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sessions_anon_insert" ON public.commerce_chatbot_sessions;
CREATE POLICY "sessions_anon_insert" ON public.commerce_chatbot_sessions
  FOR INSERT TO anon WITH CHECK (true);


-- ────────────────────────────────────────────────────────────
-- 4. client_metrics — métriques de performance mensuelles
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.client_metrics (
  id                  UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  id_client           UUID         NOT NULL REFERENCES public.clients(id_client) ON DELETE CASCADE,
  mois                TEXT         NOT NULL CHECK (mois ~ '^\d{4}-\d{2}$'),
  nb_rdv              INTEGER,
  nb_demandes         INTEGER,
  nb_appels           INTEGER,
  nb_avis_google      INTEGER,
  note_google         NUMERIC(2,1),
  nb_vues_google      INTEGER,
  nb_clics_google     INTEGER,
  nb_sessions_chatbot INTEGER,
  notes               TEXT,
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  UNIQUE (id_client, mois)
);

CREATE INDEX IF NOT EXISTS idx_metrics_client ON public.client_metrics (id_client);
CREATE INDEX IF NOT EXISTS idx_metrics_mois   ON public.client_metrics (mois);

DROP TRIGGER IF EXISTS trg_metrics_updated_at ON public.client_metrics;
CREATE TRIGGER trg_metrics_updated_at
  BEFORE UPDATE ON public.client_metrics
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.client_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "metrics_select_own" ON public.client_metrics;
CREATE POLICY "metrics_select_own" ON public.client_metrics
  FOR SELECT TO authenticated
  USING (
    id_client IN (
      SELECT id_client FROM public.clients WHERE auth_user_id = auth.uid()
    )
  );


-- ────────────────────────────────────────────────────────────
-- 5. Fonction d'agrégation automatique
-- ────────────────────────────────────────────────────────────
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

  -- RDV confirmés et total des demandes
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

  -- Sessions chatbot
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


-- ────────────────────────────────────────────────────────────
-- 6. Cron automatique — 1er du mois à 6h
-- ────────────────────────────────────────────────────────────
-- Pour activer pg_cron : Supabase → Database → Extensions → pg_cron → Enable
-- Ensuite décommenter et exécuter ces lignes séparément :
--
-- SELECT cron.schedule(
--   'refresh-metrics-monthly',
--   '0 6 1 * *',
--   'SELECT public.refresh_client_metrics()'
-- );


-- ────────────────────────────────────────────────────────────
-- 7. Créneaux initiaux pour Les Délices de Léon
-- ────────────────────────────────────────────────────────────
INSERT INTO public.commerce_rdv_slots (id_client, day_of_week, start_time, end_time, max_bookings)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 2, '10:00', '11:00', 1),
  ('550e8400-e29b-41d4-a716-446655440000', 2, '14:00', '15:00', 1),
  ('550e8400-e29b-41d4-a716-446655440000', 4, '10:00', '11:00', 1),
  ('550e8400-e29b-41d4-a716-446655440000', 6, '09:00', '10:00', 1)
ON CONFLICT DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- TEST — déclencher l'agrégation manuellement
-- ────────────────────────────────────────────────────────────
-- SELECT public.refresh_client_metrics();          -- mois courant
-- SELECT public.refresh_client_metrics('2026-06'); -- mois précis
