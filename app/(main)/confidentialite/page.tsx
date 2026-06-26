const sections = [
  { t: "1. Données collectées", d: "Nous pouvons collecter les informations que vous nous transmettez volontairement via les formulaires du site : nom, prénom, adresse e-mail, numéro de téléphone, nom d’entreprise, type de projet et message." },
  { t: "2. Utilisation des données", d: "Ces données sont utilisées uniquement pour répondre à vos demandes, vous recontacter, organiser un rendez-vous, établir une proposition commerciale ou assurer le suivi de votre projet." },
  { t: "3. Conservation des données", d: "Les données sont conservées pendant une durée raisonnable, nécessaire au traitement de votre demande et au suivi de la relation commerciale." },
  { t: "4. Partage des données", d: "OptimalLogic ne vend pas vos données personnelles. Elles peuvent uniquement être traitées par des outils techniques nécessaires au bon fonctionnement du site et des services associés." },
  { t: "5. Vos droits", d: "Conformément à la réglementation applicable, vous pouvez demander l’accès, la modification ou la suppression de vos données personnelles en nous contactant." },
  { t: "6. Contact", d: "Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter via la page Contact du site." },
];

export default function ConfidentialitePage() {
  return (
    <main className="relative">
      <section className="px-7 pb-12 pt-44 lg:pt-52">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Politique de confidentialité</p>
          <h1 className="mt-4 text-[clamp(36px,5vw,56px)] font-semibold">Protection de vos <span className="grad-text">données personnelles</span></h1>
          <p className="mt-6 text-lg leading-8 text-mut">Cette page explique comment OptimalLogic collecte, utilise et protège les informations transmises via son site internet.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-7 py-12">
        <div className="space-y-5">
          {sections.map((s) => (
            <div key={s.t} className="surface-card rounded-[24px] p-7 sm:p-8">
              <h2 className="font-display text-2xl font-semibold">{s.t}</h2>
              <p className="mt-4 leading-8 text-mut">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
