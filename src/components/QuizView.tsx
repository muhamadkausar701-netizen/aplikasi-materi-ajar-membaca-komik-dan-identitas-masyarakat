import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  AppView,
  KUIS_MATCHING,
  KUIS_PG,
  MatchingQuizItem,
  MultipleChoiceQuizItem,
} from '../data/budayaData';

enum QuizStage {
  Menu = 'menu',
  Matching = 'matching',
  MultipleChoice = 'pg',
  Result = 'result',
}

interface ShuffledMatchQuestion {
  item: string;
  benar: string;
  options: string[];
}

interface AnswerRecord {
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizViewProps {
  bestMatchScore: number | null;
  bestPgScore: number | null;
  onCompleteQuiz: (kind: 'matching' | 'pg', score: number) => void;
  onNavigate: (view: AppView) => void;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildMatchingDeck(source: MatchingQuizItem[]): ShuffledMatchQuestion[] {
  const shuffledOrder = shuffleArray(source);
  const allCorrectDescriptions = source.map((s) => s.benar);

  return shuffledOrder.map((soal) => {
    const distractors = shuffleArray(
      allCorrectDescriptions.filter((desc) => desc !== soal.benar)
    ).slice(0, 3);
    const options = shuffleArray([soal.benar, ...distractors]);
    return {
      item: soal.item,
      benar: soal.benar,
      options,
    };
  });
}

export const QuizView: React.FC<QuizViewProps> = ({
  bestMatchScore,
  bestPgScore,
  onCompleteQuiz,
  onNavigate,
}) => {
  const [stage, setStage] = useState<QuizStage>(QuizStage.Menu);
  const [activeKind, setActiveKind] = useState<'matching' | 'pg'>('matching');

  // Matching quiz state
  const [matchDeck, setMatchDeck] = useState<ShuffledMatchQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedMatchAnswer, setSelectedMatchAnswer] = useState<string | null>(null);

  // PG quiz state
  const [pgDeck, setPgDeck] = useState<MultipleChoiceQuizItem[]>(KUIS_PG);
  const [selectedPgOption, setSelectedPgOption] = useState<number | null>(null);

  // Shared answer review log
  const [history, setHistory] = useState<AnswerRecord[]>([]);

  const startMatchingQuiz = () => {
    setMatchDeck(buildMatchingDeck(KUIS_MATCHING));
    setCurrentIndex(0);
    setScore(0);
    setSelectedMatchAnswer(null);
    setHistory([]);
    setActiveKind('matching');
    setStage(QuizStage.Matching);
  };

  const startPgQuiz = () => {
    setPgDeck([...KUIS_PG]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedPgOption(null);
    setHistory([]);
    setActiveKind('pg');
    setStage(QuizStage.MultipleChoice);
  };

  const handleSelectMatchOption = (choice: string) => {
    if (selectedMatchAnswer !== null) return;
    const currentQ = matchDeck[currentIndex];
    const correct = choice === currentQ.benar;
    setSelectedMatchAnswer(choice);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setHistory((prev) => [
      ...prev,
      {
        prompt: currentQ.item,
        userAnswer: choice,
        correctAnswer: currentQ.benar,
        isCorrect: correct,
      },
    ]);
  };

  const handleNextMatch = () => {
    if (currentIndex + 1 >= matchDeck.length) {
      onCompleteQuiz('matching', score);
      setStage(QuizStage.Result);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedMatchAnswer(null);
    }
  };

  const handleSelectPgOption = (optionIdx: number) => {
    if (selectedPgOption !== null) return;
    const currentQ = pgDeck[currentIndex];
    const correct = optionIdx === currentQ.answer;
    setSelectedPgOption(optionIdx);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setHistory((prev) => [
      ...prev,
      {
        prompt: currentQ.q,
        userAnswer: currentQ.options[optionIdx],
        correctAnswer: currentQ.options[currentQ.answer],
        isCorrect: correct,
      },
    ]);
  };

  const handleNextPg = () => {
    if (currentIndex + 1 >= pgDeck.length) {
      onCompleteQuiz('pg', score);
      setStage(QuizStage.Result);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedPgOption(null);
    }
  };

  const huruf = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() =>
            stage === QuizStage.Menu
              ? onNavigate(AppView.Home)
              : setStage(QuizStage.Menu)
          }
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{stage === QuizStage.Menu ? 'Kembali ke Beranda' : 'Kembali ke Menu Kuis'}</span>
        </button>

        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium text-sky-800">
              Evaluasi Pembelajaran Budaya Nusantara · SD Kelas 3–6
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {stage === QuizStage.Menu && 'Kuis Evaluasi Budaya'}
              {stage === QuizStage.Matching && 'Kuis Menjodohkan'}
              {stage === QuizStage.MultipleChoice && 'Kuis Pilihan Ganda'}
              {stage === QuizStage.Result && 'Hasil Kuis Evaluasi'}
            </h1>
          </div>

          {(stage === QuizStage.Matching || stage === QuizStage.MultipleChoice) && (
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800 tabular-nums">
              <span>
                Soal {currentIndex + 1} /{' '}
                {stage === QuizStage.Matching ? matchDeck.length : pgDeck.length}
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span className="text-sky-800">Skor: {score}</span>
            </div>
          )}
        </div>
      </div>

      {/* STAGE 1: QUIZ MENU */}
      {stage === QuizStage.Menu && (
        <section className="space-y-8">
          <p className="text-base text-slate-600 max-w-2xl">
            Pilih jenis kuis yang ingin kamu mainkan! Setiap soal langsung menampilkan jawaban
            yang tepat supaya kamu semakin paham kekayaan budaya Indonesia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Matching Quiz */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 tabular-nums">
                  <span>8 Soal Acak</span>
                  <span>
                    {bestMatchScore !== null
                      ? `Skor Terbaik: ${bestMatchScore}/8`
                      : 'Belum dimainkan'}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Kuis Menjodohkan
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Pasangkan nama pakaian adat, kuliner khas, tarian, atau candi Nusantara dengan
                  penjelasan daerah asal yang tepat!
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={startMatchingQuiz}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Mulai Kuis Menjodohkan</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Card 2: Multiple Choice Quiz */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 tabular-nums">
                  <span>10 Soal Pilihan A–D</span>
                  <span>
                    {bestPgScore !== null
                      ? `Skor Terbaik: ${bestPgScore}/10`
                      : 'Belum dimainkan'}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Kuis Pilihan Ganda
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Jawab 10 pertanyaan seputar semboyan Bhinneka Tunggal Ika, isi komik Kita
                  Indonesia, serta budaya 5 suku Nusantara.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={startPgQuiz}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Mulai Pilihan Ganda</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STAGE 2: MATCHING QUIZ */}
      {stage === QuizStage.Matching && matchDeck[currentIndex] && (
        <section className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-700 transition-transform duration-200 origin-left"
              style={{
                transform: `scaleX(${(currentIndex + 1) / matchDeck.length})`,
              }}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2 pb-4 border-b border-slate-100">
              <p className="text-xs font-medium text-slate-500">
                Pasangkan istilah budaya berikut dengan penjelasan yang tepat:
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-sky-900">
                {matchDeck[currentIndex].item}
              </h2>
            </div>

            <div className="space-y-3">
              {matchDeck[currentIndex].options.map((opt, idx) => {
                const isAnswered = selectedMatchAnswer !== null;
                const isSelected = selectedMatchAnswer === opt;
                const isRightOption = opt === matchDeck[currentIndex].benar;

                let cardStyle =
                  'border-slate-200 bg-slate-50/60 hover:bg-sky-50/60 hover:border-sky-400 text-slate-800';
                if (isAnswered) {
                  if (isRightOption) {
                    cardStyle =
                      'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                  } else if (isSelected) {
                    cardStyle = 'border-red-400 bg-red-50 text-red-950';
                  } else {
                    cardStyle = 'border-slate-200 bg-white text-slate-400 opacity-75';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectMatchOption(opt)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border text-sm sm:text-base transition-colors flex items-center justify-between gap-4 ${cardStyle}`}
                  >
                    <span className="flex items-start gap-3">
                      <span className="font-mono text-xs font-semibold text-slate-500 mt-1 tabular-nums">
                        {huruf[idx]}.
                      </span>
                      <span>{opt}</span>
                    </span>

                    {isAnswered && isRightOption && (
                      <CheckCircle2
                        className="w-5 h-5 text-emerald-700 shrink-0"
                        aria-label="Jawaban Benar"
                      />
                    )}
                    {isAnswered && isSelected && !isRightOption && (
                      <XCircle
                        className="w-5 h-5 text-red-600 shrink-0"
                        aria-label="Jawaban Kurang Tepat"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Accessible Feedback Banner */}
            {selectedMatchAnswer !== null && (
              <div className="pt-2 space-y-4">
                <div
                  role="status"
                  className={`flex items-start gap-3 p-4 rounded-lg border text-sm ${
                    selectedMatchAnswer === matchDeck[currentIndex].benar
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  {selectedMatchAnswer === matchDeck[currentIndex].benar ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {selectedMatchAnswer === matchDeck[currentIndex].benar
                        ? 'Benar! Hebat, jawabanmu tepat sekali!'
                        : 'Kurang tepat, tetap semangat belajar!'}
                    </p>
                    {selectedMatchAnswer !== matchDeck[currentIndex].benar && (
                      <p className="mt-1">
                        Pasangan yang tepat: <strong>{matchDeck[currentIndex].benar}</strong>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextMatch}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>
                      {currentIndex + 1 >= matchDeck.length
                        ? 'Lihat Hasil Kuis'
                        : 'Soal Berikutnya'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STAGE 3: MULTIPLE CHOICE QUIZ */}
      {stage === QuizStage.MultipleChoice && pgDeck[currentIndex] && (
        <section className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-transform duration-200 origin-left"
              style={{
                transform: `scaleX(${(currentIndex + 1) / pgDeck.length})`,
              }}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <p className="text-xs font-medium text-slate-500 tabular-nums">
                Pertanyaan {String(currentIndex + 1).padStart(2, '0')}
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {pgDeck[currentIndex].q}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pgDeck[currentIndex].options.map((opt, idx) => {
                const isAnswered = selectedPgOption !== null;
                const isSelected = selectedPgOption === idx;
                const isRightOption = idx === pgDeck[currentIndex].answer;

                let btnStyle =
                  'border-slate-200 bg-slate-50/60 hover:bg-amber-50/70 hover:border-amber-400 text-slate-800';
                if (isAnswered) {
                  if (isRightOption) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'border-red-400 bg-red-50 text-red-950';
                  } else {
                    btnStyle = 'border-slate-200 bg-white text-slate-400 opacity-75';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectPgOption(idx)}
                    className={`text-left px-4 py-3.5 rounded-lg border text-sm sm:text-base transition-colors flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                        {huruf[idx]}.
                      </span>
                      <span>{opt}</span>
                    </span>

                    {isAnswered && isRightOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isRightOption && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Feedback & Explanation */}
            {selectedPgOption !== null && (
              <div className="pt-2 space-y-4">
                <div
                  role="status"
                  className={`flex items-start gap-3 p-4 rounded-lg border text-sm ${
                    selectedPgOption === pgDeck[currentIndex].answer
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  {selectedPgOption === pgDeck[currentIndex].answer ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {selectedPgOption === pgDeck[currentIndex].answer
                        ? 'Benar! Jawabanmu tepat!'
                        : `Kurang tepat. Jawaban yang benar adalah: ${
                            pgDeck[currentIndex].options[pgDeck[currentIndex].answer]
                          }`}
                    </p>
                    <p className="text-xs opacity-90 leading-relaxed">
                      {pgDeck[currentIndex].pembahasan}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextPg}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>
                      {currentIndex + 1 >= pgDeck.length
                        ? 'Lihat Hasil Kuis'
                        : 'Soal Berikutnya'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STAGE 4: QUIZ RESULTS & REVIEW */}
      {stage === QuizStage.Result && (
        <section className="max-w-3xl mx-auto space-y-8">
          {(() => {
            const total = history.length;
            const persen = total > 0 ? Math.round((score / total) * 100) : 0;
            const jenisLabel =
              activeKind === 'matching' ? 'Menjodohkan' : 'Pilihan Ganda';

            let pesanJudul = '';
            let pesanIsi = '';
            if (persen >= 80) {
              pesanJudul = 'Luar biasa!';
              pesanIsi = `Kamu sudah sangat memahami budaya Indonesia melalui kuis ${jenisLabel}!`;
            } else if (persen >= 50) {
              pesanJudul = 'Bagus!';
              pesanIsi = `Terus belajar ya, kamu hebat di kuis ${jenisLabel}!`;
            } else {
              pesanJudul = 'Jangan menyerah!';
              pesanIsi = `Baca lagi komik dan detail sukunya, lalu coba kuis ${jenisLabel} lagi ya!`;
            }

            return (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Award className="w-8 h-8" aria-hidden="true" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">
                    Skor Akhir Kuis {jenisLabel}
                  </p>
                  <p className="font-display text-4xl sm:text-5xl font-bold text-sky-800 tabular-nums">
                    {score} / {total}
                  </p>
                  <p className="text-sm font-medium text-slate-500 tabular-nums">
                    Nilai Penguasaan: {persen}%
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-1">
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    {pesanJudul}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{pesanIsi}</p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={
                      activeKind === 'matching' ? startMatchingQuiz : startPgQuiz
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Main Lagi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStage(QuizStage.Menu)}
                    className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                  >
                    Pilih Jenis Kuis Lain
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate(AppView.Home)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
                  >
                    Beranda
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Answer Review Table */}
          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            <div className="px-6 py-4">
              <h3 className="font-display text-base font-bold text-slate-900">
                Ringkasan Jawabanmu
              </h3>
            </div>
            {history.map((item, idx) => (
              <div key={idx} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-slate-900">
                    <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    {item.prompt}
                  </p>
                  <p className="text-xs text-slate-600">
                    Jawabanmu: <span className="font-medium">{item.userAnswer}</span>
                  </p>
                  {!item.isCorrect && (
                    <p className="text-xs text-emerald-800 font-medium">
                      Kunci Jawaban: {item.correctAnswer}
                    </p>
                  )}
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold">
                  {item.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Benar</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-700">
                      <XCircle className="w-4 h-4" />
                      <span>Salah</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
