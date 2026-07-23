import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, Fish, Snowflake, Package, FileCheck2, ArrowRight } from "lucide-react";
import { useNavigation } from "../context/useNavigation";
import { Language } from "../i18n";

interface CatalogProps {
  language: Language;
}

export function Catalog({ language }: CatalogProps) {
  const { navigateTo } = useNavigation();
  const isEnglish = language === "en";
  // Rotation globale (si toutes tes images ont le même sens)
  const ROTATION_DEG = -90;

  const modules = import.meta.glob(
    "/src/assets/images/*.{png,jpg,jpeg,webp,avif}",
    { eager: true, query: "?url", import: "default" }
  ) as Record<string, string>;

  const images = useMemo(() => {
    return Object.entries(modules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, url]) => url);
  }, [modules]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;
  const total = images.length;

  const close = () => setOpenIndex(null);

  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + total) % total);
  };

  const next = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % total);
  };

  // Clavier + bloquer scroll derrière (important sur mobile)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, openIndex, total]);

  // Astuce clé: si rotation 90°/-90°, on inverse les contraintes
  const isQuarterTurn = Math.abs(ROTATION_DEG) % 180 === 90;

  // Zone visible dans la lightbox (viewport)
  const VIEW_W = "92vw";
  const VIEW_H = "82svh";

  // Si rotation 90°, on swap maxWidth/maxHeight pour éviter le crop
  const imgMaxWidth = isQuarterTurn ? VIEW_H : VIEW_W;
  const imgMaxHeight = isQuarterTurn ? VIEW_W : VIEW_H;

  const products = [
    {
      icon: Snowflake,
      name: isEnglish ? "Frozen sardine fillets" : "Filets de sardines congelés",
      type: isEnglish ? "Frozen seafood" : "Produit congelé",
      use: isEnglish ? "Wholesale, food service and professional distribution." : "Grossistes, HoReCa et distribution professionnelle.",
      formats: isEnglish ? "Professional formats according to quotation." : "Formats professionnels selon cotation.",
    },
    {
      icon: Fish,
      name: isEnglish ? "Marinated anchovies" : "Anchois marinés",
      type: isEnglish ? "Prepared seafood" : "Produit préparé",
      use: isEnglish
        ? "Garlic & parsley, Provençal, oriental, lemon, vinegar, sunflower oil and banderilla preparations."
        : "Préparations ail et persil, provençale, orientale, citron, vinaigre, huile de tournesol et banderillas.",
      formats: "100 g · 150 g · 200 g · 400 g · 700 g · 1 kg · 18 kg",
    },
    {
      icon: Package,
      name: isEnglish ? "Marinated sardines" : "Sardines marinées",
      type: isEnglish ? "Prepared seafood" : "Produit préparé",
      use: isEnglish ? "Selected preparations, including basil, for retail and professional buyers." : "Préparations sélectionnées, notamment au basilic, pour détaillants et professionnels.",
      formats: isEnglish ? "Formats confirmed according to recipe and market." : "Formats confirmés selon la recette et le marché.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
            {isEnglish ? "Export product range" : "Gamme de produits export"}
          </p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-black tracking-tight">
            {isEnglish ? "Sardines & anchovies from Morocco" : "Sardines et anchois du Maroc"}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300 leading-relaxed">
            {isEnglish
              ? "Product specifications, availability, minimum quantities and commercial terms are confirmed for each quotation."
              : "Les spécifications, disponibilités, quantités minimales et conditions commerciales sont confirmées pour chaque cotation."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <article key={product.name} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 p-3">
                <product.icon className="h-7 w-7" />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{product.type}</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">{product.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.use}</p>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  {isEnglish ? "Packaging" : "Conditionnement"}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-800">{product.formats}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <article className="rounded-3xl bg-cyan-400 p-8 text-slate-950">
            <Package className="h-8 w-8" />
            <h2 className="mt-6 text-3xl font-black">{isEnglish ? "Packaging options" : "Options de conditionnement"}</h2>
            <p className="mt-3 text-cyan-950 leading-relaxed">
              {isEnglish
                ? "Available formats may include 100 g, 150 g, 200 g, 400 g, 700 g, 1 kg and 18 kg, depending on the product and buyer requirements."
                : "Les formats disponibles peuvent inclure 100 g, 150 g, 200 g, 400 g, 700 g, 1 kg et 18 kg, selon le produit et les besoins de l’acheteur."}
            </p>
          </article>
          <article className="rounded-3xl bg-slate-950 p-8 text-white">
            <FileCheck2 className="h-8 w-8 text-cyan-300" />
            <h2 className="mt-6 text-3xl font-black">{isEnglish ? "Documents on request" : "Documents sur demande"}</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li>• {isEnglish ? "Technical specifications" : "Fiches techniques"}</li>
              <li>• {isEnglish ? "Product photos" : "Photos produits"}</li>
              <li>• {isEnglish ? "Health certificate" : "Certificat sanitaire"}</li>
              <li>• {isEnglish ? "Certificate of origin" : "Certificat d’origine"}</li>
            </ul>
          </article>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black">{isEnglish ? "Need specifications and a quotation?" : "Besoin des spécifications et d’une cotation ?"}</h2>
            <p className="mt-2 text-slate-600">
              {isEnglish ? "Tell us your product, volume, destination and required packaging." : "Indiquez le produit, le volume, la destination et le conditionnement recherché."}
            </p>
          </div>
          <button
            onClick={() => navigateTo("contact")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white hover:bg-slate-800"
          >
            {isEnglish ? "Request a quote" : "Demander un devis"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <details className="mt-12 rounded-3xl border border-slate-200 bg-white overflow-hidden">
          <summary className="cursor-pointer p-6 sm:p-8 font-black text-xl text-slate-950 hover:bg-slate-50">
            {isEnglish ? `Browse our seafood species reference (${images.length} sheets)` : `Consulter notre référentiel d’espèces (${images.length} fiches)`}
          </summary>
          <div className="border-t border-slate-200 p-4 sm:p-6">
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((url, idx) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setOpenIndex(idx)}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-cyan-500 hover:shadow-md transition-all"
                    aria-label={isEnglish ? `Open species reference ${idx + 1}` : `Ouvrir la fiche espèce ${idx + 1}`}
                  >
                    <div className="aspect-square bg-slate-50 overflow-hidden">
                      <div className="h-full w-full flex items-center justify-center p-2">
                        <img
                          src={url}
                          alt={isEnglish ? `Seafood species reference sheet ${idx + 1}` : `Fiche de référence espèce marine ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-contain"
                          style={{
                            transform: `rotate(${ROTATION_DEG}deg)`,
                            transformOrigin: "center",
                          }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">{isEnglish ? "No reference images available." : "Aucune fiche disponible."}</p>
            )}
          </div>
        </details>
      </section>

      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{ width: VIEW_W, maxWidth: "1024px" }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
              <div
                className="relative flex items-center justify-center bg-gray-50"
                style={{ height: VIEW_H }}
              >
                <img
                  src={images[openIndex]}
                  alt=""
                  style={{
                    transform: `rotate(${ROTATION_DEG}deg)`,
                    transformOrigin: "center",
                    maxWidth: imgMaxWidth,
                    maxHeight: imgMaxHeight,
                    width: "auto",
                    height: "auto",
                  }}
                />

                {/* Fermer */}
                <button
                  type="button"
                  onClick={close}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-2 shadow"
                  aria-label={isEnglish ? "Close" : "Fermer"}
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Navigation */}
                {total > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                      aria-label={isEnglish ? "Previous image" : "Image précédente"}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                      aria-label={isEnglish ? "Next image" : "Image suivante"}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-2 text-center text-slate-300 text-sm">
              {openIndex + 1} / {total}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
