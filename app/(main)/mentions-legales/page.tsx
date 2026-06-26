const sections = [
  { t: "Éditeur du site", d: "Le site OptimalLogic est édité par OptimalLogic. Pour toute question, vous pouvez nous contacter via la page Contact ou par e-mail à contact@optimal-logic.com." },
  { t: "Hébergement", d: "Le site est hébergé par Vercel Inc. Les données sont traitées via des prestataires techniques nécessaires au bon fonctionnement du site et des services associés." },
  { t: "Propriété intellectuelle", d: "L’ensemble des contenus présents sur ce site (textes, visuels, logos, éléments graphiques) est protégé. Toute reproduction sans autorisation est interdite." },
  { t: "Responsabilité", d: "OptimalLogic s’efforce d’assurer l’exactitude des informations diffusées sur le site, sans pouvoir en garantir l’exhaustivité ni l’absence d’erreurs." },
  { t: "Données personnelles", d: "Le traitement de vos données personnelles est décrit dans notre politique de confidentialité. Vous disposez d’un droit d’accès, de rectification et de suppression." },
  { t: "Contact", d: "Pour toute question relative aux présentes mentions légales, vous pouvez nous écrire à contact@optimal-logic.com." },
];

export default function MentionsLegalesPage() {
  return (
    <main className="relative">
      <section className="px-7 pb-12 pt-44 lg:pt-52">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Informations légales</p>
          <h1 className="mt-4 text-[clamp(36px,5vw,56px)] font-semibold">Mentions <span className="grad-text">légales</span></h1>
          <p className="mt-6 text-lg leading-8 text-mut">Informations relatives à l’éditeur, à l’hébergement et aux conditions d’utilisation du site OptimalLogic.</p>
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
