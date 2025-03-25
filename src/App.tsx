import React from 'react';
import { quizzes } from './data/quizzes';
import QuizCard from './components/QuizCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Κουίζ Θεωρίας Υπολογισμού</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="font-bold text-gray-700">ΠΡΟΣΟΧΗ. Μερικές από τις εξηγήσεις είναι ΑΙ-generated.</p>
        </div>
      </div>
    </div>
  );
}

export default App;