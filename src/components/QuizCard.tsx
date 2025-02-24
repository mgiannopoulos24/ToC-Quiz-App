import { useState } from 'react';
import { Play } from 'lucide-react';
import { Quiz } from '../types';
import QuizDialog from './QuizDialog';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-gray-600 mb-4">{quiz.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          {quiz.questions.length} {quiz.questions.length === 1 ? 'ερώτηση' : 'ερωτήσεις'}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Play size={20} />
          Ξεκίνα
        </button>
      </div>
      
      <QuizDialog
        quiz={quiz}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}