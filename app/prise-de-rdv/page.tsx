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
  activity: string;
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

const labelClass = "grid gap-2";
const labelTextClass = "text-sm font-semibold text-black/70";

const fieldClass =
  "h-12 w-full rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white";

const textareaClass =
  "min-h-[140px] w-full resize-none rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white";

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
    activity: "",
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
            result.error || "Impossible de récupérer les créneaux."
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
            : "Impossible de récupérer les créneaux."
        );
      } finally {
        setIsLoadingSlots(false);
      }
    }

    loadSlots();
  }, []);

  const availableDateSet = useMemo(() => {
    return new Set(Object.keys(slots));
  }, [slots]);

  const calendarDays = useMemo(() => {
    return getCalendarDays(currentMonth);
  }, [currentMonth]);

  const selectedDateSlots = useMemo(() => {
    return slots[selectedDate] || [];
  }, [slots, selectedDate]);

  const selectedObjectiveLabel =
    objectiveOptions.find((option) => option.value === form.objective)?.label ||
    "";

  function updateField<K extends keyof AppointmentForm>(
    field: K,
    value: AppointmentForm[K]
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
        "Vous devez accepter l’utilisation de vos informations pour être recontacté."
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
        activity: cleanOptionalText(form.activity),
        objective: form.objective,
        objectiveLabel: selectedObjectiveLabel,
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
          result.error || "Impossible de confirmer le rendez-vous."
        );
      }

      setBookingSuccess(true);
    } catch (error) {
      setBookingError(
        error instanceof Error
          ? error.message
          : "Impossible de confirmer le rendez-vous."
      );
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <style jsx global>{`
        .phone-input-custom {
          width: 100%;
        }

        .phone-input-custom .PhoneInputInput {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 0.875rem;
          outline: none;
        }

        .phone-input-custom .PhoneInputInput::placeholder {
          color: rgb(0 0 0 / 0.35);
        }

        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.75rem;
        }

        .phone-input-custom .PhoneInputCountrySelectArrow {
          opacity: 0.45;
        }
      `}</style>

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-20">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm backdrop-blur">
            Diagnostic OptimalLogic · 15 min
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-7xl">
                Réservez un diagnostic gratuit.
                <span className="block text-black/55">
                  On clarifie votre besoin en 15 minutes.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">
                Choisissez un créneau disponible, puis indiquez votre contexte.
                Le rendez-vous sera confirmé par Cal.com et enregistré dans
                notre système de suivi.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Ce rendez-vous sert à
              </p>

              <ul className="mt-6 grid gap-3 text-sm leading-6 text-black/65">
                <li>• comprendre votre activité</li>
                <li>• identifier votre blocage principal</li>
                <li>• choisir la bonne solution digitale</li>
                <li>• définir une première action concrète</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl shadow-black/5">
            <div className="grid lg:grid-cols-[0.75fr_1.05fr_0.8fr]">
              <aside className="border-b border-black/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  OL
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-black/40">
                  OptimalLogic
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black">
                  Diagnostic gratuit
                </h2>

                <div className="mt-6 grid gap-3 text-sm text-black/65">
                  <p className="flex items-center gap-2">
                    <span>⏱</span>
                    <span>15 minutes</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🌍</span>
                    <span>Europe/Paris</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span>
                    <span>En ligne</span>
                  </p>
                </div>

                {selectedSlot && (
                  <div className="mt-8 rounded-2xl bg-[#f7f4ef] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                      Créneau choisi
                    </p>
                    <p className="mt-2 text-sm font-semibold text-black">
                      {formatDateLabel(selectedSlot.slice(0, 10))}
                    </p>
                    <p className="mt-1 text-sm text-black/65">
                      {formatTimeLabel(selectedSlot)}
                    </p>
                  </div>
                )}
              </aside>

              <section className="border-b border-black/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/40">
                      Sélectionner une date
                    </p>
                    <h3 className="mt-2 text-xl font-semibold capitalize text-black">
                      {formatMonthLabel(currentMonth)}
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-[#f7f4ef]"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-[#f7f4ef]"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {isLoadingSlots && (
                  <div className="mt-8 rounded-2xl bg-[#f7f4ef] p-5 text-sm text-black/60">
                    Chargement des disponibilités...
                  </div>
                )}

                {slotsError && (
                  <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                    {slotsError}
                  </div>
                )}

                {!isLoadingSlots && !slotsError && (
                  <>
                    <div className="mt-8 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-black/35">
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
                            className={`relative flex aspect-square items-center justify-center rounded-full text-sm font-semibold transition ${
                              isSelected
                                ? "bg-black text-white"
                                : isAvailable
                                  ? "bg-[#f7f4ef] text-black hover:bg-black hover:text-white"
                                  : day.isCurrentMonth
                                    ? "text-black/25"
                                    : "text-black/10"
                            }`}
                          >
                            {day.date.getDate()}

                            {day.isToday && !isSelected && (
                              <span className="absolute bottom-2 h-1 w-1 rounded-full bg-black/50" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-center gap-4 text-xs text-black/45">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-black" />
                        <span>Disponible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                        <span>Indisponible</span>
                      </div>
                    </div>
                  </>
                )}
              </section>

              <section className="p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/40">
                  Créneaux
                </p>

                <h3 className="mt-2 text-xl font-semibold text-black">
                  {selectedDate
                    ? formatShortDateLabel(selectedDate)
                    : "Choisissez une date"}
                </h3>

                {!selectedDate && (
                  <p className="mt-6 text-sm leading-6 text-black/60">
                    Sélectionnez une date disponible dans le calendrier.
                  </p>
                )}

                {selectedDate && selectedDateSlots.length === 0 && (
                  <p className="mt-6 text-sm leading-6 text-black/60">
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
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white text-black hover:border-black hover:bg-[#f7f4ef]"
                      }`}
                    >
                      {formatTimeLabel(slot.start)}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Informations
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Confirmez votre rendez-vous
              </h2>

              <p className="mt-4 text-base leading-7 text-black/65">
                Ces informations nous permettent de préparer le diagnostic
                avant l’échange.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="rounded-[2rem] bg-black p-8 text-center text-white">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                  ✓
                </div>

                <h3 className="text-2xl font-semibold">
                  Rendez-vous confirmé
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  Votre diagnostic a bien été réservé. Vous recevrez une
                  confirmation par email, et votre demande est enregistrée dans
                  notre système de suivi.
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
                      required
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
                      required
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
                      required
                      placeholder="vous@email.com"
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span className={labelTextClass}>
                      Numéro de téléphone *
                    </span>

                    <div className="rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 transition focus-within:border-black/40 focus-within:bg-white">
                      <PhoneInput
                        international
                        defaultCountry="FR"
                        value={form.phoneFullNumber}
                        onChange={(value) =>
                          updateField("phoneFullNumber", value || "")
                        }
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
                    <span className={labelTextClass}>Type d’activité</span>
                    <input
                      value={form.activity}
                      onChange={(event) =>
                        updateField("activity", event.target.value)
                      }
                      placeholder="Ex : restaurant, BTP, SaaS..."
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span className={labelTextClass}>Objectif principal *</span>
                    <select
                      value={form.objective}
                      onChange={(event) =>
                        updateField("objective", event.target.value)
                      }
                      required
                      className={fieldClass}
                    >
                      <option value="">Choisissez un objectif</option>
                      {objectiveOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
                    <span className={labelTextClass}>Lien Google Business</span>
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
                  <div className="rounded-2xl bg-[#f7f4ef] p-4 text-sm text-black/70">
                    Créneau choisi :{" "}
                    <span className="font-semibold text-black">
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

                <label className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 text-xs leading-5 text-black/60">
                  <input
                    type="checkbox"
                    required
                    checked={form.consentRgpd}
                    onChange={(event) =>
                      updateField("consentRgpd", event.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-black/20"
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
                  className="mt-2 inline-flex justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isBooking
                    ? "Confirmation en cours..."
                    : "Confirmer le rendez-vous"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}