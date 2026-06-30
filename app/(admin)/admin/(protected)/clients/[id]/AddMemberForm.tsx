"use client";

import { useActionState } from "react";
import { addClientMember, type AddMemberState } from "./actions";

const initial: AddMemberState = { error: null, sent: false, link: null };

const field = "h-10 w-full rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-3 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-white/30 focus:ring-2 focus:ring-white/[0.08]";
const label = "block text-xs font-medium text-mut mb-1.5";

export default function AddMemberForm({ clientId }: { clientId: string }) {
  const [state, action, pending] = useActionState(addClientMember, initial);

  if (state.sent) {
    return (
      <p className="text-sm font-medium text-emerald-400">
        ✓ Lien envoyé par email.
      </p>
    );
  }

  if (state.link && !state.sent) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-mut">Email non configuré — copie ce lien et envoie-le manuellement :</p>
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={state.link}
            className={`${field} font-mono text-xs`}
          />
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(state.link!)}
            className="shrink-0 rounded-full border border-white/[0.13] px-4 py-2 text-xs font-medium text-ink hover:bg-white/[0.05]"
          >
            Copier
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="clientId" value={clientId} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Prénom</label>
          <input className={field} name="firstName" placeholder="Paul" required />
        </div>
        <div>
          <label className={label}>Nom</label>
          <input className={field} name="lastName" placeholder="Dupont" required />
        </div>
      </div>

      <div>
        <label className={label}>Email</label>
        <input className={field} type="email" name="email" placeholder="paul@boulangerie.fr" required />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="btn-grad rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
        >
          {pending ? "Ajout en cours…" : "Ajouter et envoyer le lien"}
        </button>
        {state.error && <span className="text-sm text-red-400">{state.error}</span>}
      </div>
    </form>
  );
}
