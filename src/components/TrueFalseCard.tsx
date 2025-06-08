import { TrueFalseQuiz } from '../types';
import TrueFalseDialog from './TrueFalseDialog';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface TrueFalseCardProps {
  quiz: TrueFalseQuiz;
}

export default function TrueFalseCard({ quiz }: TrueFalseCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
        <h2 className="mb-2 text-2xl font-bold">{quiz.title}</h2>
        <p className="mb-4 text-gray-600">{quiz.description}</p>
        <p className="mb-4 text-sm text-gray-500">
          {quiz.questions.length} {quiz.questions.length === 1 ? 'ερώτηση' : 'ερωτήσεις'}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <Play size={20} />
          Ξεκίνα
        </button>
      </div>

      <TrueFalseDialog quiz={quiz} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
