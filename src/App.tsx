import { useState, useEffect, useCallback } from 'react';
import { AppView } from './data/budayaData';
import { TopBar } from './components/TopBar';
import { HomeView } from './components/HomeView';
import { ComicView, ReflectionAnswers } from './components/ComicView';
import { CultureExplorerView } from './components/CultureExplorerView';
import { QuizView } from './components/QuizView';

const STORAGE_KEY_ANSWERS = 'jawaban_komik_kita_indonesia_v1';
const STORAGE_KEY_PROGRESS = 'progres_jelajah_budaya_v1';

interface StoredProgress {
  exploredSukuIds: string[];
  bestMatchScore: number | null;
  bestPgScore: number | null;
}

function readInitialAnswers(): ReflectionAnswers {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ANSWERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        jawab1: typeof parsed.jawab1 === 'string' ? parsed.jawab1 : '',
        jawab2: typeof parsed.jawab2 === 'string' ? parsed.jawab2 : '',
        jawab3: typeof parsed.jawab3 === 'string' ? parsed.jawab3 : '',
      };
    }
  } catch {
    // Ignore storage read errors in restricted environments
  }
  return { jawab1: '', jawab2: '', jawab3: '' };
}

function readInitialProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        exploredSukuIds: Array.isArray(parsed.exploredSukuIds)
          ? parsed.exploredSukuIds
          : [],
        bestMatchScore:
          typeof parsed.bestMatchScore === 'number' ? parsed.bestMatchScore : null,
        bestPgScore:
          typeof parsed.bestPgScore === 'number' ? parsed.bestPgScore : null,
      };
    }
  } catch {
    // Ignore storage read errors
  }
  return {
    exploredSukuIds: [],
    bestMatchScore: null,
    bestPgScore: null,
  };
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Home);
  const [selectedSukuId, setSelectedSukuId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<ReflectionAnswers>(readInitialAnswers);
  const [progress, setProgress] = useState<StoredProgress>(readInitialProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {
      // Ignore storage write errors
    }
  }, [progress]);

  const handleSaveAnswers = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch {
      // Ignore storage write errors
    }
  }, [answers]);

  const handleChangeAnswers = useCallback((next: ReflectionAnswers) => {
    setAnswers(next);
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(next));
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const handleNavigate = useCallback((view: AppView) => {
    setCurrentView(view);
    if (view !== AppView.Explorer) {
      setSelectedSukuId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleJumpToSuku = useCallback((sukuId: string) => {
    setSelectedSukuId(sukuId);
    setCurrentView(AppView.Explorer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMarkExplored = useCallback((sukuId: string) => {
    setProgress((prev) => {
      if (prev.exploredSukuIds.includes(sukuId)) return prev;
      return {
        ...prev,
        exploredSukuIds: [...prev.exploredSukuIds, sukuId],
      };
    });
  }, []);

  const handleCompleteQuiz = useCallback((kind: 'matching' | 'pg', score: number) => {
    setProgress((prev) => {
      if (kind === 'matching') {
        const nextBest =
          prev.bestMatchScore === null ? score : Math.max(prev.bestMatchScore, score);
        return { ...prev, bestMatchScore: nextBest };
      }
      const nextBest =
        prev.bestPgScore === null ? score : Math.max(prev.bestPgScore, score);
      return { ...prev, bestPgScore: nextBest };
    });
  }, []);

  const handleResetProgress = useCallback(() => {
    const emptyAnswers = { jawab1: '', jawab2: '', jawab3: '' };
    const emptyProgress: StoredProgress = {
      exploredSukuIds: [],
      bestMatchScore: null,
      bestPgScore: null,
    };
    setAnswers(emptyAnswers);
    setProgress(emptyProgress);
    try {
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const answeredReflections = [answers.jawab1, answers.jawab2, answers.jawab3].filter(
    (v) => v.trim().length > 0
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <TopBar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {currentView === AppView.Home && (
          <HomeView
            progress={{
              answeredReflections,
              exploredSukuIds: progress.exploredSukuIds,
              bestMatchScore: progress.bestMatchScore,
              bestPgScore: progress.bestPgScore,
            }}
            onNavigate={handleNavigate}
            onSelectSuku={handleJumpToSuku}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentView === AppView.Comic && (
          <ComicView
            answers={answers}
            onChangeAnswers={handleChangeAnswers}
            onSaveAnswers={handleSaveAnswers}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === AppView.Explorer && (
          <CultureExplorerView
            selectedSukuId={selectedSukuId}
            exploredSukuIds={progress.exploredSukuIds}
            onSelectSuku={setSelectedSukuId}
            onMarkExplored={handleMarkExplored}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === AppView.Quiz && (
          <QuizView
            bestMatchScore={progress.bestMatchScore}
            bestPgScore={progress.bestPgScore}
            onCompleteQuiz={handleCompleteQuiz}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Jelajah Budaya Nusantara — Kita Indonesia · Pembelajaran Interaktif SD Kelas 3–6
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleNavigate(AppView.Comic)}
              className="hover:text-slate-800 transition-colors whitespace-nowrap"
            >
              Komik Edukasi
            </button>
            <button
              type="button"
              onClick={() => handleNavigate(AppView.Explorer)}
              className="hover:text-slate-800 transition-colors whitespace-nowrap"
            >
              5 Suku Nusantara
            </button>
            <button
              type="button"
              onClick={() => handleNavigate(AppView.Quiz)}
              className="hover:text-slate-800 transition-colors whitespace-nowrap"
            >
              Kuis Evaluasi
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
