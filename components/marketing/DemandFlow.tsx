"use client";

import {
  ArrowDownToLine,
  CalendarCheck,
  FileText,
  MessageSquareText,
  PhoneCall,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import styles from "./marketing.module.css";

const sources = [
  { label: "Appels", icon: PhoneCall },
  { label: "SMS", icon: MessageSquareText },
  { label: "Devis", icon: FileText },
  { label: "Formulaires", icon: ArrowDownToLine },
  { label: "Rendez-vous", icon: CalendarCheck },
];

const outcomes = [
  { title: "Filtrer", text: "Distinguer l’urgent, l’utile et le bruit." },
  { title: "Transmettre", text: "Donner la bonne demande à la bonne personne." },
  { title: "Suivre", text: "Conserver la prochaine action dans vos outils actuels." },
];

const inputPaths = [
  "M 28 38 C 145 38, 180 132, 310 132",
  "M 28 84 C 150 84, 185 132, 310 132",
  "M 28 132 C 150 132, 190 132, 310 132",
  "M 28 180 C 150 180, 185 132, 310 132",
  "M 28 226 C 145 226, 180 132, 310 132",
];

const outputPaths = [
  "M 390 132 C 500 132, 530 64, 646 64",
  "M 390 132 C 505 132, 535 132, 646 132",
  "M 390 132 C 500 132, 530 200, 646 200",
];

export function DemandFlow() {
  const reduceMotion = useReducedMotion();
  const pathProps = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, pathLength: 1 } }
    : {
        initial: { opacity: 0.25, pathLength: 0 },
        whileInView: { opacity: 1, pathLength: 1 },
        viewport: { once: true, amount: 0.35 },
      };

  return (
    <section
      className={styles.flowSection}
      data-motion-preset-id="flow-progress"
      id="demandes"
    >
      <div className={styles.flowInner}>
        <header className={styles.flowHeader}>
          <p className={styles.eyebrow}>Le système de réception</p>
          <h2>Une demande ne devrait jamais dépendre du bon moment.</h2>
          <p>
            Les canaux restent familiers pour le client. En coulisses, la demande est
            comprise, priorisée et transmise, avec passage à l’humain dès que la situation
            l’exige.
          </p>
        </header>

        <div className={styles.flowMap}>
          <div className={styles.sourceColumn} aria-label="Canaux de demande">
            {sources.map(({ label, icon: Icon }) => (
              <div className={styles.sourceNode} key={label}>
                <Icon aria-hidden size={18} strokeWidth={1.8} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <svg
            aria-hidden="true"
            className={styles.flowLines}
            preserveAspectRatio="none"
            viewBox="0 0 674 264"
          >
            {inputPaths.map((path, index) => (
              <motion.path
                d={path}
                key={path}
                {...pathProps}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.68, ease: [0.2, 0, 0, 1], delay: index * 0.05 }
                }
              />
            ))}
            {outputPaths.map((path, index) => (
              <motion.path
                d={path}
                key={path}
                {...pathProps}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 0.68,
                        ease: [0.2, 0, 0, 1],
                        delay: 0.2 + index * 0.06,
                      }
                }
              />
            ))}
          </svg>

          <div className={styles.decisionNode}>
            <Sparkles aria-hidden size={24} strokeWidth={1.6} />
            <p>IA d’abord</p>
            <span>Qualification selon des règles validées</span>
            <strong>Humain si nécessaire</strong>
          </div>

          <div className={styles.outcomeColumn} aria-label="Résultats du traitement">
            {outcomes.map((outcome) => (
              <div className={styles.outcomeNode} key={outcome.title}>
                <Send aria-hidden size={17} strokeWidth={1.8} />
                <div>
                  <p>{outcome.title}</p>
                  <span>{outcome.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
