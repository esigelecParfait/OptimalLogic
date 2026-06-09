"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

type Slot = {
  start: string;
};

type SlotMap = Record<string, Slot[]>;

type AppointmentForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  clientType: string;
  objective: string;
  message: string;
};

const clientTypes = [
  { value: "commerce", label: "Commerce local" },
  { value: "tpe_pme", label: "TPE / PME" },
  { value: "startup", label: "Startup" },
  { value: "autre", label: "Autre" },
];

const objectives = [
  { value: "plus_appels_reservations", label: "Obtenir plus d’appels ou de réservations" },
  { value: "plus_devis_qualifies", label: "Recevoir plus de devis qualifiés" },
  { value: "mieux_suivre_prospects", label: "Mieux suivre mes prospects" },
  { value: "ameliorer_image", label: "Améliorer mon image professionnelle" },
  { value: "lancer_offre", label: "Lancer ou tester une offre" },
  { value: "automatiser_reponses", label: "Automatiser les réponses clients" },
  { value: "incertain", label: "Je ne sais pas encore" },
];

function formatDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00`);

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(date);
}

function formatTimeLabel(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).format(new Date(value));
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export default function PriseDeRdvPage() {
  const [slots, setSlots] = useState<SlotMap>({});
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [form, setForm] = useState<AppointmentForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    clientType: "",
    objective: "",
    message: "",
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
        const end = addDays(new Date(), 14).toISOString();

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

        setSlots(result.data || {});
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

  const flattenedSlots = useMemo(() => {
    return Object.entries(slots).flatMap(([date, dateSlots]) =>
      dateSlots.map((slot) => ({
        date,
        start: slot.start,
      }))
    );
  }, [slots]);

  function updateField<K extends keyof AppointmentForm>(
    field: K,
    value: AppointmentForm[K]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setBookingError(null);

    if (!selectedSlot) {
      setBookingError("Choisissez un créneau.");
      return;
    }

    if (!form.firstName || !form.lastName || !form.email) {
      setBookingError("Le nom, le prénom et l’email sont obligatoires.");
      return;
    }

    try {
      setIsBooking(true);

      const response = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: selectedSlot,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          clientType: form.clientType,
          objective: form.objective,
          message: form.message,
        }),
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

        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.75rem;
        }
      `}</style>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm">
            Diagnostic OptimalLogic · 15 min
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-7xl">
                Réservez un diagnostic gratuit.
                <span className="block text-black/55">
                  On clarifie votre besoin en 15 minutes.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">
                Choisissez un créneau, indiquez votre contexte, et nous vous
                orientons vers la solution la plus adaptée : visibilité,
                site web, suivi client ou automatisation.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Ce rendez-vous sert à
              </p>

              <ul className="mt-6 grid gap-3 text-sm leading-6 text-black/65">
                <li>• comprendre votre activité</li>
                <li>• identifier le blocage principal</li>
                <li>• choisir une formule adaptée</li>
                <li>• définir la prochaine action concrète</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              1. Créneau
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Choisissez un horaire
            </h2>

            {isLoadingSlots && (
              <p className="mt-6 text-sm text-black/60">
                Chargement des créneaux...
              </p>
            )}

            {slotsError && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {slotsError}
              </div>
            )}

            {!isLoadingSlots && !slotsError && flattenedSlots.length === 0 && (
              <p className="mt-6 text-sm text-black/60">
                Aucun créneau disponible pour le moment.
              </p>
            )}

            <div className="mt-6 grid gap-5">
              {Object.entries(slots).map(([date, dateSlots]) => (
                <div key={date}>
                  <p className="mb-3 text-sm font-semibold capitalize text-black">
                    {formatDateLabel(date)}
                  </p>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {dateSlots.map((slot) => (
                      <button
                        key={slot.start}
                        type="button"
                        onClick={() => setSelectedSlot(slot.start)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          selectedSlot === slot.start
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-[#f7f4ef] text-black hover:border-black/40 hover:bg-white"
                        }`}
                      >
                        {formatTimeLabel(slot.start)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              2. Informations
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Confirmez votre rendez-vous
            </h2>

            {bookingSuccess ? (
              <div className="mt-8 rounded-[2rem] bg-black p-8 text-center text-white">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                  ✓
                </div>
                <h3 className="text-2xl font-semibold">
                  Rendez-vous confirmé
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Votre diagnostic a bien été réservé. Vous recevrez une
                  confirmation par email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="mt-8 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">
                      Prénom *
                    </span>
                    <input
                      required
                      value={form.firstName}
                      onChange={(event) =>
                        updateField("firstName", event.target.value)
                      }
                      placeholder="Votre prénom"
                      className="h-12 rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">
                      Nom *
                    </span>
                    <input
                      required
                      value={form.lastName}
                      onChange={(event) =>
                        updateField("lastName", event.target.value)
                      }
                      placeholder="Votre nom"
                      className="h-12 rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">
                      Email *
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="vous@email.com"
                      className="h-12 rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">
                      Téléphone
                    </span>

                    <div className="rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 transition focus-within:border-black/40 focus-within:bg-white">
                      <PhoneInput
                        international
                        defaultCountry="FR"
                        value={form.phone}
                        onChange={(value) =>
                          updateField("phone", value || "")
                        }
                        className="phone-input-custom"
                      />
                    </div>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-black/70">
                    Entreprise
                  </span>
                  <input
                    value={form.company}
                    onChange={(event) =>
                      updateField("company", event.target.value)
                    }
                    placeholder="Nom de votre entreprise"
                    className="h-12 rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">
                      Type de client
                    </span>
                    <select
                      value={form.clientType}
                      onChange={(event) =>
                        updateField("clientType", event.target.value)
                      }
                      className="h-12 rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition focus:border-black/40 focus:bg-white"
                    >
                      <option value="">Choisir</option>
                      {clientTypes.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-black/70">
                      Objectif
                    </span>
                    <select
                      value={form.objective}
                      onChange={(event) =>
                        updateField("objective", event.target.value)
                      }
                      className="h-12 rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 text-sm outline-none transition focus:border-black/40 focus:bg-white"
                    >
                      <option value="">Choisir</option>
                      {objectives.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-black/70">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    placeholder="Expliquez rapidement votre besoin."
                    className="resize-none rounded-2xl border border-black/10 bg-[#f7f4ef] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:bg-white"
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
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {bookingError}
                  </div>
                )}

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
          </section>
        </div>
      </section>
    </main>
  );
}