import ExaminationDialog from './components/ExaminationDialog';
import QuizCard from './components/QuizCard';
import { quizzes } from './utils/quizzes';
import { useState } from 'react';

function App() {
  const [isExamModeOpen, setIsExamModeOpen] = useState(false);

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="font-bold text-gray-700">
            ΠΡΟΣΟΧΗ. Μερικές από τις εξηγήσεις είναι ΑΙ-generated.
          </p>
        </div>
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
