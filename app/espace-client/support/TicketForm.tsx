"use client";

import { useActionState, useEffect, useRef } from "react";
import { createSupportTicket, type TicketActionState } from "./actions";

const labelClass = "grid gap-2";

const labelTextClass = "text-sm font-semibold text-slate-700";

const fieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100";

const textareaClass =
  "min-h-[150px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100";

const initialState: TicketActionState = { error: null };

export default function TicketForm() {
  const [state, formAction, isPending] = useActionState(
    createSupportTicket,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-5">
      <label className={labelClass}>
        <span className={labelTextClass}>Sujet</span>
        <input
          name="subject"
          required
          placeholder="Ex : question sur ma facture"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Description</span>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="Décrivez votre demande aussi précisément que possible."
          className={textareaClass}
        />
      </label>

      {state.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Votre ticket a bien été envoyé.
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Envoi..." : "Envoyer le ticket"}
      </button>
    </form>
  );
}
