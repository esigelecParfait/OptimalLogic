"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { parsePhoneNumber } from "react-phone-number-input";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Globe2,
  Laptop,
  MessageCircle,
  MousePointer2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

import NeuralBackground from "@/components/fx/NeuralBackground";
import {
  ObjectiveSelectField,
  PremiumPhoneField,
  PremiumSelectControl,
} from "@/components/forms/PremiumFormFields";

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
type IconItem = { icon: LucideIcon; label: string; value?: string; description?: string };

const typeClientOptions: TypeClientOption[] = [
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

const diagnosticBenefits: IconItem[] = [
  {
    icon: Target,
    label: "Blocage principal",
    description: "Identifier ce qui freine aujourd’hui vos demandes.",
  },
  {
    icon: Sparkles,
    label: "Solution adaptée",
    description: "Clarifier les leviers vraiment utiles pour votre activité.",
  },
  {
    icon: ArrowRight,
    label: "Première action",
    description: "Repartir avec une priorité concrète à traiter.",
  },
];

const appointmentDetails: IconItem[] = [
  { icon: Clock3, label: "Durée", value: "15 minutes" },
  { icon: Globe2, label: "Fuseau horaire", value: "Europe/Paris" },
  { icon: Laptop, label: "Lieu", value: "En ligne" },
];

const preparationItems: IconItem[] = [
  { icon: UsersRound, label: "Votre activité" },
  { icon: Target, label: "Votre objectif prioritaire" },
  { icon: MousePointer2, label: "Votre présence digitale actuelle" },
  { icon: MessageCircle, label: "Vos points de blocage" },
];

const formPreparationItems: IconItem[] = [
  { icon: UsersRound, label: "Qui vous êtes" },
  { icon: FileText, label: "Votre activité" },
  { icon: Target, label: "Votre objectif principal" },
  { icon: MousePointer2, label: "Vos liens existants" },
];

const labelClass = "grid gap-2";
const labelTextClass = "text-[11px] font-semibold uppercase tracking-[0.1em] text-mut-2";
const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.72)] px-4 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";
const textareaClass =
  "min-h-[132px] w-full resize-none rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.72)] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mut-2 focus:border-indigo focus:ring-2 focus:ring-[rgba(124,92,255,0.18)]";
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
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(date);
}

function formatShortDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00`);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(date);
}

function formatTimeLabel(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).format(new Date(value));
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

function IconFrame({ icon: Icon, compact = false }: { icon: LucideIcon; compact?: boolean }) {
  return (
    <div
      className={`${compact ? "h-9 w-9 rounded-xl" : "h-12 w-12 rounded-2xl"} grid shrink-0 place-items-center border border-white/[0.13] text-cyan`}
      style={{ background: "rgba(124,92,255,0.14)" }}
    >
      <Icon size={compact ? 18 : 22} strokeWidth={1.8} />
    </div>
  );
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

  useEffect(() => {
    async function loadSlots() {
      try {
        setIsLoadingSlots(true);
        setSlotsError(null);

        const start = new Date().toISOString();
        const end = addDays(new Date(), 30).toISOString();
        const params = new URLSearchParams({ start, end });

        const response = await fetch(`/api/cal/slots?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });
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
        const response = await fetch(`/api/cal/slots?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const result = await response.json();
        setSlots(result.data || {});
      } catch {
        // Les erreurs de rafraîchissement en arrière-plan ne doivent pas bloquer l'utilisateur.
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
      const resetSelection = window.setTimeout(() => {
        setSelectedDate("");
        setSelectedSlot("");
      }, 0);

      return () => window.clearTimeout(resetSelection);
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

    if (!form.type_client) {
      setBookingError("Veuillez sélectionner un type de client.");
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
        // Le rendez-vous est déjà confirmé. Le rafraîchissement post-confirmation est secondaire.
      }
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Impossible de confirmer le rendez-vous.");
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden px-7 pb-14 pt-44 lg:pt-52">
        <NeuralBackground />

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,5,11,0.3) 0%, rgba(4,5,11,0.76) 70%, rgba(4,5,11,1) 100%)",
          }}
        />

        <div className="relative z-[2] mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.13] px-4 py-2 text-sm font-medium text-ink"
              style={{ background: "var(--grad-soft)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              Diagnostic OptimalLogic · 15 minutes
            </div>

            <h1 className="max-w-4xl text-[clamp(38px,5.3vw,62px)] font-semibold leading-[1.03]">
              Réservez un diagnostic gratuit.
              <span className="grad-text"> On clarifie votre besoin en 15 minutes.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-mut">
              Choisissez un créneau, partagez votre contexte, puis nous identifions la priorité digitale la plus utile pour votre activité : visibilité, conversion, suivi ou automatisation.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {diagnosticBenefits.map((benefit) => (
                <div key={benefit.label} className="surface-card group rounded-2xl p-4 transition hover:-translate-y-1 hover:border-white/[0.13]">
                  <IconFrame icon={benefit.icon} compact />
                  <p className="mt-4 text-sm font-semibold text-ink">{benefit.label}</p>
                  <p className="mt-2 text-xs leading-5 text-mut">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card rounded-[30px] p-5 shadow-[0_30px_120px_-70px_rgba(124,92,255,0.85)]">
            <div
              className="relative overflow-hidden rounded-[24px] border border-white/[0.07] p-6"
              style={{ background: "linear-gradient(165deg, rgba(16,20,42,0.9), rgba(8,10,22,0.88))" }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[80px]"
                style={{ background: "rgba(124,92,255,0.35)" }}
              />
              <div className="relative z-[1]">
                <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Objectif du RDV</p>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-tight">
                  Passer d’un besoin flou à une action digitale claire.
                </h2>

                <div className="mt-7 space-y-3">
                  {preparationItems.map((item, index) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.07] p-4"
                      style={{ background: "rgba(16,20,42,0.52)" }}
                    >
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white"
                        style={{ background: "var(--grad)" }}
                      >
                        {index + 1}
                      </span>
                      <IconFrame icon={item.icon} compact />
                      <span className="text-sm font-medium text-mut">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/[0.13] p-4" style={{ background: "var(--grad-soft)" }}>
                  <p className="text-sm font-semibold text-ink">À la fin de l’échange</p>
                  <p className="mt-2 text-sm leading-6 text-mut">
                    Vous savez quelle priorité traiter : Google Business, site web, parcours de contact, suivi prospect ou assistant IA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="relative z-[2] px-7 py-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Réservation</p>
              <h2 className="mt-3 text-[clamp(28px,3.6vw,40px)] font-semibold">Sélectionnez votre créneau.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-mut">
              Les créneaux affichés sont actualisés automatiquement pour éviter les doubles réservations.
            </p>
          </div>

          <div className="surface-card overflow-hidden rounded-[32px] shadow-[0_35px_120px_-90px_rgba(31,213,240,0.75)]">
            <div className="grid lg:grid-cols-[0.76fr_1.08fr_0.82fr]">
              {/* Left panel */}
              <aside
                className="border-b border-white/[0.07] p-6 sm:p-8 lg:border-b-0 lg:border-r"
                style={{ background: "linear-gradient(165deg, rgba(16,20,42,0.66), rgba(8,10,22,0.7))" }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl font-display text-sm font-bold text-white" style={{ background: "var(--grad)" }}>
                  OL
                </div>

                <p className="mt-6 eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">OptimalLogic</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">Diagnostic gratuit</h3>
                <p className="mt-3 text-sm leading-6 text-mut">
                  Un échange court pour comprendre votre contexte et définir la prochaine action utile.
                </p>

                <div className="mt-7 grid gap-3">
                  {appointmentDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-2xl border border-white/[0.07] p-4"
                      style={{ background: "rgba(16,20,42,0.5)" }}
                    >
                      <div className="flex items-start gap-3">
                        <IconFrame icon={detail.icon} compact />
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
                  <div
                    className="mt-8 rounded-2xl border border-white/[0.07] p-5 text-sm leading-6 text-mut"
                    style={{ background: "rgba(16,20,42,0.5)" }}
                  >
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
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      aria-label="Mois précédent"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.13] text-ink transition hover:bg-white/[0.08]"
                    >
                      <ChevronLeft size={18} strokeWidth={2.4} />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextMonth}
                      aria-label="Mois suivant"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.13] text-ink transition hover:bg-white/[0.08]"
                    >
                      <ChevronRight size={18} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>

                {isLoadingSlots && (
                  <div className="mt-8 rounded-2xl border border-white/[0.07] p-6" style={{ background: "rgba(16,20,42,0.5)" }}>
                    <div className="flex items-center gap-3 text-sm font-semibold text-mut">
                      <RefreshCw size={16} className="animate-spin" /> Chargement des créneaux disponibles
                    </div>
                    <div className="mt-5 grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }).map((_, index) => (
                        <div key={index} className="aspect-square animate-pulse rounded-xl bg-white/[0.06]" />
                      ))}
                    </div>
                  </div>
                )}

                {slotsError && (
                  <div
                    className="mt-8 rounded-2xl border border-[rgba(255,77,109,0.4)] p-5 text-sm font-medium text-[#ff9db1]"
                    style={{ background: "rgba(255,77,109,0.1)" }}
                  >
                    {slotsError}
                  </div>
                )}

                {!isLoadingSlots && !slotsError && (
                  <>
                    <div className="mt-8 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-mut-2">
                      <span>Lun</span>
                      <span>Mar</span>
                      <span>Mer</span>
                      <span>Jeu</span>
                      <span>Ven</span>
                      <span>Sam</span>
                      <span>Dim</span>
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
                            onClick={() => {
                              setSelectedDate(day.dateKey);
                              setSelectedSlot("");
                            }}
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
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--grad)" }} />
                        <span>Disponible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span>Indisponible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald" />
                        <span>Aujourd’hui</span>
                      </div>
                    </div>
                  </>
                )}
              </section>

              {/* Slots */}
              <section className="p-6 sm:p-8" style={{ background: "rgba(8,10,22,0.42)" }}>
                <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Créneaux</p>
                <h3 className="mt-2 font-display text-2xl font-semibold capitalize">
                  {selectedDate ? formatShortDateLabel(selectedDate) : "Choisissez une date"}
                </h3>

                {!selectedDate && <p className="mt-6 text-sm leading-6 text-mut">Sélectionnez une date disponible dans le calendrier.</p>}

                {selectedDate && selectedDateSlots.length === 0 && (
                  <p
                    className="mt-6 rounded-2xl border border-white/[0.07] p-4 text-sm leading-6 text-mut"
                    style={{ background: "rgba(16,20,42,0.5)" }}
                  >
                    Aucun créneau disponible pour cette date.
                  </p>
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
                  <div className="flex items-start gap-3">
                    <IconFrame icon={ShieldCheck} compact />
                    <div>
                      <p className="text-sm font-bold text-ink">Conseil avant de réserver</p>
                      <p className="mt-2 text-sm leading-6 text-mut">
                        Choisissez un créneau où vous pouvez parler librement de votre activité, de vos objectifs et de vos difficultés actuelles.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* FORM */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="surface-card rounded-[28px] p-6 sm:p-8">
              <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Préparation</p>
              <h2 className="mt-3 font-display text-2xl font-semibold">Les informations utiles avant l’échange.</h2>
              <p className="mt-4 text-sm leading-7 text-mut">
                Le formulaire permet de comprendre rapidement votre contexte et de rendre le diagnostic plus efficace.
              </p>

              <div className="mt-7 space-y-3">
                {formPreparationItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/[0.07] px-4 py-3 text-sm font-semibold text-mut"
                    style={{ background: "rgba(16,20,42,0.5)" }}
                  >
                    <IconFrame icon={item.icon} compact />
                    {item.label}
                  </div>
                ))}
              </div>
            </aside>

            <section className="surface-card rounded-[28px] p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Informations</p>
                <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)] font-semibold">Confirmez votre rendez-vous</h2>
                <p className="mt-4 text-base leading-7 text-mut">
                  Ces informations nous permettent de préparer le diagnostic avant l’échange.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="rounded-[24px] border border-white/[0.13] p-8 text-center" style={{ background: "var(--grad-soft)" }}>
                  <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full text-white" style={{ background: "var(--grad)" }}>
                    <CheckCircle2 size={30} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">Rendez-vous confirmé</h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-mut">
                    Votre diagnostic a bien été réservé. Vous recevrez une confirmation par email, et votre demande est enregistrée dans notre système de suivi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="grid gap-7">
                  <div className="rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(16,20,42,0.38)" }}>
                    <div className="mb-5 flex items-center gap-3">
                      <IconFrame icon={UsersRound} compact />
                      <h3 className="font-display text-lg font-semibold">Vos coordonnées</h3>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        <span className={labelTextClass}>Nom de famille *</span>
                        <input
                          value={form.lastname}
                          onChange={(e) => updateField("lastname", e.target.value)}
                          placeholder="Votre nom"
                          className={fieldClass}
                        />
                      </label>
                      <label className={labelClass}>
                        <span className={labelTextClass}>Prénom *</span>
                        <input
                          value={form.firstname}
                          onChange={(e) => updateField("firstname", e.target.value)}
                          placeholder="Votre prénom"
                          className={fieldClass}
                        />
                      </label>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        <span className={labelTextClass}>E-mail *</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="vous@email.com"
                          className={fieldClass}
                        />
                      </label>
                      <PremiumPhoneField
                        required
                        value={form.phoneFullNumber}
                        onChange={(value) => updateField("phoneFullNumber", value)}
                        labelClassName={labelClass}
                        labelTextClassName={labelTextClass}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(16,20,42,0.38)" }}>
                    <div className="mb-5 flex items-center gap-3">
                      <IconFrame icon={FileText} compact />
                      <h3 className="font-display text-lg font-semibold">Votre activité</h3>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        <span className={labelTextClass}>Entreprise</span>
                        <input
                          value={form.company}
                          onChange={(e) => updateField("company", e.target.value)}
                          placeholder="Nom de votre entreprise"
                          className={fieldClass}
                        />
                      </label>
                      <label className={labelClass}>
                        <span className={labelTextClass}>Ville du business</span>
                        <input
                          value={form.businessCity}
                          onChange={(e) => updateField("businessCity", e.target.value)}
                          placeholder="Ex : Rouen, Paris, Lyon..."
                          className={fieldClass}
                        />
                      </label>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        <span className={labelTextClass}>Type de client *</span>
                        <PremiumSelectControl
                          required
                          value={form.type_client}
                          onChange={(value) => updateField("type_client", value)}
                          placeholder="Choisissez un type de client"
                          options={typeClientOptions}
                        />
                      </label>
                      <ObjectiveSelectField
                        required
                        value={form.objective}
                        onChange={(value) => updateField("objective", value)}
                        options={objectiveOptions}
                        labelClassName={labelClass}
                        labelTextClassName={labelTextClass}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(16,20,42,0.38)" }}>
                    <div className="mb-5 flex items-center gap-3">
                      <IconFrame icon={MousePointer2} compact />
                      <h3 className="font-display text-lg font-semibold">Présence digitale actuelle</h3>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        <span className={labelTextClass}>Site web actuel</span>
                        <input
                          value={form.businessWebsiteUrl}
                          onChange={(e) => updateField("businessWebsiteUrl", e.target.value)}
                          placeholder="https://www.votre-site.com"
                          className={fieldClass}
                        />
                      </label>
                      <label className={labelClass}>
                        <span className={labelTextClass}>Lien Google Business</span>
                        <input
                          value={form.googleBusinessUrl}
                          onChange={(e) => updateField("googleBusinessUrl", e.target.value)}
                          placeholder="Lien vers votre fiche Google Business"
                          className={fieldClass}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(16,20,42,0.38)" }}>
                    <label className={labelClass}>
                      <span className={labelTextClass}>Votre message</span>
                      <textarea
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        rows={6}
                        placeholder="Expliquez rapidement votre besoin ou le sujet du rendez-vous."
                        className={textareaClass}
                      />
                    </label>
                  </div>

                  {selectedSlot && (
                    <div className="rounded-xl border border-white/[0.13] p-4 text-sm text-mut" style={{ background: "var(--grad-soft)" }}>
                      Créneau choisi :{" "}
                      <span className="font-bold capitalize text-ink">
                        {formatDateLabel(selectedSlot.slice(0, 10))} à {formatTimeLabel(selectedSlot)}
                      </span>
                    </div>
                  )}

                  {bookingError && (
                    <div
                      className="rounded-xl border border-[rgba(255,77,109,0.4)] px-4 py-3 text-sm font-medium text-[#ff9db1]"
                      style={{ background: "rgba(255,77,109,0.1)" }}
                    >
                      {bookingError}
                    </div>
                  )}

                  <label
                    className="flex items-start gap-3 rounded-xl border border-white/[0.1] p-4 text-[13px] leading-5 text-mut"
                    style={{ background: "rgba(16,20,42,0.45)" }}
                  >
                    <input
                      type="checkbox"
                      required
                      checked={form.consentRgpd}
                      onChange={(e) => updateField("consentRgpd", e.target.checked)}
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#7c5cff]"
                    />
                    <span>
                      J’accepte que mes informations soient utilisées par OptimalLogic pour préparer le rendez-vous, traiter ma demande et me recontacter.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isBooking}
                    className="btn-grad mt-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isBooking ? "Confirmation en cours..." : "Confirmer le rendez-vous"}
                    {!isBooking && <CalendarCheck size={18} strokeWidth={2} />}
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
