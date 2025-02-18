import React from 'react';
import { quizzes } from './data/quizzes';
import QuizCard from './components/QuizCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mathematics Quiz Collection</h1>
        <p className="text-gray-600 mb-8">Test your knowledge across different areas of mathematics</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;