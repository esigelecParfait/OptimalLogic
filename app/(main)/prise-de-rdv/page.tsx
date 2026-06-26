"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";

import "react-phone-number-input/style.css";

type Slot = {
  start: string;
};

type SlotMap = Record<string, Slot[]>;

type AppointmentForm = {
  lastname: string;
  firstname: string;
  email: string;
  phoneFullNumber: string;
  company: string;
  businessCity: string;
  type_client: string;
  objective: string;
  businessWebsiteUrl: string;
  googleBusinessUrl: string;
  message: string;
  consentRgpd: boolean;
};

type ObjectiveOption = { value: string; label: string };
type TypeClientOption = { value: string; label: string };

const typeclientOptions: TypeClientOption[] = [
  { value: "commerce", label: "Commerce" },
  { value: "tpe_pme", label: "TPE/PME" },
  { value: "startup", label: "Startup" },
];
const objectiveOptions: ObjectiveOption[] = [
  { value: "plus_appels_reservations", label: "Plus d’appels ou de réservations" },
  { value: "plus_devis_qualifies", label: "Plus de devis ou demandes qualifiées" },
  { value: "mieux_suivre_prospects", label: "Mieux suivre les prospects" },
  { value: "ameliorer_image", label: "Améliorer mon image professionnelle" },
  { value: "lancer_offre", label: "Lancer ou tester une offre" },
  { value: "automatiser_reponses", label: "Automatiser les réponses aux clients" },
  { value: "incertain", label: "Je ne sais pas encore" },
];

const diagnosticBenefits = [
  "Identifier votre blocage principal",
  "Clarifier la solution la plus adaptée",
  "Définir une première action concrète",
];

const appointmentDetails = [
  { icon: "⏱", label: "Durée", value: "15 minutes" },
  { icon: "🌍", label: "Fuseau horaire", value: "Europe/Paris" },
  { icon: "💻", label: "Lieu", value: "En ligne" },
];

const preparationItems = [
  "Votre activité",
  "Votre objectif prioritaire",
  "Votre présence digitale actuelle",
  "Vos points de blocage",
];

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";
const phoneWrapperClass =
  "flex h-12 w-full items-center rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 transition focus-within:border-indigo";
const textareaClass =
  "min-h-[140px] w-full resize-none rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";
const dropdownBtnClass =
  "flex w-full items-center justify-between rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 py-3 text-left text-sm outline-none transition focus:border-indigo";

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(date);
}

function formatDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00`);
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "2-digit", month: "long" }).format(date);
}

function formatShortDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00`);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(date);
}

function formatTimeLabel(value: string) {
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(new Date(value));
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const mondayBasedIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const calendarStart = new Date(year, month, 1 - mondayBasedIndex);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    return {
      date,
      dateKey: toDateKey(date),
      isCurrentMonth: date.getMonth() === month,
      isToday: toDateKey(date) === toDateKey(new Date()),
    };
  });
}

function cleanOptionalText(value: string) {
  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}

function normalizeOptionalUrl(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return null;
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;
  return `https://${cleaned}`;
}

function getTrackingPayload() {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
  };
}

export default function PriseDeRdvPage() {
  const [slots, setSlots] = useState<SlotMap>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [form, setForm] = useState<AppointmentForm>({
    lastname: "",
    firstname: "",
    email: "",
    phoneFullNumber: "",
    company: "",
    businessCity: "",
    type_client: "",
    objective: "",
    businessWebsiteUrl: "",
    googleBusinessUrl: "",
    message: "",
    consentRgpd: false,
  });

  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [TypeClientMenuOpen, setTypeClientMenuOpen] = useState(false);
  const [objectiveMenuOpen, setObjectiveMenuOpen] = useState(false);
  const selectedObjectiveLabel =
    objectiveOptions.find((option) => option.value === form.objective)?.label || "Choisissez un objectif";
  const selectedTypeClientLabel =
    typeclientOptions.find((option) => option.value === form.type_client)?.label || "Choisissez un Type de client";

  useEffect(() => {
    async function loadSlots() {
      try {
        setIsLoadingSlots(true);
        setSlotsError(null);

        const start = new Date().toISOString();
        const end = addDays(new Date(), 30).toISOString();
        const params = new URLSearchParams({ start, end });

        const response = await fetch(`/api/cal/slots?${params.toString()}`, { method: "GET", cache: "no-store" });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Impossible de récupérer les créneaux.");
        }

        const receivedSlots: SlotMap = result.data || {};
        const availableDates = Object.keys(receivedSlots).sort();

        setSlots(receivedSlots);

        if (availableDates.length > 0) {
          const firstDate = availableDates[0];
          setSelectedDate(firstDate);
          setCurrentMonth(new Date(`${firstDate}T12:00:00`));
        }
      } catch (error) {
        setSlotsError(error instanceof Error ? error.message : "Impossible de récupérer les créneaux.");
      } finally {
        setIsLoadingSlots(false);
      }
    }

    loadSlots();
  }, []);

  useEffect(() => {
    if (bookingSuccess) return;

    async function refreshSlots() {
      try {
        const start = new Date().toISOString();
        const end = addDays(new Date(), 30).toISOString();
        const params = new URLSearchParams({ start, end });
        const response = await fetch(`/api/cal/slots?${params.toString()}`, { method: "GET", cache: "no-store" });
        if (!response.ok) return;
        const result = await response.json();
        setSlots(result.data || {});
      } catch {
        // silently ignore background refresh errors
      }
    }

    const interval = setInterval(refreshSlots, 60_000);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") refreshSlots();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [bookingSuccess]);

  useEffect(() => {
    if (selectedDate && Object.keys(slots).length > 0 && !slots[selectedDate]) {
      setSelectedDate("");
      setSelectedSlot("");
    }
  }, [slots, selectedDate]);

  const availableDateSet = useMemo(() => new Set(Object.keys(slots)), [slots]);
  const calendarDays = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);
  const selectedDateSlots = useMemo(() => slots[selectedDate] || [], [slots, selectedDate]);

  function updateField<K extends keyof AppointmentForm>(field: K, value: AppointmentForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function goToPreviousMonth() {
    setCurrentMonth((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() - 1);
      return next;
    });
  }

  function goToNextMonth() {
    setCurrentMonth((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() + 1);
      return next;
    });
  }

  async function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingError(null);

    const parsedPhone = parsePhoneNumber(form.phoneFullNumber);

    if (!selectedSlot) {
      setBookingError("Choisissez un créneau.");
      return;
    }
    if (!form.lastname.trim() || !form.firstname.trim() || !form.email.trim()) {
      setBookingError("Le nom, le prénom et l’email sont obligatoires.");
      return;
    }
    if (!parsedPhone || !parsedPhone.isValid()) {
      setBookingError("Le numéro de téléphone est invalide.");
      return;
    }
    if (!form.objective) {
      setBookingError("Veuillez sélectionner un objectif principal.");
      return;
    }
    if (!form.consentRgpd) {
      setBookingError("Vous devez accepter l’utilisation de vos informations pour être recontacté.");
      return;
    }

    try {
      setIsBooking(true);

      const payload = {
        start: selectedSlot,
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim().toLowerCase(),
        phoneFullNumber: form.phoneFullNumber,
        phone_country_code: `+${parsedPhone.countryCallingCode}`,
        phone_number: parsedPhone.nationalNumber,
        company: cleanOptionalText(form.company),
        businessCity: cleanOptionalText(form.businessCity),
        activity: null,
        type_client: form.type_client,
        objective: form.objective,
        objectiveLabel: objectiveOptions.find((o) => o.value === form.objective)?.label ?? form.objective,
        businessWebsiteUrl: normalizeOptionalUrl(form.businessWebsiteUrl),
        googleBusinessUrl: normalizeOptionalUrl(form.googleBusinessUrl),
        message: cleanOptionalText(form.message),
        consentRgpd: form.consentRgpd,
        tracking: getTrackingPayload(),
      };

      const response = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Impossible de confirmer le rendez-vous.");
      }

      setBookingSuccess(true);

      const bookedSlot = selectedSlot;
      setSlots((current) => {
        const dateKey = bookedSlot.slice(0, 10);
        const filtered = (current[dateKey] ?? []).filter((s) => s.start !== bookedSlot);
        if (filtered.length === 0) {
          const updated = { ...current };
          delete updated[dateKey];
          return updated;
        }
        return { ...current, [dateKey]: filtered };
      });

      try {
        const refreshStart = new Date().toISOString();
        const refreshEnd = addDays(new Date(), 30).toISOString();
        const refreshParams = new URLSearchParams({ start: refreshStart, end: refreshEnd });
        const refreshRes = await fetch(`/api/cal/slots?${refreshParams}`, { cache: "no-store" });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          setSlots(refreshData.data || {});
        }
      } catch {
        // silently ignore
      }
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Impossible de confirmer le rendez-vous.");
    } finally {
      setIsBooking(false);
    }
  }

  function ObjectiveDropdown() {
    return (
      <div className="relative">
        <button type="button" onClick={() => setObjectiveMenuOpen((current) => !current)} className={`${dropdownBtnClass} ${form.objective ? "text-ink" : "text-mut-2"}`}>
          <span className="truncate">{selectedObjectiveLabel}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-4 shrink-0 text-mut"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        {objectiveMenuOpen && (
          <div className="surface-card absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl p-1">
            {objectiveOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => { updateField("objective", option.value); setObjectiveMenuOpen(false); }} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${form.objective === option.value ? "bg-[rgba(124,92,255,0.2)] text-ink" : "text-mut hover:bg-white/[0.05] hover:text-ink"}`}>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  function TypeClientDropdown() {
    return (
      <div className="relative">
        <button type="button" onClick={() => setTypeClientMenuOpen((current) => !current)} className={`${dropdownBtnClass} ${form.type_client ? "text-ink" : "text-mut-2"}`}>
          <span>{selectedTypeClientLabel}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-4 shrink-0 text-mut"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        {TypeClientMenuOpen && (
          <div className="surface-card absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl p-1">
            {typeclientOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => { updateField("type_client", option.value); setTypeClientMenuOpen(false); }} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${form.type_client === option.value ? "bg-[rgba(124,92,255,0.2)] text-ink" : "text-mut hover:bg-white/[0.05] hover:text-ink"}`}>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="relative">
      {/* HERO */}
      <section className="px-7 pb-12 pt-44 lg:pt-52">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-2 text-sm font-medium text-ink" style={{ background: "var(--grad-soft)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Diagnostic OptimalLogic · 15 minutes
            </div>
            <h1 className="max-w-4xl text-[clamp(38px,5.4vw,62px)] font-semibold">
              Réservez un diagnostic gratuit.
              <span className="grad-text"> On clarifie votre besoin en 15 minutes.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mut">
              Choisissez un créneau disponible, renseignez votre contexte, puis nous préparons l’échange pour identifier la meilleure action à mettre en place.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {diagnosticBenefits.map((benefit) => (
                <div key={benefit} className="surface-card rounded-2xl p-4">
                  <div className="mb-3 h-[3px] w-10 rounded-full" style={{ background: "var(--grad)" }} />
                  <p className="text-sm font-semibold leading-6 text-mut">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card rounded-[26px] p-5">
            <div className="rounded-[20px] border border-white/[0.07] p-6" style={{ background: "linear-gradient(165deg, rgba(16,20,42,0.9), rgba(8,10,22,0.9))" }}>
              <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Objectif du RDV</p>
              <h2 className="mt-4 font-display text-2xl font-semibold">Passer d’un besoin flou à une action digitale claire.</h2>
              <div className="mt-7 space-y-3">
                {preparationItems.map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] p-4" style={{ background: "rgba(16,20,42,0.5)" }}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white" style={{ background: "var(--grad)" }}>{index + 1}</span>
                    <span className="text-sm font-medium text-mut">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/[0.13] p-4" style={{ background: "var(--grad-soft)" }}>
                <p className="text-sm font-semibold text-ink">À la fin de l’échange</p>
                <p className="mt-2 text-sm leading-6 text-mut">Vous saurez quelle priorité traiter : visibilité, conversion, suivi prospect ou automatisation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="px-7 py-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8">
            <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Réservation</p>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,40px)] font-semibold">Sélectionnez votre créneau.</h2>
          </div>

          <div className="surface-card overflow-hidden rounded-[28px]">
            <div className="grid lg:grid-cols-[0.72fr_1.05fr_0.78fr]">
              {/* Left panel */}
              <aside className="border-b border-white/[0.07] p-6 sm:p-8 lg:border-b-0 lg:border-r" style={{ background: "linear-gradient(165deg, rgba(16,20,42,0.6), rgba(8,10,22,0.6))" }}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl font-display text-sm font-bold text-white" style={{ background: "var(--grad)" }}>OL</div>
                <p className="mt-6 eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">OptimalLogic</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">Diagnostic gratuit</h3>
                <div className="mt-7 grid gap-3">
                  {appointmentDetails.map((detail) => (
                    <div key={detail.label} className="rounded-2xl border border-white/[0.07] p-4" style={{ background: "rgba(16,20,42,0.5)" }}>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{detail.icon}</span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mut-2">{detail.label}</p>
                          <p className="mt-1 text-sm font-semibold text-ink">{detail.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedSlot ? (
                  <div className="mt-8 rounded-2xl border border-white/[0.13] p-5" style={{ background: "var(--grad-soft)" }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mut-2">Créneau choisi</p>
                    <p className="mt-3 text-sm font-bold capitalize text-ink">{formatDateLabel(selectedSlot.slice(0, 10))}</p>
                    <p className="mt-1 text-sm text-mut">{formatTimeLabel(selectedSlot)}</p>
                  </div>
                ) : (
                  <div className="mt-8 rounded-2xl border border-white/[0.07] p-5 text-sm leading-6 text-mut" style={{ background: "rgba(16,20,42,0.5)" }}>
                    Choisissez une date disponible, puis un horaire pour débloquer la confirmation du rendez-vous.
                  </div>
                )}
              </aside>

              {/* Calendar */}
              <section className="border-b border-white/[0.07] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Calendrier</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold capitalize">{formatMonthLabel(currentMonth)}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={goToPreviousMonth} aria-label="Mois précédent" className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.13] text-ink transition hover:bg-white/[0.08]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button type="button" onClick={goToNextMonth} aria-label="Mois suivant" className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.13] text-ink transition hover:bg-white/[0.08]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </div>
                </div>

                {isLoadingSlots && (
                  <div className="mt-8 rounded-2xl border border-white/[0.07] p-6" style={{ background: "rgba(16,20,42,0.5)" }}>
                    <div className="h-3 w-40 animate-pulse rounded-full bg-white/10" />
                    <div className="mt-4 grid grid-cols-7 gap-2">
                      {Array.from({ length: 21 }).map((_, index) => (
                        <div key={index} className="aspect-square animate-pulse rounded-xl bg-white/[0.06]" />
                      ))}
                    </div>
                  </div>
                )}

                {slotsError && (
                  <div className="mt-8 rounded-2xl border border-[rgba(255,77,109,0.4)] p-5 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>{slotsError}</div>
                )}

                {!isLoadingSlots && !slotsError && (
                  <>
                    <div className="mt-8 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-mut-2">
                      <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                    </div>
                    <div className="mt-3 grid grid-cols-7 gap-2">
                      {calendarDays.map((day) => {
                        const isAvailable = availableDateSet.has(day.dateKey);
                        const isSelected = selectedDate === day.dateKey;
                        return (
                          <button
                            key={day.dateKey}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => { setSelectedDate(day.dateKey); setSelectedSlot(""); }}
                            className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition ${
                              isSelected
                                ? "text-white shadow-[0_10px_24px_-10px_rgba(124,92,255,0.9)]"
                                : isAvailable
                                  ? "border border-white/[0.13] bg-white/[0.03] text-ink hover:border-indigo hover:bg-[rgba(124,92,255,0.12)]"
                                  : day.isCurrentMonth
                                    ? "cursor-not-allowed text-mut-2/60"
                                    : "cursor-not-allowed text-mut-2/30"
                            }`}
                            style={isSelected ? { background: "var(--grad)" } : undefined}
                          >
                            {day.date.getDate()}
                            {day.isToday && !isSelected && <span className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-emerald" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-mut">
                      <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--grad)" }} /><span>Disponible</span></div>
                      <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span>Indisponible</span></div>
                      <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald" /><span>Aujourd’hui</span></div>
                    </div>
                  </>
                )}
              </section>

              {/* Slots */}
              <section className="p-6 sm:p-8" style={{ background: "rgba(8,10,22,0.4)" }}>
                <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Créneaux</p>
                <h3 className="mt-2 font-display text-2xl font-semibold capitalize">{selectedDate ? formatShortDateLabel(selectedDate) : "Choisissez une date"}</h3>

                {!selectedDate && <p className="mt-6 text-sm leading-6 text-mut">Sélectionnez une date disponible dans le calendrier.</p>}

                {selectedDate && selectedDateSlots.length === 0 && (
                  <p className="mt-6 rounded-2xl border border-white/[0.07] p-4 text-sm leading-6 text-mut" style={{ background: "rgba(16,20,42,0.5)" }}>Aucun créneau disponible pour cette date.</p>
                )}

                <div className="mt-6 grid gap-2">
                  {selectedDateSlots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => setSelectedSlot(slot.start)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        selectedSlot === slot.start
                          ? "border-transparent text-white shadow-[0_10px_24px_-10px_rgba(124,92,255,0.9)]"
                          : "border-white/[0.13] bg-white/[0.03] text-ink hover:border-indigo hover:bg-[rgba(124,92,255,0.12)]"
                      }`}
                      style={selectedSlot === slot.start ? { background: "var(--grad)" } : undefined}
                    >
                      {formatTimeLabel(slot.start)}
                    </button>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(16,20,42,0.5)" }}>
                  <p className="text-sm font-bold text-ink">Conseil avant de réserver</p>
                  <p className="mt-2 text-sm leading-6 text-mut">Choisissez un créneau où vous pouvez parler librement de votre activité, de vos objectifs et de vos difficultés actuelles.</p>
                </div>
              </section>
            </div>
          </div>

          {/* FORM */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <aside className="surface-card rounded-[28px] p-6 sm:p-8">
              <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Préparation</p>
              <h2 className="mt-3 font-display text-2xl font-semibold">Les informations utiles avant l’échange.</h2>
              <p className="mt-4 text-sm leading-7 text-mut">Le formulaire permet de comprendre rapidement votre contexte et de rendre le diagnostic plus efficace.</p>
              <div className="mt-7 space-y-3">
                {["Qui vous êtes", "Votre activité", "Votre objectif principal", "Vos liens existants"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/[0.07] px-4 py-3 text-sm font-semibold text-mut" style={{ background: "rgba(16,20,42,0.5)" }}>{item}</div>
                ))}
              </div>
            </aside>

            <section className="surface-card rounded-[28px] p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Informations</p>
                <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)] font-semibold">Confirmez votre rendez-vous</h2>
                <p className="mt-4 text-base leading-7 text-mut">Ces informations nous permettent de préparer le diagnostic avant l’échange.</p>
              </div>

              {bookingSuccess ? (
                <div className="rounded-[24px] border border-white/[0.13] p-8 text-center" style={{ background: "var(--grad-soft)" }}>
                  <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full text-white" style={{ background: "var(--grad)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 className="font-display text-2xl font-semibold">Rendez-vous confirmé</h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-mut">Votre diagnostic a bien été réservé. Vous recevrez une confirmation par email, et votre demande est enregistrée dans notre système de suivi.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}><span className={labelTextClass}>Nom de famille *</span><input value={form.lastname} onChange={(e) => updateField("lastname", e.target.value)} placeholder="Votre nom" className={fieldClass} /></label>
                    <label className={labelClass}><span className={labelTextClass}>Prénom *</span><input value={form.firstname} onChange={(e) => updateField("firstname", e.target.value)} placeholder="Votre prénom" className={fieldClass} /></label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}><span className={labelTextClass}>E-mail *</span><input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="vous@email.com" className={fieldClass} /></label>
                    <label className={labelClass}>
                      <span className={labelTextClass}>Numéro de téléphone *</span>
                      <div className={phoneWrapperClass}>
                        <PhoneInput international defaultCountry="FR" value={form.phoneFullNumber} onChange={(value) => updateField("phoneFullNumber", value || "")} placeholder="06 12 34 56 78" className="phone-input-custom" />
                      </div>
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}><span className={labelTextClass}>Entreprise</span><input value={form.company} onChange={(e) => updateField("company", e.target.value)} placeholder="Nom de votre entreprise" className={fieldClass} /></label>
                    <label className={labelClass}><span className={labelTextClass}>Ville du business</span><input value={form.businessCity} onChange={(e) => updateField("businessCity", e.target.value)} placeholder="Ex : Rouen, Paris, Lyon..." className={fieldClass} /></label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}><span className={labelTextClass}>Type de client *</span><TypeClientDropdown /></label>
                    <label className={labelClass}><span className={labelTextClass}>Objectif principal *</span><ObjectiveDropdown /></label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}><span className={labelTextClass}>Site web actuel</span><input value={form.businessWebsiteUrl} onChange={(e) => updateField("businessWebsiteUrl", e.target.value)} placeholder="https://www.votre-site.com" className={fieldClass} /></label>
                    <label className={labelClass}><span className={labelTextClass}>Lien Google Business</span><input value={form.googleBusinessUrl} onChange={(e) => updateField("googleBusinessUrl", e.target.value)} placeholder="Lien vers votre fiche Google Business" className={fieldClass} /></label>
                  </div>
                  <label className={labelClass}><span className={labelTextClass}>Votre message</span><textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={6} placeholder="Expliquez rapidement votre besoin ou le sujet du rendez-vous." className={textareaClass} /></label>

                  {selectedSlot && (
                    <div className="rounded-xl border border-white/[0.13] p-4 text-sm text-mut" style={{ background: "var(--grad-soft)" }}>
                      Créneau choisi : <span className="font-bold text-ink">{formatDateLabel(selectedSlot.slice(0, 10))} à {formatTimeLabel(selectedSlot)}</span>
                    </div>
                  )}

                  {bookingError && (
                    <div className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]" style={{ background: "rgba(255,77,109,0.1)" }}>{bookingError}</div>
                  )}

                  <label className="flex items-start gap-3 rounded-xl border border-white/[0.1] p-4 text-[13px] leading-5 text-mut" style={{ background: "rgba(16,20,42,0.45)" }}>
                    <input type="checkbox" required checked={form.consentRgpd} onChange={(e) => updateField("consentRgpd", e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#7c5cff]" />
                    <span>J’accepte que mes informations soient utilisées par OptimalLogic pour préparer le rendez-vous, traiter ma demande et me recontacter.</span>
                  </label>

                  <button type="submit" disabled={isBooking} className="btn-grad mt-2 inline-flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
                    {isBooking ? "Confirmation en cours..." : "Confirmer le rendez-vous"}
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
