import ExaminationDialog from './components/ExaminationDialog';
import QuizCard from './components/QuizCard';
import TrueFalseDialog from './components/TrueFalseDialog';
import { TrueFalseQuiz } from './types';
import { quizzes } from './utils/quizzes';
import { trueFalseQuizzes } from './utils/trueFalseQuizzes';
import { useState } from 'react';

function App() {
  const [isExamModeOpen, setIsExamModeOpen] = useState(false);
  const [selectedTrueFalseQuiz, setSelectedTrueFalseQuiz] = useState<TrueFalseQuiz | null>(null);

  // Corrected filtering: exclude mega from regular quizzes
  const regularQuizzes = quizzes.filter(
    (quiz) => quiz.id.includes('quiz') && !quiz.id.includes('mega')
  );
  const megaQuizzes = quizzes.filter((quiz) => quiz.id.includes('mega'));

  const handleTrueFalseQuizClick = (quiz: TrueFalseQuiz) => {
    setSelectedTrueFalseQuiz(quiz);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Κουίζ Θεωρίας Υπολογισμού</h1>
          <button
            onClick={() => setIsExamModeOpen(true)}
            className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            Λειτουργία Εξέτασης
          </button>
        </div>

        {/* Regular Quizzes Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-gray-700">Quiz</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        {/* Mega Quizzes Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-gray-700">Mega Quiz</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {megaQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        {/* True/False Quizzes Section */}
        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-semibold text-gray-700">Σωστό - Λάθος Ερωτήσεις</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trueFalseQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => handleTrueFalseQuizClick(quiz)}
                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <h2 className="mb-2 text-2xl font-bold text-gray-700">{quiz.title}</h2>
                <p className="mb-4 text-gray-600">{quiz.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{quiz.questions.length} ερωτήσεις</span>
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Ξεκίνα
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ExaminationDialog
        isOpen={isExamModeOpen}
        onClose={() => setIsExamModeOpen(false)}
        allQuizzes={quizzes}
      />

      <TrueFalseDialog
        isOpen={selectedTrueFalseQuiz !== null}
        onClose={() => setSelectedTrueFalseQuiz(null)}
        quiz={selectedTrueFalseQuiz!}
      />
    </div>
  );
}

export default App;
