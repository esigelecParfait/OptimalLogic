import CalEmbed from "@/components/rdv/CalEmbed";

const steps = [
  {
    number: "01",
    title: "Analyse",
    text: "Nous regardons votre présence actuelle : Google Business, site web, image, clarté et facilité de contact.",
  },
  {
    number: "02",
    title: "Conseil",
    text: "Nous identifions les leviers les plus utiles : visibilité locale, site web, prise de rendez-vous, assistant IA ou suivi des demandes.",
  },
  {
    number: "03",
    title: "Direction",
    text: "Vous repartez avec une idée claire de la solution adaptée à votre activité, sans engagement.",
  },
];

const reassurances = [
  "Appel gratuit",
  "Sans engagement",
  "Adapté à votre activité",
  "Pas d’obligation de créer un site web",
];

export default function PriseDeRdvPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#161616]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-neutral-700 shadow-sm">
            Appel découverte gratuit
          </p>

          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-black md:text-7xl">
            Parlons de votre présence digitale.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-700 md:text-xl">
            En quelques minutes, nous analysons votre situation actuelle :
            Google Business, site web, visibilité, prise de contact et parcours
            client. L’objectif est simple : identifier ce qui peut réellement
            vous aider à être mieux trouvé, mieux compris et plus facilement
            choisi.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {step.number}
              </p>

              <h2 className="mt-4 text-xl font-semibold">{step.title}</h2>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <CalEmbed />

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
          {reassurances.map((item) => (
            <span
              key={item}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-black/5"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}