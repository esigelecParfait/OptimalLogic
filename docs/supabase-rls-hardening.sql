-- ============================================================
-- Durcissement RLS — tables client OptimalLogic (modèle client_members)
--
-- À exécuter dans Supabase → SQL Editor APRÈS avoir vérifié l'état RLS :
--   SELECT relname, relrowsecurity FROM pg_class
--   WHERE relnamespace = 'public'::regnamespace
--     AND relname IN ('clients','client_prospects','client_members',
--                     'client_services','demandes','offres',
--                     'activation_tokens','administrateurs','tracking_marketing');
-- Toute table à relrowsecurity = false est exposée via la clé ANON publique.
--
-- Le back-end utilise le SERVICE ROLE (bypass RLS) ; ces politiques ne
-- concernent que les accès via la clé ANON (espace client authentifié).
-- RLS activée SANS policy = deny-all pour anon/authenticated (comportement voulu).
-- ============================================================

ALTER TABLE public.clients           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_prospects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_members    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_services   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demandes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offres            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activation_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.administrateurs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_marketing ENABLE ROW LEVEL SECURITY;

-- client_members : un user ne voit QUE ses propres rattachements
DROP POLICY IF EXISTS "members_select_self" ON public.client_members;
CREATE POLICY "members_select_self" ON public.client_members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- clients : uniquement les clients dont le user est membre
DROP POLICY IF EXISTS "clients_select_own" ON public.clients;
CREATE POLICY "clients_select_own" ON public.clients
  FOR SELECT TO authenticated
  USING (
    id_client IN (SELECT id_client FROM public.client_members WHERE user_id = auth.uid())
  );

-- client_prospects : lecture ET mise à jour limitées au prospect lié à SES clients
DROP POLICY IF EXISTS "prospects_select_own" ON public.client_prospects;
CREATE POLICY "prospects_select_own" ON public.client_prospects
  FOR SELECT TO authenticated
  USING (
    id_client IN (
      SELECT c.id_client_prospect FROM public.clients c
      JOIN public.client_members m ON m.id_client = c.id_client
      WHERE m.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "prospects_update_own" ON public.client_prospects;
CREATE POLICY "prospects_update_own" ON public.client_prospects
  FOR UPDATE TO authenticated
  USING (
    id_client IN (
      SELECT c.id_client_prospect FROM public.clients c
      JOIN public.client_members m ON m.id_client = c.id_client
      WHERE m.user_id = auth.uid()
    )
  )
  WITH CHECK (
    id_client IN (
      SELECT c.id_client_prospect FROM public.clients c
      JOIN public.client_members m ON m.id_client = c.id_client
      WHERE m.user_id = auth.uid()
    )
  );

-- client_services : lecture limitée aux services de SES clients
DROP POLICY IF EXISTS "services_select_own" ON public.client_services;
CREATE POLICY "services_select_own" ON public.client_services
  FOR SELECT TO authenticated
  USING (
    id_client IN (
      SELECT c.id_client_prospect FROM public.clients c
      JOIN public.client_members m ON m.id_client = c.id_client
      WHERE m.user_id = auth.uid()
    )
  );

-- offres, demandes, activation_tokens, administrateurs, tracking_marketing :
-- AUCUNE policy anon/authenticated -> accès uniquement via service role.
-- (Ne PAS exposer activation_tokens ni administrateurs à la clé anon.)

-- NB : adaptez les colonnes de jointure si votre schéma réel diffère
--      (clients.id_client_prospect, client_members.id_client / user_id).
