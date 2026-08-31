<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# OptimalLogic V2 rules

1. Work from the directive pack in `docs/refonte-v2/`; never remove an
   existing functional route without explicit approval.
2. For a rebuild, read `.codex/skills/optimallogic-site-rebuild/SKILL.md`
   before implementation. Use the frontend, visual-assets and motion skills
   for their respective scopes.
3. Treat `design-system/foundation-tokens.json` as the source for reusable
   visual tokens and run `npm run tokens` after changing it.
4. Generic primitives and blocks must not contain OptimalLogic copy, prices,
   testimonials or business rules.
5. The public catalogue contains exactly five approved database codes:
   `commerce_intelligent`, `commerce_premium`, `tpe_pme_croissance`,
   `tpe_pme_performance` and `startup_launch`. Read `nom_offre`, `prix` and
   `prix_abonnement` from Supabase; never add a hard-coded price fallback.
6. Preserve API routes, Supabase access, authentication, admin pages, client
   spaces and integrations unless the task explicitly changes them.
7. Do not invent customers, results, certifications, screenshots or product
   capabilities.
8. Keep keyboard access, visible focus, mobile behavior and
   `prefers-reduced-motion` support.
9. Keep `/showroom`, `/preview/**` and `/comparer` out of the production
   navigation and non-indexable.
10. Run `npm run check:all` before requesting a merge. Do not weaken a test or
    quality threshold merely to make the gate pass.
