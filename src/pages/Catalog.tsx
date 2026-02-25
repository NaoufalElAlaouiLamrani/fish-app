import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Catalog() {
  // Ajuste ici si besoin : 90 ou -90 selon le sens correct
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

  const close = () => setOpenIndex(null);
  const isOpen = openIndex !== null;
  const total = images.length;

  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + total) % total);
  };

  const next = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % total);
  };

  // Clavier: ESC, flèches
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, openIndex, total]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* (Header supprimé) */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((url, idx) => (
              <button
                key={url}
                type="button"
                onClick={() => setOpenIndex(idx)}
                className="group bg-white rounded-xl shadow-sm overflow-hidden"
                aria-label={`Ouvrir l'image ${idx + 1}`}
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={url}
                      alt=""
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                      style={{ transform: `rotate(${ROTATION_DEG}deg)` }}
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

      {/* LIGHTBOX (fond clair) */}
      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fermer */}
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 text-gray-700 hover:text-gray-900 p-2"
              aria-label="Fermer"
            >
              <X className="h-7 w-7" />
            </button>

            {/* Image */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <div className="w-full h-[70vh] flex items-center justify-center bg-gray-50">
                <img
                  src={images[openIndex]}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                  style={{ transform: `rotate(${ROTATION_DEG}deg)` }}
                />
              </div>
            </div>

            {/* Navigation */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 p-3"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 p-3"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </>
            )}

            {/* Compteur */}
            <div className="mt-3 text-center text-gray-600 text-sm">
              {openIndex + 1} / {total}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}