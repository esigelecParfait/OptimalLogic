"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
  type Country,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Bot,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  PhoneCall,
  Rocket,
  Search,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
};

export const commonObjectiveOptions: SelectOption[] = [
  {
    value: "plus_appels_reservations",
    label: "Plus d’appels ou de réservations",
    description: "Générer plus de contacts directs depuis votre présence digitale.",
    icon: PhoneCall,
  },
  {
    value: "plus_devis_qualifies",
    label: "Plus de devis ou demandes qualifiées",
    description: "Recevoir des demandes plus claires, plus sérieuses et mieux cadrées.",
    icon: FileText,
  },
  {
    value: "mieux_suivre_prospects",
    label: "Mieux suivre les prospects",
    description: "Centraliser les demandes et éviter de perdre les contacts intéressés.",
    icon: UsersRound,
  },
  {
    value: "ameliorer_image",
    label: "Améliorer mon image professionnelle",
    description: "Rendre votre présence digitale plus crédible et rassurante.",
    icon: BadgeCheck,
  },
  {
    value: "lancer_offre",
    label: "Lancer ou tester une offre",
    description: "Présenter une offre, mesurer l’intérêt et générer les premiers retours.",
    icon: Rocket,
  },
  {
    value: "automatiser_reponses",
    label: "Automatiser les réponses aux clients",
    description: "Répondre plus vite aux questions récurrentes et mieux guider les prospects.",
    icon: Bot,
  },
  {
    value: "incertain",
    label: "Je ne sais pas encore",
    description: "Nous vous aiderons à identifier le vrai besoin lors du diagnostic.",
    icon: CircleHelp,
  },
];

type PhoneFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  labelClassName: string;
  labelTextClassName: string;
  required?: boolean;
  placeholder?: string;
};

type ObjectiveSelectFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  labelClassName: string;
  labelTextClassName: string;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
};

type PremiumPhoneControlProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type ObjectiveSelectControlProps = {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
};

type PremiumSelectControlProps = ObjectiveSelectControlProps;

const premiumControlClass =
  "min-h-14 w-full rounded-2xl border border-white/[0.16] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(16,20,42,0.82))] text-sm text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.18)] outline-none transition-all focus-within:border-indigo focus-within:ring-2 focus-within:ring-[rgba(124,92,255,0.24)]";

const priorityCountries: Country[] = [
  "FR",
  "BE",
  "CH",
  "CM",
  "CA",
  "US",
  "GB",
  "DE",
  "ES",
  "IT",
];

function getSafeCallingCode(country: Country) {
  try {
    return getCountryCallingCode(country);
  } catch {
    return "";
  }
}

function countryToFlagEmoji(country: string) {
  return country
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

function CountryFlag({ country }: { country: Country }) {
  const FlagComponent = flags[country] as
    | ComponentType<{ title?: string }>
    | undefined;

  if (FlagComponent) {
    return (
      <span className="grid h-5 w-7 shrink-0 place-items-center overflow-hidden rounded-[5px] bg-white/10 [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover">
        <FlagComponent title={country} />
      </span>
    );
  }

  return (
    <span className="grid h-5 w-7 shrink-0 place-items-center text-[18px] leading-none">
      {countryToFlagEmoji(country)}
    </span>
  );
}

type PremiumCountrySelectProps = {
  value?: Country;
  onChange: (country?: Country) => void;
  disabled?: boolean;
};

function PremiumCountrySelect({
  value,
  onChange,
  disabled = false,
}: PremiumCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const countryNames = useMemo(() => {
    if (typeof Intl !== "undefined" && "DisplayNames" in Intl) {
      return new Intl.DisplayNames(["fr"], { type: "region" });
    }

    return null;
  }, []);

  const countries = useMemo(() => {
    return getCountries()
      .map((country) => {
        const priorityIndex = priorityCountries.indexOf(country);

        return {
          value: country,
          label: countryNames?.of(country) || country,
          callingCode: getSafeCallingCode(country),
          priority: priorityIndex === -1 ? 999 : priorityIndex,
        };
      })
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }

        return a.label.localeCompare(b.label, "fr");
      });
  }, [countryNames]);

  const selectedCountry = (value || "FR") as Country;

  const selected =
    countries.find((country) => country.value === selectedCountry) ||
    countries.find((country) => country.value === "FR") ||
    countries[0];

  const filteredCountries = countries.filter((country) => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      country.label.toLowerCase().includes(search) ||
      country.value.toLowerCase().includes(search) ||
      `+${country.callingCode}`.includes(search)
    );
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        type="button"
        disabled={disabled}
        aria-label="Choisir le pays"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-sm font-semibold text-ink transition hover:border-white/[0.2] hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CountryFlag country={selected.value} />
        <span className="tabular-nums">+{selected.callingCode}</span>
        <ChevronDown
          size={15}
          strokeWidth={2.2}
          className={`text-mut transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-[340px] max-w-[calc(100vw-48px)] overflow-hidden rounded-2xl border border-white/[0.14] bg-[#080b18]/95 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="mb-2 flex h-11 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.06] px-3">
            <Search size={15} strokeWidth={2} className="shrink-0 text-mut" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un pays ou un indicatif"
              className="h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-mut-2"
            />
          </div>

          <div className="max-h-[280px] overflow-y-auto pr-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.value === selected.value;

                return (
                  <button
                    key={country.value}
                    type="button"
                    onClick={() => {
                      onChange(country.value);
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isSelected
                        ? "bg-[rgba(124,92,255,0.2)] text-ink"
                        : "text-mut hover:bg-white/[0.06] hover:text-ink"
                    }`}
                  >
                    <CountryFlag country={country.value} />

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {country.label}
                      </span>
                      <span className="block text-xs text-mut-2">
                        {country.value}
                      </span>
                    </span>

                    <span className="rounded-full border border-white/[0.1] bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-ink">
                      +{country.callingCode}
                    </span>

                    {isSelected ? (
                      <Check size={16} strokeWidth={2.2} className="text-cyan" />
                    ) : null}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-6 text-center text-sm text-mut">
                Aucun pays trouvé.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PremiumPhoneField({
  label = "Téléphone",
  value,
  onChange,
  labelClassName,
  labelTextClassName,
  required = false,
  placeholder = "06 12 34 56 78",
}: PhoneFieldProps) {
  return (
    <label className={labelClassName}>
      <span className={labelTextClassName}>
        {label}
        {required ? " *" : ""}
      </span>

      <PremiumPhoneControl
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export function PremiumPhoneControl({
  value,
  onChange,
  placeholder = "06 12 34 56 78",
}: PremiumPhoneControlProps) {
  return (
    <div
      className={`premium-phone-field premium-control relative flex items-center px-3 py-2 ${premiumControlClass}`}
    >
      <PhoneInput
        defaultCountry="FR"
        countrySelectComponent={PremiumCountrySelect}
        value={value || undefined}
        onChange={(nextValue) => onChange(nextValue || "")}
        placeholder={placeholder}
        className="phone-input-custom flex w-full items-center gap-3 [&_.PhoneInputCountry]:m-0 [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:px-0 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:font-medium [&_.PhoneInputInput]:text-ink [&_.PhoneInputInput]:outline-none"
      />
    </div>
  );
}

export function ObjectiveSelectField({
  label = "Objectif principal",
  value,
  onChange,
  labelClassName,
  labelTextClassName,
  required = false,
  placeholder = "Choisissez un objectif",
  options = commonObjectiveOptions,
}: ObjectiveSelectFieldProps) {
  return (
    <label className={labelClassName}>
      <span className={labelTextClassName}>
        {label}
        {required ? " *" : ""}
      </span>

      <PremiumSelectControl
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
      />
    </label>
  );
}

export function ObjectiveSelectControl({
  value,
  onChange,
  required = false,
  placeholder = "Choisissez un objectif",
  options = commonObjectiveOptions,
}: ObjectiveSelectControlProps) {
  return (
    <PremiumSelectControl
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
    />
  );
}

export function PremiumSelectControl({
  value,
  onChange,
  required = false,
  placeholder = "Choisissez une option",
  options = commonObjectiveOptions,
}: PremiumSelectControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);
  const SelectedIcon = selectedOption?.icon || Sparkles;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        data-required={required ? "true" : "false"}
        onClick={() => setIsOpen((current) => !current)}
        className={`premium-select-field premium-control flex items-center justify-between gap-4 px-4 py-3 text-left ${premiumControlClass}`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
              selectedOption
                ? "border-cyan/25 bg-cyan/10 text-cyan"
                : "border-white/[0.12] bg-white/[0.06] text-mut"
            }`}
          >
            {selectedOption ? (
              <SelectedIcon size={18} strokeWidth={1.9} />
            ) : (
              <Target size={18} strokeWidth={1.9} />
            )}
          </span>

          <span className="min-w-0">
            <span
              className={`block truncate text-sm font-semibold ${
                selectedOption ? "text-ink" : "text-mut-2"
              }`}
            >
              {selectedOption?.label || placeholder}
            </span>

            {selectedOption?.description ? (
              <span className="mt-0.5 hidden truncate text-xs text-mut-2 sm:block">
                {selectedOption.description}
              </span>
            ) : null}
          </span>
        </span>

        <ChevronDown
          size={18}
          strokeWidth={2.2}
          className={`shrink-0 text-mut transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 overflow-hidden rounded-2xl border border-white/[0.14] bg-[#080b18]/95 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <div className="max-h-[340px] overflow-y-auto pr-1">
            {options.map((option) => {
              const Icon = option.icon || Target;
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isSelected
                      ? "bg-[rgba(124,92,255,0.2)] text-ink"
                      : "text-mut hover:bg-white/[0.06] hover:text-ink"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
                      isSelected
                        ? "border-cyan/25 bg-cyan/10 text-cyan"
                        : "border-white/[0.1] bg-white/[0.05] text-mut"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.9} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {option.label}
                    </span>

                    {option.description ? (
                      <span className="mt-1 block text-xs leading-5 text-mut-2">
                        {option.description}
                      </span>
                    ) : null}
                  </span>

                  {isSelected ? (
                    <Check size={17} strokeWidth={2.2} className="mt-2 text-cyan" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}