import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Fish,
  Globe2,
  Layers3,
  Maximize2,
  Package,
  Ship,
  Snowflake,
  Sparkles,
  X,
} from "lucide-react";
import { useNavigation } from "../context/useNavigation";
import { Language } from "../i18n";
import marinatedAnchovies from "../assets/brand/marinated-anchovies.jpg";
import marinatedSardines from "../assets/brand/marinated-sardines.jpg";
import sardinesOnIce from "../assets/brand/sardines-on-ice.jpg";
import tangerMedPort from "../assets/brand/tanger-med-port.jpg";

interface CatalogProps {
  language: Language;
}

const ROTATION_DEG = -90;
const REFERENCE_BATCH_SIZE = 12;

export function Catalog({ language }: CatalogProps) {
  const { navigateTo } = useNavigation();
  const isEnglish = language === "en";

  const modules = import.meta.glob(
    "/src/assets/images/*.{png,jpg,jpeg,webp,avif}",
    { eager: true, query: "?url", import: "default" }
  ) as Record<string, string>;

  const images = useMemo(
    () =>
      Object.entries(modules)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, url]) => url),
    [modules]
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(REFERENCE_BATCH_SIZE);
  const isOpen = openIndex !== null;
  const total = images.length;
  const visibleImages = images.slice(0, visibleCount);
  const remaining = Math.max(total - visibleImages.length, 0);

  const close = () => setOpenIndex(null);

  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + total) % total);
  };

  const next = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % total);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // The current index is intentionally included so keyboard navigation always
    // works from the image shown in the lightbox.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, openIndex, total]);

  const isQuarterTurn = Math.abs(ROTATION_DEG) % 180 === 90;
  const VIEW_W = "92vw";
  const VIEW_H = "82svh";
  const imgMaxWidth = isQuarterTurn ? VIEW_H : VIEW_W;
  const imgMaxHeight = isQuarterTurn ? VIEW_W : VIEW_H;

  const products = [
    {
      icon: Snowflake,
      image: sardinesOnIce,
      name: isEnglish ? "Frozen sardine fillets" : "Filets de sardines congelés",
      eyebrow: isEnglish ? "Frozen · B2B" : "Congelé · B2B",
      description: isEnglish
        ? "Moroccan sardine prepared for professional distribution, wholesale and food-service requirements."
        : "Sardine marocaine préparée pour la distribution professionnelle, le négoce et les besoins HoReCa.",
      formats: isEnglish ? "Professional formats on quotation" : "Formats professionnels sur cotation",
      imageAlt: isEnglish ? "Fresh sardines displayed on ice" : "Sardines fraîches présentées sur glace",
    },
    {
      icon: Fish,
      image: marinatedAnchovies,
      name: isEnglish ? "Marinated anchovies" : "Anchois marinés",
      eyebrow: isEnglish ? "Prepared · Mediterranean" : "Préparé · Méditerranéen",
      description: isEnglish
        ? "Garlic & parsley, Provençal, oriental, lemon, vinegar, sunflower oil and banderilla recipes."
        : "Recettes ail et persil, provençale, orientale, citron, vinaigre, huile de tournesol et banderillas.",
      formats: "100 g · 150 g · 200 g · 400 g · 700 g · 1 kg · 18 kg",
      imageAlt: isEnglish ? "Marinated anchovy fillets on a plate" : "Filets d’anchois marinés présentés sur une assiette",
    },
    {
      icon: Sparkles,
      image: marinatedSardines,
      name: isEnglish ? "Marinated sardines" : "Sardines marinées",
      eyebrow: isEnglish ? "Prepared · Retail & food service" : "Préparé · Retail & HoReCa",
      description: isEnglish
        ? "Selected Moroccan sardine recipes, including basil, prepared for retail and professional buyers."
        : "Recettes sélectionnées de sardines marocaines, notamment au basilic, pour détaillants et professionnels.",
      formats: isEnglish ? "Formats adapted to recipe and market" : "Formats adaptés à la recette et au marché",
      imageAlt: isEnglish ? "Prepared sardine fillets with lemon" : "Filets de sardines préparés avec du citron",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f6f3] text-slate-950">
      <section className="relative isolate min-h-[620px] overflow-hidden text-white">
        <img
          src={tangerMedPort}
          alt={isEnglish ? "Aerial view of Tanger Med port in Morocco" : "Vue aérienne du port Tanger Med au Maroc"}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#031a30]/95 via-[#031a30]/76 to-[#031a30]/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031a30]/75 via-transparent to-transparent" />

        <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col justify-between px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Ship className="h-4 w-4 text-cyan-300" />
              {isEnglish ? "Morocco · Atlantic & Mediterranean" : "Maroc · Atlantique & Méditerranée"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Globe2 className="h-4 w-4 text-cyan-300" />
              {isEnglish ? "International B2B supply" : "Approvisionnement B2B international"}
            </span>
          </div>

          <div className="max-w-4xl py-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              {isEnglish ? "Our product gallery" : "Notre galerie produits"}
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]">
              {isEnglish ? "From Morocco to your market." : "Du Maroc jusqu’à votre marché."}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-100 sm:text-xl">
              {isEnglish
                ? "Discover our core sardine and anchovy preparations, backed by clear export information and direct commercial support."
                : "Découvrez nos préparations phares de sardines et d’anchois, accompagnées d’informations export claires et d’un suivi commercial direct."}
            </p>
            <button
              onClick={() => navigateTo("contact")}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 font-black text-[#031a30] transition hover:-translate-y-0.5 hover:bg-white"
            >
              {isEnglish ? "Discuss your requirements" : "Parler de votre besoin"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/25 pt-5 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 font-semibold">
              <BadgeCheck className="h-5 w-5 text-cyan-300" />
              {isEnglish ? "Products, packaging and documents confirmed per quotation." : "Produits, conditionnements et documents confirmés par cotation."}
            </p>
            <a
              href="https://commons.wikimedia.org/wiki/File:PortofTangerMed1.jpg"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              {isEnglish ? "Tanger Med photo: Adam Cli · CC BY-SA 4.0" : "Photo Tanger Med : Adam Cli · CC BY-SA 4.0"}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-800">
              {isEnglish ? "Core range" : "Gamme principale"}
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              {isEnglish ? "Three specialties. One reliable supply partner." : "Trois spécialités. Un partenaire fiable."}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">
            {isEnglish
              ? "Our offer is built for importers, wholesalers, distributors and food-service buyers looking for Moroccan seafood with adaptable formats."
              : "Notre offre s’adresse aux importateurs, grossistes, distributeurs et acheteurs HoReCa recherchant des produits de la mer marocains aux formats adaptables."}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.name}
              className={`group relative min-h-[520px] overflow-hidden rounded-[2rem] bg-slate-900 shadow-[0_24px_70px_-35px_rgba(2,6,23,0.8)] ${
                index === 1 ? "lg:-translate-y-5" : ""
              }`}
            >
              <img
                src={product.image}
                alt={product.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031a30] via-[#031a30]/35 to-black/10" />
              <div className="relative flex min-h-[520px] flex-col justify-between p-6 text-white sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/30 bg-black/15 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] backdrop-blur-md">
                    0{index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300 text-[#031a30]">
                    <product.icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{product.eyebrow}</p>
                  <h3 className="mt-3 text-3xl font-black tracking-tight">{product.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200">{product.description}</p>
                  <div className="mt-6 border-t border-white/20 pt-4">
                    <p className="text-xs font-semibold text-white/75">{product.formats}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-right text-[11px] text-slate-500">
          {isEnglish ? "Product imagery: Pexels contributors." : "Visuels produits : contributeurs Pexels."}
        </p>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-[2rem] bg-cyan-300 p-8 text-[#031a30] sm:p-10">
            <Package className="h-9 w-9" />
            <h2 className="mt-8 text-3xl font-black tracking-tight">
              {isEnglish ? "Packaging that fits the market" : "Un conditionnement adapté au marché"}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cyan-950">
              {isEnglish
                ? "Available formats may include 100 g, 150 g, 200 g, 400 g, 700 g, 1 kg and 18 kg, depending on the product and buyer requirements."
                : "Les formats disponibles peuvent inclure 100 g, 150 g, 200 g, 400 g, 700 g, 1 kg et 18 kg, selon le produit et les besoins de l’acheteur."}
            </p>
          </article>
          <article className="rounded-[2rem] bg-[#031a30] p-8 text-white sm:p-10">
            <FileCheck2 className="h-9 w-9 text-cyan-300" />
            <h2 className="mt-8 text-3xl font-black tracking-tight">
              {isEnglish ? "Export file on request" : "Dossier export sur demande"}
            </h2>
            <ul className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <li>• {isEnglish ? "Technical specifications" : "Fiches techniques"}</li>
              <li>• {isEnglish ? "Product photos" : "Photos produits"}</li>
              <li>• {isEnglish ? "Health certificate" : "Certificat sanitaire"}</li>
              <li>• {isEnglish ? "Certificate of origin" : "Certificat d’origine"}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#031a30] text-white">
        <div className="absolute -right-44 top-16 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute -left-44 bottom-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#031a30]">
                  <Layers3 className="h-4 w-4" />
                  {total} {isEnglish ? "reference sheets" : "fiches de référence"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-200">
                  <Maximize2 className="h-4 w-4 text-cyan-300" />
                  {isEnglish ? "Full-screen preview" : "Aperçu plein écran"}
                </span>
              </div>
              <h2 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {isEnglish ? "Explore the species behind our sourcing network." : "Explorez les espèces de notre réseau d’approvisionnement."}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-slate-300 lg:text-lg">
              {isEnglish
                ? "A visual, multilingual reference designed to make initial product identification easier. Open any sheet, then navigate with the arrows or keyboard."
                : "Un référentiel visuel et multilingue conçu pour faciliter la première identification produit. Ouvrez une fiche, puis naviguez avec les flèches ou le clavier."}
            </p>
          </div>

          {visibleImages.length > 0 ? (
            <>
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {visibleImages.map((url, idx) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setOpenIndex(idx)}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_24px_50px_-24px_rgba(34,211,238,0.45)] ${
                      idx === 0 || idx === 7 ? "sm:col-span-2 sm:row-span-2" : ""
                    }`}
                    aria-label={isEnglish ? `Open species reference ${idx + 1}` : `Ouvrir la fiche espèce ${idx + 1}`}
                  >
                    <div className={`${idx === 0 || idx === 7 ? "aspect-square" : "aspect-square"} overflow-hidden bg-slate-100`}>
                      <div className="flex h-full w-full items-center justify-center p-2 sm:p-3">
                        <img
                          src={url}
                          alt={isEnglish ? `Seafood species reference sheet ${idx + 1}` : `Fiche de référence espèce marine ${idx + 1}`}
                          loading="lazy"
                          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                          style={{ transform: `rotate(${ROTATION_DEG}deg)`, transformOrigin: "center" }}
                        />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-3 rounded-full bg-[#031a30]/85 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
                      {String(idx + 1).padStart(3, "0")}
                    </span>
                    <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-cyan-300 text-[#031a30] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>

              {remaining > 0 ? (
                <div className="mt-10 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => Math.min(count + REFERENCE_BATCH_SIZE, total))}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-black text-[#031a30] transition hover:-translate-y-0.5 hover:bg-cyan-300"
                  >
                    {isEnglish ? "Show 12 more sheets" : "Afficher 12 fiches de plus"}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="text-sm text-slate-400">
                    {isEnglish
                      ? `${visibleImages.length} displayed · ${remaining} remaining`
                      : `${visibleImages.length} affichées · ${remaining} restantes`}
                  </p>
                </div>
              ) : (
                <p className="mt-8 text-center text-sm font-semibold text-cyan-300">
                  {isEnglish ? `All ${total} reference sheets are displayed.` : `Les ${total} fiches sont affichées.`}
                </p>
              )}
            </>
          ) : (
            <p className="mt-10 text-slate-400">{isEnglish ? "No reference images available." : "Aucune fiche disponible."}</p>
          )}
        </div>
      </section>

      <section className="bg-cyan-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-950">
              {isEnglish ? "A product caught your eye?" : "Un produit vous intéresse ?"}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#031a30] sm:text-4xl">
              {isEnglish ? "Ask for specifications and a quotation." : "Demandez les spécifications et une cotation."}
            </h2>
          </div>
          <button
            onClick={() => navigateTo("contact")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#031a30] px-7 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            {isEnglish ? "Start a conversation" : "Démarrer un échange"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020b14]/95 p-2 backdrop-blur-md sm:p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={isEnglish ? "Species reference viewer" : "Visionneuse du référentiel d’espèces"}
        >
          <div
            className="relative"
            onClick={(event) => event.stopPropagation()}
            style={{ width: VIEW_W, maxWidth: "1024px" }}
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
              <div className="relative flex items-center justify-center bg-slate-100" style={{ height: VIEW_H }}>
                <img
                  src={images[openIndex]}
                  alt={isEnglish ? `Seafood species reference sheet ${openIndex + 1}` : `Fiche de référence espèce marine ${openIndex + 1}`}
                  style={{
                    transform: `rotate(${ROTATION_DEG}deg)`,
                    transformOrigin: "center",
                    maxWidth: imgMaxWidth,
                    maxHeight: imgMaxHeight,
                    width: "auto",
                    height: "auto",
                  }}
                />

                <button
                  type="button"
                  onClick={close}
                  className="absolute right-3 top-3 rounded-full bg-[#031a30] p-2.5 text-white shadow-lg transition hover:bg-cyan-600"
                  aria-label={isEnglish ? "Close" : "Fermer"}
                >
                  <X className="h-5 w-5" />
                </button>

                {total > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[#031a30] p-2.5 text-white shadow-lg transition hover:bg-cyan-600"
                      aria-label={isEnglish ? "Previous image" : "Image précédente"}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#031a30] p-2.5 text-white shadow-lg transition hover:bg-cyan-600"
                      aria-label={isEnglish ? "Next image" : "Image suivante"}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 text-sm text-slate-300">
              <span className="font-black text-cyan-300">{String(openIndex + 1).padStart(3, "0")}</span>
              <span className="h-px w-8 bg-white/30" />
              <span>{String(total).padStart(3, "0")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
