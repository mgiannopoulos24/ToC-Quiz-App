import { TrueFalseQuiz } from '../types';
import TrueFalseCard from './TrueFalseCard';
import { useState } from 'react';

interface TrueFalseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: TrueFalseQuiz;
}

function TrueFalseDialog({ isOpen, onClose, quiz }: TrueFalseDialogProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!isOpen) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white">
        <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
              <p className="text-gray-600">
                Ερώτηση {currentQuestionIndex + 1} από {quiz.questions.length}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              Κλείσιμο
            </button>
          </div>
        </div>

        <div className="p-6">
          <TrueFalseCard question={currentQuestion} />
        </div>

        <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="rounded-lg bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Προηγούμενη
            </button>

            <button
              onClick={handleNext}
              disabled={isLastQuestion}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Επόμενη
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrueFalseDialog;
