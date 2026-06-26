export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Politique de confidentialité
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Protection de vos données personnelles
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Cette page explique comment OptimalLogic collecte, utilise et protège
            les informations transmises via son site internet.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold">1. Données collectées</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Nous pouvons collecter les informations que vous nous transmettez
              volontairement via les formulaires du site : nom, prénom, adresse
              e-mail, numéro de téléphone, nom d’entreprise, type de projet et
              message.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">2. Utilisation des données</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Ces données sont utilisées uniquement pour répondre à vos demandes,
              vous recontacter, organiser un rendez-vous, établir une proposition
              commerciale ou assurer le suivi de votre projet.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">3. Conservation des données</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Les données sont conservées pendant une durée raisonnable, nécessaire
              au traitement de votre demande et au suivi de la relation commerciale.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">4. Partage des données</h2>
            <p className="mt-4 leading-8 text-slate-600">
              OptimalLogic ne vend pas vos données personnelles. Elles peuvent
              uniquement être traitées par des outils techniques nécessaires au bon
              fonctionnement du site et des services associés.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">5. Vos droits</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Conformément à la réglementation applicable, vous pouvez demander
              l’accès, la modification ou la suppression de vos données personnelles
              en nous contactant.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">6. Contact</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Pour toute question concernant cette politique de confidentialité,
              vous pouvez nous contacter via la page Contact du site.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}