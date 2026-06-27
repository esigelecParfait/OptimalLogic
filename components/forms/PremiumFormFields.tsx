"use client";

import PhoneInput from "react-phone-number-input";
import { ChevronDown } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
};

export const commonObjectiveOptions: SelectOption[] = [
  { value: "plus_appels_reservations", label: "Plus d'appels ou de reservations" },
  { value: "plus_devis_qualifies", label: "Plus de devis ou demandes qualifiees" },
  { value: "mieux_suivre_prospects", label: "Mieux suivre les prospects" },
  { value: "ameliorer_image", label: "Ameliorer mon image professionnelle" },
  { value: "lancer_offre", label: "Lancer ou tester une offre" },
  { value: "automatiser_reponses", label: "Automatiser les reponses aux clients" },
  { value: "incertain", label: "Je ne sais pas encore" },
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
  "min-h-14 w-full rounded-2xl border border-white/[0.16] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(16,20,42,0.82))] px-4 text-sm text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.18)] outline-none transition-all focus-within:border-indigo focus-within:ring-2 focus-within:ring-[rgba(124,92,255,0.24)]";

export function PremiumPhoneField({
  label = "Numero de telephone",
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
      <div className={`premium-phone-field premium-control flex items-center ${premiumControlClass}`}>
        <PhoneInput
          international
          defaultCountry="FR"
          countryCallingCodeEditable={false}
          value={value}
          onChange={(nextValue) => onChange(nextValue || "")}
          placeholder={placeholder}
          className="phone-input-custom"
        />
      </div>
    </label>
  );
}

export function PremiumPhoneControl({
  value,
  onChange,
  placeholder = "06 12 34 56 78",
}: PremiumPhoneControlProps) {
  return (
    <div className={`premium-phone-field premium-control flex items-center ${premiumControlClass}`}>
      <PhoneInput
        international
        defaultCountry="FR"
        countryCallingCodeEditable={false}
        value={value}
        onChange={(nextValue) => onChange(nextValue || "")}
        placeholder={placeholder}
        className="phone-input-custom"
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
      <div className="relative">
        <select
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${premiumControlClass} appearance-none py-3 pr-11 ${
            value ? "text-ink" : "text-mut-2"
          }`}
        >
          <option value="" disabled className="bg-surface text-ink">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface text-ink">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={2.2}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mut"
        />
      </div>
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
  return (
    <div className="relative">
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`premium-select-field premium-control ${premiumControlClass} appearance-none py-3 pr-11 ${
          value ? "text-ink" : "text-mut-2"
        }`}
      >
        <option value="" disabled className="bg-surface text-ink">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface text-ink">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={2.2}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mut"
      />
    </div>
  );
}
