import ExaminationDialog from './components/ExaminationDialog';
import QuizCard from './components/QuizCard';
import ScrollToTop from './components/ScrollToTop';
import TrueFalseCard from './components/TrueFalseCard';
import { megaQuizzes } from './data/megaQuizzes';
import { quizzes } from './data/quizzes';
import { trueFalseQuizzes } from './data/trueFalseQuizzes';
import { useState } from 'react';

function App() {
  const [isExamModeOpen, setIsExamModeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'regular' | 'mega' | 'trueFalse'>('regular');

  const regularQuizzes = quizzes;

  const tabs = [
    { id: 'regular' as const, label: 'Quiz', count: regularQuizzes.length },
    { id: 'mega' as const, label: 'Mega Quiz', count: megaQuizzes.length },
    { id: 'trueFalse' as const, label: 'Σωστό - Λάθος', count: trueFalseQuizzes.length },
  ];

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Κουίζ Θεωρίας Υπολογισμού</h1>
          <p className="my-2 text-sm  text-gray-500">
            <strong>Σημείωση:</strong> Οι εξηγήσεις έχουν παραχθεί από ΑΙ — μην βασίζεστε πλήρως σε αυτές.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsExamModeOpen(true)}
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              Λειτουργία Εξέτασης
            </button>
          </div>
        </div>

        {/* Tabbed layout for quiz categories */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl rounded-lg bg-white p-1 shadow">
            <div role="tablist" aria-label="Κατηγορίες κουίζ" className="relative isolate grid grid-cols-3">
              {/* Sliding indicator */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 z-0 w-1/3 rounded-md bg-blue-600 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(${activeIndex * 100}%)` }}
              />
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-[1] flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium transition-colors duration-300 sm:px-6 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs transition-colors duration-300 ${
                      activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Regular Quizzes Section */}
        {activeTab === 'regular' && (
          <section role="tabpanel">
            <h2 className="mb-6 text-3xl font-semibold text-gray-700">Quiz</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </section>
        )}

        {/* Mega Quizzes Section */}
        {activeTab === 'mega' && (
          <section role="tabpanel">
            <h2 className="mb-6 text-3xl font-semibold text-gray-700">Mega Quiz</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {megaQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </section>
        )}

        {/* True/False Quizzes Section */}
        {activeTab === 'trueFalse' && (
          <section role="tabpanel">
            <h2 className="mb-6 text-3xl font-semibold text-gray-700">Σωστό - Λάθος Ερωτήσεις</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trueFalseQuizzes.map((quiz) => (
                <TrueFalseCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </section>
        )}
        <footer className="mt-12 text-center text-sm text-gray-500">
          Για προτάσεις / προσθήκες, δημιουργήστε ένα issue στο{' '}
          <a
            href="https://github.com/mgiannopoulos24/ToC-Quiz-App"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            GitHub
          </a>
        </footer>
      </div>

      <ExaminationDialog
        isOpen={isExamModeOpen}
        onClose={() => setIsExamModeOpen(false)}
        allQuizzes={[...quizzes, ...megaQuizzes]}
      />
      <ScrollToTop />
    </div>
  );
}

export default App;
