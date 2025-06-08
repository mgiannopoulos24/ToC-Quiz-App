import { TrueFalseQuiz } from '../types';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useState } from 'react';

interface TrueFalseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: TrueFalseQuiz;
}

function TrueFalseDialog({ isOpen, onClose, quiz }: TrueFalseDialogProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (window.MathJax && isOpen) {
      window.MathJax.typesetPromise().catch((err: Error) => console.log(err));
    }
  }, [currentQuestionIndex, showHints, showExplanations, isOpen]);

  if (!isOpen) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const selectedAnswer = selectedAnswers[currentQuestionIndex] || null;
  const showHint = showHints[currentQuestionIndex] || false;
  const showExplanation = showExplanations[currentQuestionIndex] || false;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
    setShowExplanations((prev) => ({
      ...prev,
      [currentQuestionIndex]: true,
    }));
  };

  const handleHintToggle = () => {
    setShowHints((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      // Clear the answer and explanation for the next question
      const nextIndex = currentQuestionIndex + 1;
      setSelectedAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[nextIndex];
        return newAnswers;
      });
      setShowExplanations((prev) => {
        const newExplanations = { ...prev };
        delete newExplanations[nextIndex];
        return newExplanations;
      });
      setShowHints((prev) => {
        const newHints = { ...prev };
        delete newHints[nextIndex];
        return newHints;
      });
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      // Clear the answer and explanation for the previous question
      const prevIndex = currentQuestionIndex - 1;
      setSelectedAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[prevIndex];
        return newAnswers;
      });
      setShowExplanations((prev) => {
        const newExplanations = { ...prev };
        delete newExplanations[prevIndex];
        return newExplanations;
      });
      setShowHints((prev) => {
        const newHints = { ...prev };
        delete newHints[prevIndex];
        return newHints;
      });
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowHints({});
    setShowExplanations({});
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
          <MathJaxContext>
            <MathJax>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {currentQuestion.group}
                  </span>
                </div>

                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Ερώτηση {currentQuestion.id}
                </h3>

                <div className="mb-6 text-gray-700">{currentQuestion.question}</div>

                <div className="mb-4 flex gap-3">
                  <button
                    onClick={() => handleAnswerClick('Σωστό')}
                    className={`flex-1 rounded-lg border-2 px-4 py-3 font-medium transition-colors ${
                      selectedAnswer === 'Σωστό'
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    Σωστό
                  </button>

                  <button
                    onClick={() => handleAnswerClick('Λάθος')}
                    className={`flex-1 rounded-lg border-2 px-4 py-3 font-medium transition-colors ${
                      selectedAnswer === 'Λάθος'
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    Λάθος
                  </button>
                </div>

                {!showExplanation && (
                  <button
                    onClick={handleHintToggle}
                    className="mb-4 rounded-lg bg-yellow-100 px-4 py-2 text-sm text-yellow-800 hover:bg-yellow-200"
                  >
                    {showHint ? 'Απόκρυψη Υπόδειξης' : 'Εμφάνιση Υπόδειξης'}
                  </button>
                )}

                {showHint && !showExplanation && (
                  <div className="mb-4 rounded-lg bg-yellow-50 p-4">
                    <h4 className="mb-2 font-medium text-yellow-800">Υπόδειξη:</h4>
                    <div className="text-yellow-700">{currentQuestion.hint}</div>
                  </div>
                )}

                {showExplanation && (
                  <div className="space-y-4">
                    <div className={`rounded-lg p-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                      <h4
                        className={`mb-2 font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}
                      >
                        {isCorrect ? 'Σωστή απάντηση!' : 'Λάθος απάντηση'}
                      </h4>
                      <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                        Η σωστή απάντηση είναι: <strong>{currentQuestion.correctAnswer}</strong>
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h4 className="mb-2 font-medium text-blue-800">Εξήγηση:</h4>
                      <div className="text-blue-700">{currentQuestion.explanation}</div>
                    </div>
                  </div>
                )}
              </div>
            </MathJax>
          </MathJaxContext>
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
