"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/primitives";
import {
  getAuthVariant,
  type AuthFamily,
  type AuthState,
  type RegistrationMode,
} from "@/design-system/auth";

import styles from "./auth.module.css";

type Props = {
  variantId: string;
  state: AuthState;
  registrationMode: RegistrationMode;
};

const content: Record<
  AuthFamily,
  { eyebrow: string; title: string; description: string; action: string }
> = {
  "sign-in": {
    eyebrow: "Espace sécurisé",
    title: "Heureuse de vous revoir",
    description: "Accédez à votre espace client.",
    action: "Se connecter",
  },
  "sign-up": {
    eyebrow: "Créer un accès",
    title: "Rejoindre votre espace",
    description: "L’inscription dépend des règles définies par le site.",
    action: "Créer mon compte",
  },
  activation: {
    eyebrow: "Invitation reçue",
    title: "Activer votre accès",
    description: "Définissez vos informations pour finaliser l’invitation.",
    action: "Activer mon compte",
  },
  recovery: {
    eyebrow: "Accès oublié",
    title: "Retrouver votre compte",
    description: "Si le compte existe, un email de récupération sera envoyé.",
    action: "Envoyer les instructions",
  },
  verification: {
    eyebrow: "Dernière vérification",
    title: "Vérifiez votre email",
    description: "Utilisez le lien reçu pour confirmer votre adresse.",
    action: "Renvoyer l’email",
  },
};

export function AuthStage({ variantId, state, registrationMode }: Props) {
  const variant = getAuthVariant(variantId);
  const copy = content[variant.family];
  const [showPassword, setShowPassword] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const nameId = useId();
  const preventSubmission = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
  const registrationBlocked =
    variant.family === "sign-up" && registrationMode === "disabled";
  const terminal = registrationBlocked ? "disabled" : state;

  return (
    <article
      className={styles.stage}
      data-layout={variant.layout}
      data-auth-state={terminal}
      data-auth-family={variant.family}
    >
      <BrandPanel family={variant.family} />
      <div className={styles.formPanel}>
        <div className={styles.brandMark} aria-label="Marque du site client">
          OL
        </div>
        <div className={styles.intro}>
          <span>{copy.eyebrow}</span>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <AuthFeedback state={terminal} />
        {!isTerminalState(terminal) && (
          <form onSubmit={preventSubmission} noValidate data-demo-form="true">
            {(variant.family === "sign-up" || variant.family === "activation") && (
              <label htmlFor={nameId}>
                Nom complet
                <input
                  id={nameId}
                  name="name"
                  autoComplete="name"
                  defaultValue={state === "valid" ? "Compte de démonstration" : ""}
                  aria-invalid={state === "invalid" || undefined}
                />
              </label>
            )}
            <label htmlFor={emailId}>
              Adresse email
              <input
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                defaultValue={state === "valid" ? "demo@exemple.fr" : ""}
                aria-invalid={state === "invalid" || undefined}
                aria-describedby={state === "invalid" ? `${emailId}-error` : undefined}
              />
              {state === "invalid" && (
                <small id={`${emailId}-error`}>
                  Vérifiez le format des informations saisies.
                </small>
              )}
            </label>
            {requiresPassword(variant.family) && (
              <label htmlFor={passwordId}>
                Mot de passe
                <div className={styles.passwordField}>
                  <input
                    id={passwordId}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      variant.family === "sign-in" ? "current-password" : "new-password"
                    }
                    defaultValue={state === "valid" ? "Demonstration-2026" : ""}
                    aria-invalid={state === "invalid" || undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>
                {variant.family !== "sign-in" && <PasswordCriteria />}
              </label>
            )}
            {variant.family === "sign-up" && registrationMode === "invite_only" && (
              <div className={styles.invitation} role="note">
                <strong>Inscription sur invitation</strong>
                <span>Une invitation valide sera exigée par le backend.</span>
              </div>
            )}
            <Button type="submit" loading={state === "loading"}>
              {copy.action}
            </Button>
            <a className={styles.secondaryLink} href="#auth-showroom">
              Retour à la connexion
            </a>
          </form>
        )}
        <p className={styles.demoNotice}>
          Démonstration d’interface — aucune donnée n’est transmise.
        </p>
      </div>
      {variant.layout === "guided" && (
        <ol className={styles.steps}>
          <li data-active="true">Identité</li>
          <li>Sécurité</li>
          <li>Confirmation</li>
        </ol>
      )}
    </article>
  );
}

function BrandPanel({ family }: { family: AuthFamily }) {
  return (
    <aside className={styles.brandPanel} aria-hidden="true">
      <span>Accès client</span>
      <strong>
        {family === "sign-in"
          ? "Pilotez votre activité avec clarté."
          : "Un parcours simple, une sécurité explicite."}
      </strong>
      <div>
        <i />
        <i />
        <i />
      </div>
    </aside>
  );
}

function PasswordCriteria() {
  return (
    <ul className={styles.criteria} aria-label="Critères du mot de passe">
      <li>12 caractères minimum</li>
      <li>Une lettre et un chiffre</li>
      <li>Un caractère spécial</li>
    </ul>
  );
}

function AuthFeedback({ state }: { state: AuthState }) {
  const feedback: Partial<
    Record<AuthState, { tone: "status" | "alert"; title: string; text: string }>
  > = {
    success: {
      tone: "status",
      title: "Opération confirmée",
      text: "Le parcours peut maintenant continuer.",
    },
    generic_error: {
      tone: "alert",
      title: "Action impossible",
      text: "Vérifiez vos informations ou réessayez plus tard.",
    },
    expired_link: {
      tone: "alert",
      title: "Ce lien a expiré",
      text: "Demandez l’envoi d’un nouveau lien sécurisé.",
    },
    used_link: {
      tone: "status",
      title: "Lien déjà utilisé",
      text: "Revenez à la connexion pour accéder à votre espace.",
    },
    disabled: {
      tone: "alert",
      title: "Accès indisponible",
      text: "Cette action n’est pas autorisée pour ce site.",
    },
    email_resent: {
      tone: "status",
      title: "Email renvoyé",
      text: "Consultez votre boîte de réception et vos courriers indésirables.",
    },
    session_active: {
      tone: "status",
      title: "Vous êtes déjà connectée",
      text: "Continuez directement vers votre espace client.",
    },
  };
  const message = feedback[state];
  if (!message) return null;
  return (
    <div
      className={message.tone === "alert" ? styles.alert : styles.status}
      role={message.tone}
    >
      <strong>{message.title}</strong>
      <span>{message.text}</span>
    </div>
  );
}

function requiresPassword(family: AuthFamily) {
  return family === "sign-in" || family === "sign-up" || family === "activation";
}
function isTerminalState(state: AuthState) {
  return [
    "success",
    "generic_error",
    "expired_link",
    "used_link",
    "disabled",
    "email_resent",
    "session_active",
  ].includes(state);
}
