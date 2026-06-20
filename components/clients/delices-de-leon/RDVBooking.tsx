"use client";

import { useEffect, useState } from "react";

const CLIENT_ID = "550e8400-e29b-41d4-a716-446655440000";

type Slot = { date: string; day: string; startTime: string; endTime: string; slotId: string };
type Step = "type" | "details" | "contact" | "confirmation";

const COMMAND_TYPES = [
  { value: "gateau_anniversaire", label: "Gâteau d'anniversaire", desc: "Personnalisé, à partir de 35 €" },
  { value: "piece_montee", label: "Pièce montée mariage", desc: "Sur devis, consultation gratuite" },
  { value: "buffet_patissier", label: "Buffet pâtissier", desc: "Entreprise ou événement, à partir de 80 €" },
  { value: "pain_special", label: "Pain sans gluten", desc: "Sur commande 48h à l'avance" },
  { value: "consultation", label: "Consultation / RDV", desc: "Pour un projet sur-mesure" },
  { value: "autre", label: "Autre commande", desc: "Précisez dans le message" },
];

const BUDGET_RANGES = [
  { value: "moins_50", label: "Moins de 50 €" },
  { value: "50_100", label: "50 € – 100 €" },
  { value: "100_200", label: "100 € – 200 €" },
  { value: "plus_200", label: "Plus de 200 €" },
  { value: "sur_devis", label: "Je préfère un devis" },
];

const fieldClass = "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white";
const labelClass = "block text-sm font-semibold text-slate-700 mb-2";

export default function RDVBooking() {
  const [step, setStep] = useState<Step>("type");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [typeCommande, setTypeCommande] = useState("");
  const [dateSouhaitee, setDateSouhaitee] = useState("");
  const [heureRdv, setHeureRdv] = useState("");
  const [nbPersonnes, setNbPersonnes] = useState("");
  const [details, setDetails] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [prospectNom, setProspectNom] = useState("");
  const [prospectEmail, setProspectEmail] = useState("");
  const [prospectPhone, setProspectPhone] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedId, setConfirmedId] = useState("");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  const minDateStr = minDate.toISOString().split("T")[0];

  useEffect(() => {
    if (step === "details") {
      setLoadingSlots(true);
      fetch(`/api/rdv/${CLIENT_ID}`)
        .then((r) => r.json())
        .then((data) => setSlots(data.slots ?? []))
        .catch(() => setSlots([]))
        .finally(() => setLoadingSlots(false));
    }
  }, [step]);

  async function handleSubmit() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/rdv/${CLIENT_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospectNom, prospectEmail, prospectPhone, typeCommande, dateSouhaitee, heureRdv: heureRdv || null, nbPersonnes: nbPersonnes ? parseInt(nbPersonnes) : null, details, budgetRange: budgetRange || null, consentementRgpd: consentement }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Une erreur est survenue."); }
      else { setConfirmedId(data.id); setStep("confirmation"); }
    } catch {
      setError("Impossible de soumettre la demande. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "confirmation") {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Demande envoyée !</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">L'équipe des Délices de Léon va vous recontacter sous 24h pour confirmer les détails.</p>
        <p className="mt-2 text-sm text-slate-500">Un email de confirmation vous a été envoyé à <strong>{prospectEmail}</strong>.</p>
        <p className="mt-1 text-xs text-slate-400">Référence : {confirmedId.slice(0, 8).toUpperCase()}</p>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-950">Une question urgente ?</p>
          <p className="mt-1">Appelez directement au <a href="tel:0478623317" className="font-semibold text-slate-950 underline underline-offset-2">04 78 62 33 17</a></p>
          <p className="text-xs text-slate-400 mt-1">Du mardi au samedi 6h30 – 19h30</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {step === "type" && (
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 mb-6">Quel type de commande souhaitez-vous ?</h2>
          <div className="grid gap-3">
            {COMMAND_TYPES.map((ct) => (
              <button key={ct.value} onClick={() => { setTypeCommande(ct.value); setStep("details"); }}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-950 hover:bg-slate-50">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-950">{ct.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{ct.desc}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-slate-400"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "details" && (
        <div>
          <button onClick={() => setStep("type")} className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-950">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Retour
          </button>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 mb-6">Détails de votre commande</h2>
          <div className="grid gap-5">
            <div>
              <label className={labelClass}>Date souhaitée de retrait *</label>
              <input type="date" min={minDateStr} value={dateSouhaitee} onChange={(e) => setDateSouhaitee(e.target.value)} className={fieldClass} />
              <p className="mt-1 text-xs text-slate-400">Minimum 48h à l'avance</p>
            </div>
            {(typeCommande === "consultation" || typeCommande === "piece_montee") && (
              <div>
                <label className={labelClass}>Créneau de consultation souhaité</label>
                {loadingSlots ? (
                  <p className="text-sm text-slate-400">Chargement des créneaux...</p>
                ) : slots.length === 0 ? (
                  <p className="text-sm text-slate-500">Aucun créneau disponible. Nous vous contacterons pour convenir d'un horaire.</p>
                ) : (
                  <select value={heureRdv} onChange={(e) => { const slot = slots.find((s) => `${s.date}|${s.startTime}` === e.target.value); if (slot) { setDateSouhaitee(slot.date); setHeureRdv(slot.startTime); } }} className={fieldClass}>
                    <option value="">Sélectionner un créneau</option>
                    {slots.map((s, i) => (
                      <option key={i} value={`${s.date}|${s.startTime}`}>
                        {s.day} {new Date(s.date + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} — {s.startTime.slice(0, 5)}–{s.endTime.slice(0, 5)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
            {(typeCommande === "gateau_anniversaire" || typeCommande === "buffet_patissier" || typeCommande === "piece_montee") && (
              <div>
                <label className={labelClass}>Nombre de personnes</label>
                <input type="number" min={1} max={500} value={nbPersonnes} onChange={(e) => setNbPersonnes(e.target.value)} placeholder="Ex : 20" className={fieldClass} />
              </div>
            )}
            <div>
              <label className={labelClass}>Budget approximatif</label>
              <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} className={fieldClass}>
                <option value="">Sélectionner (optionnel)</option>
                {BUDGET_RANGES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Vos souhaits et précisions</label>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Saveurs, couleurs, thème, allergies..." rows={4} maxLength={1000} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white resize-none" />
              <p className="mt-1 text-right text-xs text-slate-400">{details.length}/1000</p>
            </div>
            <button onClick={() => setStep("contact")} disabled={!dateSouhaitee} className="h-12 rounded-full bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
              Continuer
            </button>
          </div>
        </div>
      )}

      {step === "contact" && (
        <div>
          <button onClick={() => setStep("details")} className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-950">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Retour
          </button>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 mb-6">Vos coordonnées</h2>
          <div className="grid gap-5">
            <div>
              <label className={labelClass}>Nom complet *</label>
              <input type="text" value={prospectNom} onChange={(e) => setProspectNom(e.target.value)} placeholder="Jean Dupont" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" value={prospectEmail} onChange={(e) => setProspectEmail(e.target.value)} placeholder="jean.dupont@email.com" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Téléphone</label>
              <input type="tel" value={prospectPhone} onChange={(e) => setProspectPhone(e.target.value)} placeholder="06 12 34 56 78" className={fieldClass} />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={consentement} onChange={(e) => setConsentement(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-slate-950" />
              <span className="text-xs leading-5 text-slate-500">J'accepte que mes données soient utilisées par Les Délices de Léon pour traiter ma demande, conformément au RGPD.</span>
            </label>
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
            <button onClick={handleSubmit} disabled={!prospectNom || !prospectEmail || !consentement || submitting} className="h-12 rounded-full bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
              {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
