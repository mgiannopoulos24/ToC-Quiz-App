import ExaminationDialog from './components/ExaminationDialog';
import QuizCard from './components/QuizCard';
import { quizzes } from './utils/quizzes';
import { useState } from 'react';

function App() {
  const [isExamModeOpen, setIsExamModeOpen] = useState(false);

  // Corrected filtering: exclude mega from regular quizzes
  const regularQuizzes = quizzes.filter(
    (quiz) => quiz.id.includes('quiz') && !quiz.id.includes('mega')
  );
  const megaQuizzes = quizzes.filter((quiz) => quiz.id.includes('mega'));

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
        <section>
          <h2 className="mb-6 text-3xl font-semibold text-gray-700">Mega Quiz</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {megaQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
      </div>

      <ExaminationDialog
        isOpen={isExamModeOpen}
        onClose={() => setIsExamModeOpen(false)}
        allQuizzes={quizzes}
      />
    </div>
  );
}

export default App;
