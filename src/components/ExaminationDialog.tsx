import { Question, Quiz } from '../types';
import { loadImage } from '../utils/loadImage';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExaminationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  allQuizzes: Quiz[];
}

const TOTAL_EXAM_QUESTIONS = 15; // Number of questions in the exam

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ExaminationDialog({ isOpen, onClose, allQuizzes }: ExaminationDialogProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Select random questions when the dialog opens or quizzes change
  useEffect(() => {
    if (isOpen) {
      const allQuestions = allQuizzes.flatMap((quiz) => quiz.questions);
      const shuffledQuestions = shuffleArray(allQuestions);
      const selectedQuestions = shuffledQuestions.slice(0, TOTAL_EXAM_QUESTIONS);
      setExamQuestions(selectedQuestions);
      setSelectedAnswers(new Array(selectedQuestions.length).fill(null));
      setCurrentQuestionIndex(0);
      setScore(null); // Reset score when starting a new exam
    }
  }, [isOpen, allQuizzes]);

  // Load image for the current question
  useEffect(() => {
    setCurrentImage(null); // Reset image initially
    if (isOpen && examQuestions.length > 0 && currentQuestionIndex < examQuestions.length) {
      const question = examQuestions[currentQuestionIndex];
      if (question.image) {
        loadImage(question.image)
          .then((image) => {
            setCurrentImage(image);
          })
          .catch((error) => {
            console.error('Error loading image:', error);
            setCurrentImage(null); // Ensure image is null on error
          });
      }
    }
  }, [currentQuestionIndex, examQuestions, isOpen]);

  if (!isOpen || examQuestions.length === 0) return null;

  const currentQuestion = examQuestions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    if (score !== null) return; // Don't allow changes after finishing

    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = index;
      return newAnswers;
    });
  };

  const handleClose = () => {
    onClose();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishExam = () => {
    let correctAnswers = 0;
    examQuestions.forEach((q, i) => {
      const selectedIndex = selectedAnswers[i];
      if (selectedIndex !== null && q.answers[selectedIndex]?.correct) {
        correctAnswers++;
      }
    });
    const finalScore = correctAnswers;
    setScore(finalScore);
    // Save score to cookie
    Cookies.set('examScore', finalScore.toString(), { expires: 365 }); // Expires in 1 year
    Cookies.set('examDate', new Date().toISOString(), { expires: 365 });
  };

  const renderWithNewlines = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const getAnswerClassName = (index: number) => {
    const isSelected = selectedAnswers[currentQuestionIndex] === index;

    if (score !== null) {
      // After finishing
      const isCorrect = currentQuestion.answers[index].correct;
      if (isCorrect) {
        return 'border border-green-500 bg-green-50 p-4 rounded-lg mb-2'; // Correct answer
      }
      if (isSelected && !isCorrect) {
        return 'border border-red-500 bg-red-50 p-4 rounded-lg mb-2'; // Incorrectly selected
      }
      return 'border border-gray-300 p-4 rounded-lg mb-2 opacity-50'; // Other answers
    } else {
      // During exam
      if (isSelected) {
        return 'border border-blue-500 bg-blue-50 p-4 rounded-lg mb-2 cursor-pointer'; // Selected
      }
      return 'border border-gray-300 p-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer'; // Not selected
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 sm:p-4">
      <MathJaxContext>
        <div className="flex h-full max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="flex flex-shrink-0 items-center justify-between border-b p-4 sm:p-6">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {score === null ? 'Εξέταση σε Εξέλιξη' : 'Αποτελέσματα Εξέτασης'}
            </h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
              <X size={24} className="sm:h-7 sm:w-7" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 sm:p-6">
            {score !== null ? (
              <div className="text-center">
                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                  Το σκορ σου: {score}/{examQuestions.length}
                </h3>
                <p className="mb-6 text-base text-gray-700 sm:text-lg">
                  Μπορείς τώρα να δεις τις σωστές απαντήσεις παρακάτω.
                </p>
                <button
                  onClick={() => setCurrentQuestionIndex(0)}
                  className="mb-4 rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700 sm:px-6"
                >
                  Έλεγχος Απαντήσεων
                </button>
              </div>
            ) : null}

            <div className={score !== null ? 'border-t pt-6' : ''}>
              <h3 className="mb-4 text-base font-medium sm:text-lg">
                Ερώτηση {currentQuestionIndex + 1} από {examQuestions.length}
              </h3>
              <div className="mb-4 max-h-40 overflow-y-auto rounded border p-3 sm:max-h-48">
                <MathJax dynamic key={`mathjax-question-${currentQuestionIndex}`}>
                  {renderWithNewlines(currentQuestion.question)}
                </MathJax>
                {currentImage && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={currentImage}
                      alt="Question Illustration"
                      className="h-auto max-w-full rounded-lg"
                      style={{ maxHeight: '150px' }}
                    />
                  </div>
                )}
              </div>

              <div className="max-h-65 space-y-2 overflow-y-auto pr-2 sm:max-h-64">
                {currentQuestion.answers.map((answer, index) => (
                  <div
                    key={`${currentQuestionIndex}-${index}`}
                    onClick={() => handleAnswerClick(index)}
                    className={getAnswerClassName(index)}
                  >
                    <MathJax dynamic key={`mathjax-answer-${currentQuestionIndex}-${index}`}>
                      {renderWithNewlines(answer.text)}
                    </MathJax>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-shrink-0 justify-between border-t p-4 sm:p-6">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
            >
              Προηγούμενη
            </button>
            {currentQuestionIndex === examQuestions.length - 1 && score === null ? (
              <button
                onClick={finishExam}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:px-5"
              >
                Ολοκλήρωση
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === examQuestions.length - 1}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
              >
                Επόμενη
              </button>
            )}
          </div>
        </div>
      </MathJaxContext>
    </div>
  );
}
