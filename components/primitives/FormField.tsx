import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./forms.module.css";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & (
  | ({ as?: "input" } & ComponentPropsWithoutRef<"input">)
  | ({ as: "textarea" } & ComponentPropsWithoutRef<"textarea">)
  | ({ as: "select"; children: ReactNode } & ComponentPropsWithoutRef<"select">)
);

// L'aide et l'erreur sont reliées au champ, y compris pour les lecteurs d'écran.
export function FormField(props: FieldProps) {
  const { label, hint, error, id, ...control } = props;
  const describedBy =
    [hint && id + "-hint", error && id + "-error", props["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined;
  const shared = {
    id,
    className: styles.control,
    "aria-invalid": error ? (true as const) : props["aria-invalid"],
    "aria-describedby": describedBy,
  };
  let field;
  if (control.as === "textarea") {
    const { as: _as, ...rest } = control;
    void _as;
    field = <textarea {...rest} {...shared} />;
  } else if (control.as === "select") {
    const { as: _as, ...rest } = control;
    void _as;
    field = <select {...rest} {...shared} />;
  } else {
    const { as: _as, ...rest } = control;
    void _as;
    field = <input {...rest} {...shared} />;
  }
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {props.required ? " *" : ""}
      </label>
      {hint && (
        <p id={id + "-hint"} className={styles.hint}>
          {hint}
        </p>
      )}
      {field}
      {error && (
        <p id={id + "-error"} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export function Checkbox({
  label,
  ...props
}: ComponentPropsWithoutRef<"input"> & { label: string }) {
  return (
    <label className={styles.checkbox}>
      <input {...props} type="checkbox" />
      <span>{label}</span>
    </label>
  );
}
