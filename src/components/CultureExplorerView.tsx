import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  Check,
} from 'lucide-react';
import { AppView, DATA_SUKU, SukuItem } from '../data/budayaData';
import { ImageWithFallback } from './ImageWithFallback';

interface CultureExplorerViewProps {
  selectedSukuId: string | null;
  exploredSukuIds: string[];
  onSelectSuku: (sukuId: string | null) => void;
  onMarkExplored: (sukuId: string) => void;
  onNavigate: (view: AppView) => void;
}

type AspectTab = 'semua' | 'pakaian' | 'kuliner' | 'budaya' | 'fakta';

export const CultureExplorerView: React.FC<CultureExplorerViewProps> = ({
  selectedSukuId,
  exploredSukuIds,
  onSelectSuku,
  onMarkExplored,
  onNavigate,
}) => {
  const [activeAspect, setActiveAspect] = useState<AspectTab>('semua');

  const currentIndex = selectedSukuId
    ? DATA_SUKU.findIndex((s) => s.id === selectedSukuId)
    : -1;
  const activeSuku: SukuItem | null =
    currentIndex >= 0 ? DATA_SUKU[currentIndex] : null;

  useEffect(() => {
    if (activeSuku) {
      onMarkExplored(activeSuku.id);
      setActiveAspect('semua');
    }
  }, [activeSuku, onMarkExplored]);

  const goToAdjacentSuku = (delta: number) => {
    if (currentIndex < 0) return;
    const nextIdx = (currentIndex + delta + DATA_SUKU.length) % DATA_SUKU.length;
    onSelectSuku(DATA_SUKU[nextIdx].id);
  };

  return (
    <div className="space-y-10 pb-16 pt-6">
      {/* Header & Interactive Suku Selector Bar */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() =>
            activeSuku ? onSelectSuku(null) : onNavigate(AppView.Home)
          }
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{activeSuku ? 'Kembali ke Daftar 5 Suku' : 'Kembali ke Beranda'}</span>
        </button>

        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium text-sky-800 tabular-nums">
              Ensiklopedia Budaya Nusantara · {exploredSukuIds.length} dari {DATA_SUKU.length} suku dipelajari
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Detail Pakaian Adat &amp; Budaya
            </h1>
          </div>

          <button
            type="button"
            onClick={() => onNavigate(AppView.Quiz)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>Langsung ke Kuis Evaluasi</span>
          </button>
        </div>

        {/* Interactive Segmented Suku Switcher */}
        <div
          role="tablist"
          aria-label="Pilih Suku Nusantara"
          className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeSuku === null}
            onClick={() => onSelectSuku(null)}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSuku === null
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Suku (5)
          </button>

          {DATA_SUKU.map((suku) => {
            const isSelected = activeSuku?.id === suku.id;
            const isStudied = exploredSukuIds.includes(suku.id);
            return (
              <button
                key={suku.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectSuku(suku.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-white text-sky-800 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{suku.nama}</span>
                {isStudied && (
                  <Check
                    className="w-3.5 h-3.5 text-emerald-600"
                    aria-label="Sudah dipelajari"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Mode A: Overview Grid of 5 Ethnic Groups */}
      {!activeSuku && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA_SUKU.map((suku, idx) => {
              const isStudied = exploredSukuIds.includes(suku.id);
              return (
                <article
                  key={suku.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-sky-400 transition-colors"
                >
                  <div>
                    <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden">
                      <ImageWithFallback
                        src={suku.image}
                        alt={`Ilustrasi pakaian adat dan budaya suku ${suku.nama} dari provinsi ${suku.provinsi}`}
                        fallbackTitle={`Suku ${suku.nama}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                        <span>
                          0{idx + 1} · {suku.provinsi}
                        </span>
                        {isStudied && (
                          <span className="text-emerald-700 font-medium">
                            Sudah dipelajari
                          </span>
                        )}
                      </div>

                      <h2 className="font-display text-xl font-bold text-slate-900">
                        Suku {suku.nama}
                      </h2>

                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {suku.budaya}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{suku.wilayah}</span>
                    <button
                      type="button"
                      onClick={() => onSelectSuku(suku.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* View Mode B: Two-Zone Interactive Detail Sandbox for Selected Suku */}
      {activeSuku && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone: Cultural Visual Stage + Prev/Next Controller */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="aspect-4/3 w-full bg-slate-100">
                <ImageWithFallback
                  src={activeSuku.image}
                  alt={`Ilustrasi pakaian adat, kuliner, dan budaya khas suku ${activeSuku.nama} dari ${activeSuku.provinsi}`}
                  fallbackTitle={`Suku ${activeSuku.nama}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 border-t border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 tabular-nums">
                    Suku {currentIndex + 1} dari {DATA_SUKU.length} · Provinsi {activeSuku.provinsi}
                  </p>
                  <h2 className="font-display text-xl font-bold text-slate-900 mt-0.5">
                    Suku {activeSuku.nama}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => goToAdjacentSuku(-1)}
                    aria-label="Suku sebelumnya"
                    className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToAdjacentSuku(1)}
                    aria-label="Suku berikutnya"
                    className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Aspect Filter Controls */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
              {(
                [
                  { id: 'semua', label: 'Semua Info' },
                  { id: 'pakaian', label: 'Pakaian Adat' },
                  { id: 'kuliner', label: 'Kuliner Khas' },
                  { id: 'budaya', label: 'Budaya & Seni' },
                  { id: 'fakta', label: 'Fakta Menarik' },
                ] as { id: AspectTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveAspect(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeAspect === tab.id
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Zone: Structured Concept Deck */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
              {(activeAspect === 'semua' || activeAspect === 'pakaian') && (
                <div className="p-6 space-y-2.5">
                  <p className="text-xs font-semibold text-sky-800">01. Pakaian Adat</p>
                  {activeSuku.pakaianPria && activeSuku.pakaianWanita ? (
                    <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                      <p>
                        <span className="font-semibold text-slate-900">Pria: </span>
                        {activeSuku.pakaianPria}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Wanita: </span>
                        {activeSuku.pakaianWanita}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                      {activeSuku.pakaianRingkas}
                    </p>
                  )}
                </div>
              )}

              {(activeAspect === 'semua' || activeAspect === 'kuliner') && (
                <div className="p-6 space-y-2">
                  <p className="text-xs font-semibold text-sky-800">02. Kuliner Khas</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{activeSuku.kuliner}</p>
                </div>
              )}

              {(activeAspect === 'semua' || activeAspect === 'budaya') && (
                <div className="p-6 space-y-2">
                  <p className="text-xs font-semibold text-sky-800">03. Budaya &amp; Seni</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{activeSuku.budaya}</p>
                </div>
              )}

              {(activeAspect === 'semua' || activeAspect === 'fakta') && (
                <div className="p-6 space-y-2 bg-amber-50/40">
                  <p className="text-xs font-semibold text-amber-900">04. Fakta Menarik</p>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {activeSuku.fakta}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelectSuku(null)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              >
                ← Semua Daftar Suku
              </button>

              <button
                type="button"
                onClick={() => onNavigate(AppView.Quiz)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Uji Pemahaman di Kuis</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
