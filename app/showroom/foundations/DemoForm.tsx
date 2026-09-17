"use client";
import { useState } from "react";
import { FormField, Checkbox } from "@/components/primitives/FormField";
import { Button } from "@/components/primitives/Button";
import styles from "./foundations.module.css";

export function DemoForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <FormField id="name" name="name" label="Votre nom" autoComplete="name" required />
      <FormField
        id="email"
        name="email"
        type="email"
        label="Adresse email"
        autoComplete="email"
        required
        hint="Utilisée pour vous répondre."
      />
      <FormField
        as="select"
        id="service"
        name="service"
        label="Votre besoin"
        required
        defaultValue=""
      >
        <option value="" disabled>
          Choisir un service
        </option>
        <option value="website">Créer un site</option>
        <option value="support">Être accompagné</option>
      </FormField>
      <FormField
        as="textarea"
        id="message"
        name="message"
        label="Votre message"
        required
      />
      <Checkbox
        name="consent"
        label="J’accepte d’être recontacté pour cette demande."
        required
      />
      <Button type="submit">Tester le formulaire</Button>
      <p role="status">
        {sent
          ? "Démonstration terminée. Aucune donnée n’a été envoyée."
          : "Formulaire de démonstration, sans envoi."}
      </p>
    </form>
  );
}
