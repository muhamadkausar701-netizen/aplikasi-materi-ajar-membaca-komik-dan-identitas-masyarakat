import React from 'react';
import { ArrowRight, BookOpen, Compass, Award, RotateCcw } from 'lucide-react';
import { AppView, DATA_SUKU, KOMIK_IMAGE } from '../data/budayaData';
import { ImageWithFallback } from './ImageWithFallback';

interface StudentProgress {
  answeredReflections: number;
  exploredSukuIds: string[];
  bestMatchScore: number | null;
  bestPgScore: number | null;
}

interface HomeViewProps {
  progress: StudentProgress;
  onNavigate: (view: AppView) => void;
  onSelectSuku: (sukuId: string) => void;
  onResetProgress: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onNavigate,
  onSelectSuku,
  onResetProgress,
}) => {
  const hasAnyProgress =
    progress.answeredReflections > 0 ||
    progress.exploredSukuIds.length > 0 ||
    progress.bestMatchScore !== null ||
    progress.bestPgScore !== null;

  return (
    <div className="space-y-16 pb-16">
      {/* 2-Column Balanced Hero Split */}
      <section className="pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Core Narrative & Primary Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-sky-800">
                <span>SD Kelas 3–6</span>
                <span aria-hidden="true">·</span>
                <span>Pendidikan Pancasila</span>
                <span aria-hidden="true">·</span>
                <span>Bhinneka Tunggal Ika</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight max-w-xl">
                Kita Indonesia: Identitas &amp; Budaya Nusantara
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Halo Teman-teman! Ayo kenali keberagaman identitas masyarakat, pakaian adat,
                kuliner khas, dan kesenian daerah Indonesia yang kaya raya sambil belajar dan
                bermain.
              </p>
            </div>

            <div className="pt-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(AppView.Comic)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Baca Komik Kita Indonesia</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(AppView.Explorer)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                >
                  <Compass className="w-4 h-4 text-sky-700" aria-hidden="true" />
                  <span>Jelajahi 5 Suku</span>
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Disusun berdasarkan materi Buku Pendidikan Pancasila untuk SD/MI Kelas IV —
                Identitas Masyarakat di Lingkungan Tempat Tinggalku.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Stage Anchor (Uncropped Original Comic) */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col justify-between">
              <div className="p-4 bg-white flex-1 flex items-center justify-center">
                <ImageWithFallback
                  src={KOMIK_IMAGE}
                  alt="Halaman komik Kita Indonesia yang menampilkan percakapan Dewi, Dani, dan Made mengenal pakaian adat Jawa Timur, Bugis Sulawesi Tengah, Tari Mandau Kalimantan Tengah, dan budaya Bali"
                  fallbackTitle="Komik Edukasi: Kita Indonesia"
                  className="w-full max-h-96 object-contain"
                />
              </div>
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-sky-800">
                    Komik Edukasi 6 Panel · Dewi, Dani, &amp; Made
                  </p>
                  <p className="font-display text-sm font-bold text-slate-900 mt-0.5">
                    Kita Indonesia — Bhinneka Tunggal Ika
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(AppView.Comic)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
                >
                  Buka Komik
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width 3-Stage Guided Learning Progression Strip */}
      <section aria-labelledby="tahap-belajar-heading" className="space-y-5">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <h2
              id="tahap-belajar-heading"
              className="font-display text-xl sm:text-2xl font-bold text-slate-900"
            >
              Tahap Pembelajaran Interaktif
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Ikuti tiga langkah belajar berurutan atau pilih aktivitas yang ingin kamu coba.
            </p>
          </div>

          {hasAnyProgress && (
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Atur Ulang Progres</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage 1: Comic */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 tabular-nums">
                <span>01. Komik Edukasi</span>
                <span>Refleksi {progress.answeredReflections}/3</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Komik: Kita Indonesia
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Baca kisah percakapan Dewi, Dani, dan Made yang mengenal budaya Jawa Timur,
                Sulawesi Tengah, Kalimantan Tengah, serta Bali, lalu tulis jawaban refleksimu.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate(AppView.Comic)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Mulai Membaca</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Stage 2: Ethnic Explorer */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 tabular-nums">
                <span>02. Eksplorasi Nusantara</span>
                <span>Dipahami {progress.exploredSukuIds.length}/5 suku</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Detail Pakaian Adat &amp; Budaya
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pelajari ciri pakaian adat, kuliner khas, alat musik, hingga fakta sejarah suku
                Betawi, Bugis/Makassar, Melayu Riau, Rote, dan Ambon.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate(AppView.Explorer)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Buka Ensiklopedia Suku</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Stage 3: Quiz */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 tabular-nums">
                <span>03. Evaluasi Pemahaman</span>
                <span>
                  {progress.bestMatchScore !== null || progress.bestPgScore !== null
                    ? `Menjodohkan ${progress.bestMatchScore ?? 0}/8 · PG ${progress.bestPgScore ?? 0}/10`
                    : '8 + 10 Soal'}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Kuis Menjodohkan &amp; Pilihan Ganda
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Uji pemahamanmu lewat permainan menjodohkan 8 pasangan budaya dan 10 soal pilihan
                ganda lengkap dengan pembahasan.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate(AppView.Quiz)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0"
              >
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>Mainkan Kuis Evaluasi</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Cultural Spotlight Strip */}
      <section aria-labelledby="suku-pilihan-heading" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="suku-pilihan-heading"
              className="font-display text-xl sm:text-2xl font-bold text-slate-900"
            >
              Kenali 5 Suku Nusantara
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Klik salah satu kartu suku untuk langsung mempelajari pakaian adat dan budayanya.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(AppView.Explorer)}
            className="text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors whitespace-nowrap shrink-0"
          >
            Lihat Semua Suku →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DATA_SUKU.map((suku) => {
            const isExplored = progress.exploredSukuIds.includes(suku.id);
            return (
              <button
                key={suku.id}
                type="button"
                onClick={() => onSelectSuku(suku.id)}
                className="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-sky-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 flex flex-col"
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={suku.image}
                    alt={`Ilustrasi pakaian adat dan budaya suku ${suku.nama} dari ${suku.provinsi}`}
                    fallbackTitle={`Suku ${suku.nama}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      {suku.provinsi}
                      {isExplored ? ' · Sudah dibaca' : ''}
                    </p>
                    <h3 className="font-display text-base font-bold text-slate-900 mt-0.5 group-hover:text-sky-700 transition-colors">
                      {suku.nama}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-sky-700 mt-3">
                    Pelajari Detail →
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
