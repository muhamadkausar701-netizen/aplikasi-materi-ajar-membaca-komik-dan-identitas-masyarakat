import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Save,
  Upload,
  AlertCircle,
} from 'lucide-react';
import {
  AppView,
  KOMIK_IMAGE,
  KOMIK_PANELS,
  PERTANYAAN_REFLEKSI,
  RINGKASAN_KOMIK,
} from '../data/budayaData';
import { ImageWithFallback } from './ImageWithFallback';

export interface ReflectionAnswers {
  jawab1: string;
  jawab2: string;
  jawab3: string;
}

interface ComicViewProps {
  answers: ReflectionAnswers;
  onChangeAnswers: (next: ReflectionAnswers) => void;
  onSaveAnswers: () => void;
  onNavigate: (view: AppView) => void;
}

export const ComicView: React.FC<ComicViewProps> = ({
  answers,
  onChangeAnswers,
  onSaveAnswers,
  onNavigate,
}) => {
  const [selectedPanelIdx, setSelectedPanelIdx] = useState<number | null>(null);
  const [isFullWidthComic, setIsFullWidthComic] = useState(false);
  const [saveBanner, setSaveBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveClick = () => {
    onSaveAnswers();
    setSaveBanner({
      type: 'success',
      message: 'Berhasil disimpan! Jawaban refleksimu telah tersimpan.',
    });
  };

  const handleExportJson = () => {
    onSaveAnswers();
    const payload = JSON.stringify(answers, null, 2);
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jawaban_komik_kita_indonesia.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSaveBanner({
      type: 'success',
      message: 'File jawaban_komik_kita_indonesia.json berhasil diunduh.',
    });
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const loaded: ReflectionAnswers = {
          jawab1: typeof parsed.jawab1 === 'string' ? parsed.jawab1 : '',
          jawab2: typeof parsed.jawab2 === 'string' ? parsed.jawab2 : '',
          jawab3: typeof parsed.jawab3 === 'string' ? parsed.jawab3 : '',
        };
        onChangeAnswers(loaded);
        setSaveBanner({
          type: 'success',
          message: 'Jawaban dari file JSON berhasil dimuat.',
        });
      } catch {
        setSaveBanner({
          type: 'error',
          message: 'Format file tidak dikenali. Pastikan memilih file JSON jawaban yang benar.',
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const answeredCount = [answers.jawab1, answers.jawab2, answers.jawab3].filter(
    (v) => v.trim().length > 0
  ).length;

  const visiblePanels =
    selectedPanelIdx === null ? KOMIK_PANELS : [KOMIK_PANELS[selectedPanelIdx]];

  return (
    <div className="space-y-12 pb-16 pt-6">
      {/* Top Breadcrumb & Title */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onNavigate(AppView.Home)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium text-sky-800">
              A. Identitas Masyarakat di Lingkungan Tempat Tinggalku · Ayo, Membaca
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Komik Edukasi: Kita Indonesia
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsFullWidthComic((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            {isFullWidthComic ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Tampilan Damping</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Perbesar Halaman Komik</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comic Display + Exact 6-Panel Story Flow */}
      <section
        className={`grid grid-cols-1 gap-8 items-start ${
          isFullWidthComic ? '' : 'lg:grid-cols-12'
        }`}
      >
        {/* Full Uncropped Original Comic Image */}
        <div className={isFullWidthComic ? 'w-full max-w-4xl mx-auto' : 'lg:col-span-7'}>
          <figure className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-3 sm:p-5 bg-white">
              <ImageWithFallback
                src={KOMIK_IMAGE}
                alt="Halaman utuh komik Kita Indonesia (A. Identitas Masyarakat di Lingkungan Tempat Tinggalku - Ayo, Membaca) yang menampilkan percakapan 6 panel antara Dewi, Dani, dan Made"
                fallbackTitle="Komik Kita Indonesia"
                className="w-full h-auto block mx-auto"
              />
            </div>
            <figcaption className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
              <span>Sumber: Buku Pendidikan Pancasila untuk SD/MI Kelas IV</span>
              <span>6 Panel Utuh · Tokoh: Dewi, Dani, &amp; Made</span>
            </figcaption>
          </figure>
        </div>

        {/* Complete 6-Panel Verbatim Dialogue & Summary Deck */}
        <div
          className={`space-y-6 ${
            isFullWidthComic ? 'w-full' : 'lg:col-span-5'
          }`}
        >
          {/* Verbatim 6-Panel Story Flow */}
          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Alur Cerita &amp; Dialog Komik (6 Panel)
                </h2>
                {selectedPanelIdx !== null && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPanelIdx((prev) =>
                          prev === null ? 0 : (prev + 5) % 6
                        )
                      }
                      aria-label="Panel sebelumnya"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPanelIdx((prev) =>
                          prev === null ? 0 : (prev + 1) % 6
                        )
                      }
                      aria-label="Panel selanjutnya"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Tabs: Semua Panel vs Panel 1..6 */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setSelectedPanelIdx(null)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selectedPanelIdx === null
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua (1–6)
                </button>
                {KOMIK_PANELS.map((panel, idx) => (
                  <button
                    key={panel.nomor}
                    type="button"
                    onClick={() => setSelectedPanelIdx(idx)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md tabular-nums transition-colors whitespace-nowrap shrink-0 ${
                      selectedPanelIdx === idx
                        ? 'bg-white text-sky-800 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Panel {panel.nomor}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-136 overflow-y-auto">
              {visiblePanels.map((panel) => (
                <div key={panel.nomor} className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                    <span className="font-semibold text-sky-800">
                      Panel 0{panel.nomor} · {panel.judul}
                    </span>
                    <span>{panel.asalDaerah}</span>
                  </div>

                  <div className="space-y-1.5 bg-slate-50 rounded-lg p-3.5 border border-slate-200/70">
                    {panel.percakapan.map((baris, bIdx) => (
                      <p key={bIdx} className="text-sm text-slate-800 leading-relaxed">
                        <span className="font-semibold text-slate-950">
                          {baris.penutur}:{' '}
                        </span>
                        {baris.teks}
                      </p>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {panel.catatanAlur}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Summary ("Apa isi komik ini?") */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <h3 className="font-display text-base font-bold text-slate-900">
              Apa isi komik ini?
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {RINGKASAN_KOMIK.map((poin, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono text-xs font-semibold text-sky-700 mt-1 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{poin}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reflection Worksheet Section */}
      <section
        aria-labelledby="refleksi-heading"
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2
              id="refleksi-heading"
              className="font-display text-xl sm:text-2xl font-bold text-slate-900"
            >
              Setelah membaca komik, jawab pertanyaan berikut!
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Tuliskan pendapat dan pengalamanmu berdasarkan komik Kita Indonesia serta lingkungan tempat tinggalmu.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500 tabular-nums">
            Terjawab {answeredCount} dari 3 soal
          </span>
        </div>

        <div className="space-y-6">
          {PERTANYAAN_REFLEKSI.map((item) => {
            const val = answers[item.key];
            return (
              <div key={item.key} className="space-y-2">
                <label
                  htmlFor={`textarea-${item.key}`}
                  className="block text-sm sm:text-base font-semibold text-slate-900 leading-snug"
                >
                  <span className="font-mono text-sky-700 mr-2 tabular-nums">
                    {item.nomor}.
                  </span>
                  {item.pertanyaan}
                </label>
                <p className="text-xs text-slate-500">{item.petunjuk}</p>
                <textarea
                  id={`textarea-${item.key}`}
                  rows={3}
                  value={val}
                  onChange={(e) => {
                    setSaveBanner(null);
                    onChangeAnswers({
                      ...answers,
                      [item.key]: e.target.value,
                    });
                  }}
                  placeholder="Tulis jawabanmu di sini..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/20 transition-colors"
                />
              </div>
            );
          })}
        </div>

        {/* Accessible Status Banner */}
        {saveBanner && (
          <div
            role="status"
            className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-sm font-medium ${
              saveBanner.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {saveBanner.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" aria-hidden="true" />
            )}
            <span>{saveBanner.message}</span>
          </div>
        )}

        {/* Worksheet Controls */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleSaveClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>Simpan Jawaban</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Unduh JSON</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleImportJson}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              <span>Muat File</span>
            </button>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => onNavigate(AppView.Explorer)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Lanjut ke Detail Pakaian Adat</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
