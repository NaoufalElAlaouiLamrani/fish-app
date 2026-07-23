import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  FileCheck2,
  Fish,
  Globe2,
  MessageSquareText,
  PackageCheck,
  Ship,
  Snowflake,
} from 'lucide-react';
import { useNavigation } from '../context/useNavigation';
import { Language } from '../i18n';

interface HomeProps {
  language: Language;
}

export function Home({ language }: HomeProps) {
  const { navigateTo } = useNavigation();

  const isEnglish = language === 'en';
  const advantages = [
    {
      icon: Globe2,
      title: isEnglish ? 'International B2B supply' : 'Approvisionnement B2B international',
      description: isEnglish
        ? 'A Moroccan contact for importers, wholesalers, distributors and food-service buyers.'
        : 'Un interlocuteur marocain pour importateurs, grossistes, distributeurs et acheteurs HoReCa.'
    },
    {
      icon: PackageCheck,
      title: isEnglish ? 'Flexible formats' : 'Formats flexibles',
      description: isEnglish
        ? 'Retail and professional packaging options, from 100 g to 18 kg depending on the product.'
        : 'Conditionnements pour le détail et les professionnels, de 100 g à 18 kg selon le produit.'
    },
    {
      icon: FileCheck2,
      title: isEnglish ? 'Export documents' : 'Documents export',
      description: isEnglish
        ? 'Technical specifications, health certificate and certificate of origin available on request.'
        : 'Fiches techniques, certificat sanitaire et certificat d’origine disponibles sur demande.'
    },
    {
      icon: MessageSquareText,
      title: isEnglish ? 'Direct response' : 'Réponse directe',
      description: isEnglish
        ? 'Discuss products, quantities, packaging and destination directly by email or WhatsApp.'
        : 'Échangez directement sur les produits, volumes, formats et destinations par email ou WhatsApp.'
    }
  ];

  const products = [
    {
      icon: Snowflake,
      eyebrow: isEnglish ? 'Frozen' : 'Congelé',
      title: isEnglish ? 'Frozen sardine fillets' : 'Filets de sardines congelés',
      description: isEnglish
        ? 'A practical frozen format for professional distribution and food-service requirements.'
        : 'Un format congelé pratique pour la distribution professionnelle et les besoins HoReCa.'
    },
    {
      icon: Fish,
      eyebrow: isEnglish ? 'Marinated' : 'Mariné',
      title: isEnglish ? 'Marinated anchovies' : 'Anchois marinés',
      description: isEnglish
        ? 'Garlic & parsley, Provençal, oriental, lemon, vinegar and sunflower-oil recipes.'
        : 'Recettes ail et persil, provençale, orientale, citron, vinaigre et huile de tournesol.'
    },
    {
      icon: Boxes,
      eyebrow: isEnglish ? 'Ready to discuss' : 'Sur demande',
      title: isEnglish ? 'Marinated sardines' : 'Sardines marinées',
      description: isEnglish
        ? 'Selected Moroccan sardine preparations for retail, wholesale and professional buyers.'
        : 'Préparations sélectionnées de sardines marocaines pour détaillants, grossistes et professionnels.'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="absolute -bottom-48 left-1/3 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-[1.3fr_.7fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 mb-7">
              <Ship className="h-4 w-4" />
              {isEnglish ? 'Moroccan seafood supply for international buyers' : 'Produits de la mer marocains pour acheteurs internationaux'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.02] max-w-4xl">
              {isEnglish ? 'Frozen sardines & anchovies from Morocco.' : 'Sardines et anchois du Maroc.'}
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              {isEnglish
                ? 'Distribution Benslimane connects importers, wholesalers and food-service buyers with Moroccan frozen and marinated seafood products.'
                : 'Distribution Benslimane met en relation importateurs, grossistes et acheteurs HoReCa avec des produits de la mer marocains congelés et marinés.'}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigateTo('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 hover:bg-cyan-300 transition-colors"
              >
                {isEnglish ? 'Request product details' : 'Demander les fiches produits'}
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigateTo('catalog')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-4 font-bold text-white hover:border-cyan-300 hover:text-cyan-200 transition-colors"
              >
                {isEnglish ? 'Explore our range' : 'Découvrir notre gamme'}
              </button>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-700 bg-white/5 p-7 sm:p-9 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
                {isEnglish ? 'Core offer' : 'Offre principale'}
              </span>
              <BadgeCheck className="h-6 w-6 text-cyan-300" />
            </div>
            <div className="mt-7 space-y-5">
              {products.map((product) => (
                <div key={product.title} className="flex gap-4 border-b border-slate-800 pb-5 last:border-0 last:pb-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                    <product.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-bold text-white">{product.title}</p>
                    <p className="text-sm text-slate-400 mt-1">{product.eyebrow}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-2xl bg-white p-5 text-slate-950">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                {isEnglish ? 'Packaging options' : 'Conditionnements'}
              </p>
              <p className="mt-2 text-xl font-black">100 g — 18 kg</p>
              <p className="mt-1 text-sm text-slate-600">
                {isEnglish ? 'Depending on product and buyer requirements.' : 'Selon le produit et les besoins de l’acheteur.'}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
            {isEnglish ? 'For professional buyers' : 'Pour acheteurs professionnels'}
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
            {isEnglish ? 'Clear information. Direct discussion. Export-focused service.' : 'Informations claires. Échange direct. Service orienté export.'}
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((advantage) => {
            const Icon = advantage.icon;
            return (
              <article key={advantage.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-cyan-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-black">{advantage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{advantage.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
                {isEnglish ? 'Product range' : 'Gamme de produits'}
              </p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
                {isEnglish ? 'Products shaped for your market.' : 'Des produits adaptés à votre marché.'}
              </h2>
            </div>
            <button
              onClick={() => navigateTo('catalog')}
              className="inline-flex items-center gap-2 font-bold text-cyan-800 hover:text-cyan-600"
            >
              {isEnglish ? 'View full product details' : 'Voir tous les détails produits'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <article key={product.title} className="group rounded-3xl bg-slate-950 p-7 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{product.eyebrow}</span>
                  <product.icon className="h-7 w-7 text-cyan-300" />
                </div>
                <h3 className="mt-10 text-2xl font-black">{product.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl bg-cyan-400 p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-950">
              {isEnglish ? 'Start a sourcing conversation' : 'Démarrer un échange commercial'}
            </p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              {isEnglish ? 'Tell us what you need. We will prepare the relevant information.' : 'Expliquez votre besoin. Nous préparerons les informations adaptées.'}
            </h2>
            <p className="mt-5 text-lg text-cyan-950">
              {isEnglish
                ? 'Share the product, volume, packaging and destination port to receive a tailored response.'
                : 'Indiquez le produit, le volume, le conditionnement et le port de destination pour recevoir une réponse adaptée.'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('contact')}
            className="mt-8 lg:mt-0 shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 py-4 font-bold text-white hover:bg-slate-800 transition-colors"
          >
            {isEnglish ? 'Request a quotation' : 'Demander une cotation'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
