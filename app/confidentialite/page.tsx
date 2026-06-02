"use client";

export default function ConfidentialitePage() {
  const dataSections = [
    {
      title: "Données collectées via le formulaire de contact",
      items: [
        "Nom et prénom",
        "Adresse e-mail",
        "Numéro de téléphone",
        "Nom de l’entreprise",
        "Type de projet ou offre demandée",
        "Message envoyé"
      ]
    },
    {
      title: "Données collectées via la prise de rendez-vous",
      items: [
        "Nom et prénom",
        "Adresse e-mail",
        "Date et heure du rendez-vous",
        "Informations liées au projet",
        "Éventuellement numéro de téléphone"
      ]
    },
    {
      title: "Données collectées via le chatbot",
      items: [
        "Messages envoyés dans la conversation",
        "Informations communiquées volontairement par le visiteur",
        "Données techniques nécessaires au fonctionnement du service"
      ]
    },
    {
      title: "Données de navigation",
      items: [
        "Pages consultées",
        "Données techniques du navigateur",
        "Cookies ou traceurs selon les préférences choisies",
        "Statistiques anonymisées ou données analytics si activées"
      ]
    }
  ];

  const purposes = [
    "Répondre aux demandes envoyées via le formulaire",
    "Organiser les rendez-vous et diagnostics",
    "Orienter les visiteurs vers l’offre la plus adaptée",
    "Assurer le suivi commercial des demandes",
    "Améliorer le site, les services et l’expérience utilisateur",
    "Sécuriser le site et prévenir les abus"
  ];

  const tools = [
    {
      name: "Formulaire de contact",
      role: "Recevoir et traiter les demandes envoyées depuis le site."
    },
    {
      name: "Outil de prise de rendez-vous",
      role: "Permettre au visiteur de choisir un créneau de rendez-vous."
    },
    {
      name: "Chatbot",
      role: "Répondre aux questions, orienter le visiteur et qualifier le besoin."
    },
    {
      name: "Outil d’e-mailing ou d’envoi d’e-mails",
      role: "Transmettre les demandes reçues et envoyer les confirmations."
    },
    {
      name: "Outil de mesure d’audience",
      role: "Comprendre l’utilisation du site et améliorer les pages, uniquement si l’outil est activé."
    },
    {
      name: "Hébergeur du site",
      role: "Assurer l’hébergement technique du site internet."
    }
  ];

  const rights = [
    "Droit d’accès à vos données",
    "Droit de rectification",
    "Droit d’effacement",
    "Droit d’opposition",
    "Droit à la limitation du traitement",
    "Droit à la portabilité lorsque cela s’applique",
    "Droit de retirer votre consentement lorsque le traitement repose sur celui-ci"
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <section className="px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm">
            Données personnelles
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-7xl">
            Politique de confidentialité.
            <span className="block text-black/55">Comment nous utilisons vos données.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-black/65">
            Cette page explique quelles données peuvent être collectées lorsque vous utilisez notre site,
            pourquoi elles sont collectées, combien de temps elles peuvent être conservées et comment vous
            pouvez exercer vos droits.
          </p>

          <div className="mt-10 rounded-[2rem] bg-black p-6 text-white sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
              À compléter
            </p>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Remplacez les champs entre crochets par vos informations officielles : nom de l’entreprise,
              forme juridique, adresse, e-mail professionnel, SIRET/SIREN et outils réellement utilisés.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Responsable du traitement
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Qui est responsable de vos données ?
            </h2>
            <div className="mt-6 grid gap-3 text-sm leading-7 text-black/65">
              <p><strong className="text-black">Entreprise :</strong> [Nom de l’entreprise]</p>
              <p><strong className="text-black">Forme juridique :</strong> [SAS, SASU, micro-entreprise, etc.]</p>
              <p><strong className="text-black">Adresse :</strong> [Adresse du siège social]</p>
              <p><strong className="text-black">SIRET/SIREN :</strong> [Numéro]</p>
              <p><strong className="text-black">E-mail :</strong> [contact@votre-domaine.com]</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Principe
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Nous collectons uniquement les données utiles.
            </h2>
            <p className="mt-6 text-sm leading-7 text-black/65">
              Les données collectées servent à répondre aux demandes, organiser les rendez-vous,
              accompagner les prospects et améliorer nos services. Nous évitons de collecter des
              informations inutiles ou excessives par rapport à ces objectifs.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Données collectées
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Quelles données peuvent être collectées ?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {dataSections.map((section) => (
              <div key={section.title} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-xl font-semibold tracking-tight">{section.title}</h3>
                <ul className="mt-5 grid gap-2.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-black/65">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] text-white">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
              Finalités
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Pourquoi utilisons-nous ces données ?
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/65">
              Les données ne sont pas utilisées pour autre chose que les finalités annoncées, sauf accord
              spécifique ou obligation légale.
            </p>
          </div>

          <div className="grid gap-3">
            {purposes.map((purpose) => (
              <div key={purpose} className="rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/65 shadow-sm">
                {purpose}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Outils et prestataires
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Quels outils peuvent intervenir ?
            </h2>
            <p className="mt-5 text-sm leading-7 text-black/65">
              Certains outils externes peuvent être utilisés pour faire fonctionner le site ou traiter les demandes.
              La liste exacte doit être adaptée selon les outils réellement installés.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.name} className="rounded-[1.5rem] bg-[#f7f4ef] p-5">
                <h3 className="text-lg font-semibold text-black">{tool.name}</h3>
                <p className="mt-3 text-xs leading-5 text-black/65">{tool.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Durée de conservation
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Combien de temps les données sont-elles conservées ?
            </h2>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-black/65">
              <p>
                Les données issues des demandes de contact et de rendez-vous sont conservées pendant une durée
                nécessaire au traitement de la demande et au suivi commercial.
              </p>
              <p>
                À titre indicatif, les demandes de prospects peuvent être conservées jusqu’à 3 ans après le dernier
                contact actif, sauf obligation légale ou demande de suppression.
              </p>
              <p>
                Les données liées à la facturation ou à la relation contractuelle peuvent être conservées plus
                longtemps lorsque la loi l’exige.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
              Vos droits
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Quels sont vos droits ?
            </h2>
            <ul className="mt-6 grid gap-2.5">
              {rights.map((right) => (
                <li key={right} className="flex gap-3 text-sm leading-6 text-black/65">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    ✓
                  </span>
                  {right}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-black/65">
              Pour exercer vos droits, vous pouvez nous contacter à l’adresse :
              <strong className="text-black"> [contact@votre-domaine.com]</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-black p-8 text-white sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
                Cookies
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Gestion des cookies et traceurs
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-white/70">
                Certains cookies sont nécessaires au fonctionnement du site. D’autres, comme les cookies de mesure
                d’audience, de chatbot ou de marketing, peuvent nécessiter votre accord avant d’être activés.
              </p>
              <a
                href="/cookies"
                className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                Gérer mes préférences cookies
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 bg-white p-6 text-sm leading-7 text-black/65 shadow-sm sm:p-8">
          <p>
            Cette politique peut être mise à jour en fonction de l’évolution du site, des outils utilisés ou des
            obligations légales. Dernière mise à jour : [date].
          </p>
        </div>
      </section>
    </main>
  );
}
