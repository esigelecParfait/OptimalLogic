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

type ObjectiveOption = {
  value: string;
  label: string;
};
type TypeClientOption={
  value:string;
  label:string;
}
const typeclientOptions:TypeClientOption[]=[
  {
    value: "commerce",
    label: "Commerce",
  },
  {
    value:"tpe_pme",
    label: "TPE/PME",
  },
  {
    value:"startup",
    label: "Startup",
  }
]
const objectiveOptions: ObjectiveOption[] = [
  {
    value: "plus_appels_reservations",
    label: "Plus d’appels ou de réservations",
  },
  {
    value: "plus_devis_qualifies",
    label: "Plus de devis ou demandes qualifiées",
  },
  {
    value: "mieux_suivre_prospects",
    label: "Mieux suivre les prospects",
  },
  {
    value: "ameliorer_image",
    label: "Améliorer mon image professionnelle",
  },
  {
    value: "lancer_offre",
    label: "Lancer ou tester une offre",
  },
  {
    value: "automatiser_reponses",
    label: "Automatiser les réponses aux clients",
  },
  {
    value: "incertain",
    label: "Je ne sais pas encore",
  },
];

const diagnosticBenefits = [
  "Identifier votre blocage principal",
  "Clarifier la solution la plus adaptée",
  "Définir une première action concrète",
];

const appointmentDetails = [
  {
    icon: "⏱",
    label: "Durée",
    value: "15 minutes",
  },
  {
    icon: "🌍",
    label: "Fuseau horaire",
    value: "Europe/Paris",
  },
  {
    icon: "💻",
    label: "Lieu",
    value: "En ligne",
  },
];

const preparationItems = [
  "Votre activité",
  "Votre objectif prioritaire",
  "Votre présence digitale actuelle",
  "Vos points de blocage",
];

const labelClass = "grid gap-2";
const labelTextClass = "text-sm font-semibold text-slate-700";

const fieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5";

const selectClass =
  "h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm outline-none transition focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5";

const phoneWrapperClass =
  "flex h-12 w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-slate-950 focus-within:bg-white focus-within:ring-4 focus-within:ring-slate-950/5";

const textareaClass =
  "min-h-[140px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5";

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
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
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

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(date);
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

  if (!cleaned) {
    return null;
  }

  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    return cleaned;
  }

  return `https://${cleaned}`;
}

function getTrackingPayload() {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
    };
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
    objectiveOptions.find((option) => option.value === form.objective)?.label ||
    "Choisissez un objectif";
  const selectedTypeClientLabel =
    typeclientOptions.find((option) => option.value === form.type_client)?.label ||
    "Choisissez un Type de client";
  useEffect(() => {
    async function loadSlots() {
      try {
        setIsLoadingSlots(true);
        setSlotsError(null);

        const start = new Date().toISOString();
        const end = addDays(new Date(), 30).toISOString();

        const params = new URLSearchParams({
          start,
          end,
        });

        const response = await fetch(`/api/cal/slots?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Impossible de récupérer les créneaux.",
          );
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
        setSlotsError(
          error instanceof Error
            ? error.message
            : "Impossible de récupérer les créneaux.",
        );
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

  const availableDateSet = useMemo(() => {
    return new Set(Object.keys(slots));
  }, [slots]);

  const calendarDays = useMemo(() => {
    return getCalendarDays(currentMonth);
  }, [currentMonth]);

  const selectedDateSlots = useMemo(() => {
    return slots[selectedDate] || [];
  }, [slots, selectedDate]);

  

  function updateField<K extends keyof AppointmentForm>(
    field: K,
    value: AppointmentForm[K],
  ) {
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
      setBookingError(
        "Vous devez accepter l’utilisation de vos informations pour être recontacté.",
      );
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
        type_client:form.type_client,
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Impossible de confirmer le rendez-vous.",
        );
      }

      setBookingSuccess(true);

      // Supprime immédiatement le créneau réservé de l'affichage
      const bookedSlot = selectedSlot;
      setSlots((current) => {
        const dateKey = bookedSlot.slice(0, 10);
        const filtered = (current[dateKey] ?? []).filter(
          (s) => s.start !== bookedSlot,
        );
        if (filtered.length === 0) {
          const updated = { ...current };
          delete updated[dateKey];
          return updated;
        }
        return { ...current, [dateKey]: filtered };
      });

      // Re-synchronise avec Cal.com pour propager aux autres utilisateurs
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
      setBookingError(
        error instanceof Error
          ? error.message
          : "Impossible de confirmer le rendez-vous.",
      );
    } finally {
      setIsBooking(false);
    }
  }
  function ObjectiveDropdown() {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setObjectiveMenuOpen((current) => !current)}
          className={`flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm outline-none transition focus:border-slate-400 focus:bg-white ${
            form.objective ? "text-slate-950" : "text-slate-400"
          }`}
        >
          <span>{selectedObjectiveLabel}</span>
          <span className="ml-4 text-xs text-slate-400">⌄</span>
        </button>

        {objectiveMenuOpen && (
          <div className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/80">
            {objectiveOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  updateField("objective", option.value);
                  setObjectiveMenuOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                  form.objective === option.value
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
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
        <button
          type="button"
          onClick={() => setTypeClientMenuOpen((current) => !current)}
          className={`flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm outline-none transition focus:border-slate-400 focus:bg-white ${
            form.type_client ? "text-slate-950" : "text-slate-400"
          }`}
        >
          <span>{selectedTypeClientLabel}</span>
          <span className="ml-4 text-xs text-slate-400">⌄</span>
        </button>

        {TypeClientMenuOpen && (
          <div className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/80">
            {typeclientOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  updateField("type_client", option.value);
                  setTypeClientMenuOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                  form.type_client === option.value
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <style jsx global>{`
        .phone-input-custom {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          min-width: 0;
        }

        .phone-input-custom .PhoneInputCountry {
          display: flex;
          align-items: center;
          align-self: stretch;
          min-width: 4.75rem;
          margin-right: 0.75rem;
          padding-right: 0.75rem;
          border-right: 1px solid rgb(226 232 240);
        }

        .phone-input-custom .PhoneInputCountrySelect {
          cursor: pointer;
        }

        .phone-input-custom .PhoneInputCountryIcon {
          width: 1.6rem;
          height: 1.1rem;
          overflow: hidden;
          border-radius: 0.25rem;
          background: transparent;
          box-shadow: none;
        }

        .phone-input-custom .PhoneInputCountrySelectArrow {
          width: 0.45rem;
          height: 0.45rem;
          margin-left: 0.55rem;
          color: rgb(71 85 105);
          opacity: 0.8;
        }

        .phone-input-custom .PhoneInputInput {
          width: 100%;
          min-width: 0;
          height: 100%;
          border: none;
          background: transparent;
          color: rgb(15 23 42);
          font-size: 0.875rem;
          font-weight: 500;
          outline: none;
        }

        .phone-input-custom .PhoneInputInput::placeholder {
          color: rgb(148 163 184);
          font-weight: 400;
        }

        @media (max-width: 640px) {
          .phone-input-custom .PhoneInputCountry {
            min-width: 4.25rem;
            margin-right: 0.6rem;
            padding-right: 0.6rem;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#e2e8f0,transparent_35%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/3 rounded-full bg-slate-200 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              Diagnostic OptimalLogic · 15 minutes
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Réservez un diagnostic gratuit.
              <span className="block text-slate-500">
                On clarifie votre besoin en 15 minutes.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Choisissez un créneau disponible, renseignez votre contexte, puis
              nous préparons l’échange pour identifier la meilleure action à
              mettre en place.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {diagnosticBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 h-2 w-10 rounded-full bg-slate-950" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/80">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Objectif du RDV
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight">
                Passer d’un besoin flou à une action digitale claire.
              </h2>

              <div className="mt-7 space-y-3">
                {preparationItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-100">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-4 text-slate-950">
                <p className="text-sm font-semibold">À la fin de l’échange</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Vous saurez quelle priorité traiter : visibilité, conversion,
                  suivi prospect ou automatisation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Réservation
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Sélectionnez votre créneau.
              </h2>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
            <div className="grid lg:grid-cols-[0.72fr_1.05fr_0.78fr]">
              {/* Left panel */}
              <aside className="border-b border-slate-200 bg-slate-950 p-6 text-white sm:p-8 lg:border-b-0 lg:border-r lg:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950">
                  OL
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  OptimalLogic
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  Diagnostic gratuit
                </h3>

                <div className="mt-7 grid gap-3">
                  {appointmentDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{detail.icon}</span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            {detail.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSlot ? (
                  <div className="mt-8 rounded-3xl bg-white p-5 text-slate-950">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Créneau choisi
                    </p>
                    <p className="mt-3 text-sm font-bold capitalize">
                      {formatDateLabel(selectedSlot.slice(0, 10))}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatTimeLabel(selectedSlot)}
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300">
                    Choisissez une date disponible, puis un horaire pour
                    débloquer la confirmation du rendez-vous.
                  </div>
                )}
              </aside>

              {/* Calendar */}
              <section className="border-b border-slate-200 bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Calendrier
                    </p>
                    <h3 className="mt-2 text-2xl font-bold capitalize text-slate-950">
                      {formatMonthLabel(currentMonth)}
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-950 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                      aria-label="Mois précédent"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-950 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                      aria-label="Mois suivant"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {isLoadingSlots && (
                  <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="h-3 w-40 animate-pulse rounded-full bg-slate-200" />
                    <div className="mt-4 grid grid-cols-7 gap-2">
                      {Array.from({ length: 21 }).map((_, index) => (
                        <div
                          key={index}
                          className="aspect-square animate-pulse rounded-2xl bg-slate-200/70"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {slotsError && (
                  <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
                    {slotsError}
                  </div>
                )}

                {!isLoadingSlots && !slotsError && (
                  <>
                    <div className="mt-8 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
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
                            className={`relative flex aspect-square items-center justify-center rounded-2xl text-sm font-semibold transition ${
                              isSelected
                                ? "bg-slate-950 text-white shadow-lg shadow-slate-300"
                                : isAvailable
                                  ? "bg-slate-50 text-slate-950 hover:bg-slate-950 hover:text-white"
                                  : day.isCurrentMonth
                                    ? "cursor-not-allowed text-slate-300"
                                    : "cursor-not-allowed text-slate-200"
                            }`}
                          >
                            {day.date.getDate()}

                            {day.isToday && !isSelected && (
                              <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-slate-950" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
                        <span>Disponible</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <span>Indisponible</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full border border-slate-950 bg-white" />
                        <span>Aujourd’hui</span>
                      </div>
                    </div>
                  </>
                )}
              </section>

              {/* Slots */}
              <section className="bg-slate-50 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Créneaux
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {selectedDate
                    ? formatShortDateLabel(selectedDate)
                    : "Choisissez une date"}
                </h3>

                {!selectedDate && (
                  <p className="mt-6 text-sm leading-6 text-slate-600">
                    Sélectionnez une date disponible dans le calendrier.
                  </p>
                )}

                {selectedDate && selectedDateSlots.length === 0 && (
                  <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                    Aucun créneau disponible pour cette date.
                  </p>
                )}

                <div className="mt-6 grid gap-2">
                  {selectedDateSlots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => setSelectedSlot(slot.start)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        selectedSlot === slot.start
                          ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-300"
                          : "border-slate-200 bg-white text-slate-950 hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                      }`}
                    >
                      {formatTimeLabel(slot.start)}
                    </button>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-bold text-slate-950">
                    Conseil avant de réserver
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Choisissez un créneau où vous pouvez parler librement de
                    votre activité, de vos objectifs et de vos difficultés
                    actuelles.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Form */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Préparation
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                Les informations utiles avant l’échange.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Le formulaire permet de comprendre rapidement votre contexte et
                de rendre le diagnostic plus efficace.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Qui vous êtes",
                  "Votre activité",
                  "Votre objectif principal",
                  "Vos liens existants",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/80 sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Informations
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Confirmez votre rendez-vous
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Ces informations nous permettent de préparer le diagnostic
                  avant l’échange.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="rounded-[2rem] bg-slate-950 p-8 text-center text-white">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-950">
                    ✓
                  </div>

                  <h3 className="text-2xl font-bold">Rendez-vous confirmé</h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
                    Votre diagnostic a bien été réservé. Vous recevrez une
                    confirmation par email, et votre demande est enregistrée
                    dans notre système de suivi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      <span className={labelTextClass}>Nom de famille *</span>
                      <input
                        value={form.lastname}
                        onChange={(event) =>
                          updateField("lastname", event.target.value)
                        }
    

                        placeholder="Votre nom"
                        className={fieldClass}
                      />
                    </label>

                    <label className={labelClass}>
                      <span className={labelTextClass}>Prénom *</span>
                      <input
                        value={form.firstname}
                        onChange={(event) =>
                          updateField("firstname", event.target.value)
                        }
                  
                        placeholder="Votre prénom"
                        className={fieldClass}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      <span className={labelTextClass}>E-mail *</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        
                        placeholder="vous@email.com"
                        className={fieldClass}
                      />
                    </label>

                    <label className={labelClass}>
                      <span className={labelTextClass}>
                        Numéro de téléphone *
                      </span>

                      <div className={phoneWrapperClass}>
                        <PhoneInput
                          international
                          defaultCountry="FR"
                          value={form.phoneFullNumber}
                          onChange={(value) =>
                            updateField("phoneFullNumber", value || "")
                          }
                          placeholder="06 12 34 56 78"
                          className="phone-input-custom"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      <span className={labelTextClass}>Entreprise</span>
                      <input
                        value={form.company}
                        onChange={(event) =>
                          updateField("company", event.target.value)
                        }
                        placeholder="Nom de votre entreprise"
                        className={fieldClass}
                      />
                    </label>

                    <label className={labelClass}>
                      <span className={labelTextClass}>Ville du business</span>
                      <input
                        value={form.businessCity}
                        onChange={(event) =>
                          updateField("businessCity", event.target.value)
                        }
                        placeholder="Ex : Rouen, Paris, Lyon..."
                        className={fieldClass}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                    <span className={labelTextClass}>Type de Client *</span>
                    <TypeClientDropdown />
                  </label>

                     <label className={labelClass}>
                    <span className={labelTextClass}>Objectif principal</span>
                    <ObjectiveDropdown />
                  </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      <span className={labelTextClass}>Site web actuel</span>
                      <input
                        value={form.businessWebsiteUrl}
                        onChange={(event) =>
                          updateField("businessWebsiteUrl", event.target.value)
                        }
                        placeholder="https://www.votre-site.com"
                        className={fieldClass}
                      />
                    </label>

                    <label className={labelClass}>
                      <span className={labelTextClass}>
                        Lien Google Business
                      </span>
                      <input
                        value={form.googleBusinessUrl}
                        onChange={(event) =>
                          updateField("googleBusinessUrl", event.target.value)
                        }
                        placeholder="Lien vers votre fiche Google Business"
                        className={fieldClass}
                      />
                    </label>
                  </div>

                  <label className={labelClass}>
                    <span className={labelTextClass}>Votre message</span>
                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      rows={6}
                      placeholder="Expliquez rapidement votre besoin ou le sujet du rendez-vous."
                      className={textareaClass}
                    />
                  </label>

                  {selectedSlot && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      Créneau choisi :{" "}
                      <span className="font-bold text-slate-950">
                        {formatDateLabel(selectedSlot.slice(0, 10))} à{" "}
                        {formatTimeLabel(selectedSlot)}
                      </span>
                    </div>
                  )}

                  {bookingError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {bookingError}
                    </div>
                  )}

                  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                    <input
                      type="checkbox"
                      required
                      checked={form.consentRgpd}
                      onChange={(event) =>
                        updateField("consentRgpd", event.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 accent-slate-950"
                    />

                    <span>
                      J’accepte que mes informations soient utilisées par
                      OptimalLogic pour préparer le rendez-vous, traiter ma
                      demande et me recontacter.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isBooking}
                    className="mt-2 inline-flex justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isBooking
                      ? "Confirmation en cours..."
                      : "Confirmer le rendez-vous"}
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
