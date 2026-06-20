-- Table des métriques de performance mensuelles par client
-- À coller dans Supabase → SQL Editor → Run

CREATE TABLE IF NOT EXISTS public.client_metrics (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  id_client    UUID        NOT NULL REFERENCES public.clients(id_client) ON DELETE CASCADE,
  mois         TEXT        NOT NULL CHECK (mois ~ '^\d{4}-\d{2}$'), -- format "2026-06"
  -- Métriques business
  nb_rdv              INTEGER,   -- RDV pris grâce à OptimalLogic
  nb_demandes         INTEGER,   -- Nouvelles demandes / contacts reçus
  nb_appels           INTEGER,   -- Appels entrants estimés
  nb_avis_google      INTEGER,   -- Nouveaux avis Google reçus ce mois
  note_google         NUMERIC(2,1), -- Note Google actuelle (ex: 4.7)
  nb_vues_google      INTEGER,   -- Vues de la fiche Google Business
  nb_clics_google     INTEGER,   -- Clics vers le site / itinéraire
  nb_sessions_chatbot INTEGER,   -- Sessions chatbot ce mois
  notes               TEXT,      -- Commentaire libre d'OptimalLogic
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (id_client, mois)
);

CREATE INDEX IF NOT EXISTS idx_metrics_client ON public.client_metrics (id_client);
CREATE INDEX IF NOT EXISTS idx_metrics_mois   ON public.client_metrics (mois);

-- Trigger updated_at
DROP TRIGGER IF EXISTS trg_metrics_updated_at ON public.client_metrics;
CREATE TRIGGER trg_metrics_updated_at
  BEFORE UPDATE ON public.client_metrics
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS : le client peut lire ses propres métriques, OptimalLogic écrit via service_role
ALTER TABLE public.client_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "metrics_select_own" ON public.client_metrics
  FOR SELECT TO authenticated
  USING (
    id_client IN (
      SELECT id_client FROM public.clients WHERE auth_user_id = auth.uid()
    )
  );

-- Exemple d'insertion manuelle par OptimalLogic (via service_role) :
-- INSERT INTO public.client_metrics (id_client, mois, nb_rdv, nb_demandes, nb_avis_google, note_google, nb_vues_google, nb_sessions_chatbot)
-- VALUES ('UUID_DU_CLIENT', '2026-06', 19, 48, 7, 4.8, 1240, 63)
-- ON CONFLICT (id_client, mois) DO UPDATE SET
--   nb_rdv = EXCLUDED.nb_rdv,
--   nb_demandes = EXCLUDED.nb_demandes,
--   updated_at = now();
