import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Catalog() {
  const ROTATION_DEG = -90;

  const modules = import.meta.glob(
    "/src/assets/images/*.{png,jpg,jpeg,webp,avif}",
    { eager: true, as: "url" }
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

  // Clavier + bloquer le scroll derrière (mobile)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((url, idx) => (
              <button
                key={url}
                type="button"
                onClick={() => setOpenIndex(idx)}
                className="group bg-white rounded-xl shadow-sm overflow-hidden"
                aria-label={`Ouvrir l'image ${idx + 1}`}
              >
                {/* Sur mobile: ratio paysage (4/3) -> mieux pour tes images rotatées.
                    Sur sm+: carré */}
                <div className="aspect-[4/3] sm:aspect-square bg-gray-100 overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center p-2 sm:p-0">
                    <img
                      src={url}
                      alt=""
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
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucune image trouvée dans <b>src/assets/images</b>.
            </p>
          </div>
        )}
      </div>

      {/* LIGHTBOX (mobile friendly) */}
      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              {/* svh = mieux sur mobile (barre d'adresse) */}
              <div className="w-full h-[80svh] sm:h-[75vh] flex items-center justify-center bg-gray-50 relative">
                <img
                  src={images[openIndex]}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                  style={{
                    transform: `rotate(${ROTATION_DEG}deg)`,
                    transformOrigin: "center",
                  }}
                />

                {/* Fermer (visible sur mobile) */}
                <button
                  type="button"
                  onClick={close}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Navigation (avec fond pour visibilité) */}
                {total > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Compteur (optionnel) */}
            <div className="mt-2 text-center text-gray-600 text-sm">
              {openIndex + 1} / {total}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}