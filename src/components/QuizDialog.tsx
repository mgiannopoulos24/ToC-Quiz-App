import { Quiz } from '../types';
import { loadImage } from '../utils/loadImage';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface QuizDialogProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizDialog({ quiz, isOpen, onClose }: QuizDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [expandedAnswers, setExpandedAnswers] = useState<boolean[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null); // State for the current image

  useEffect(() => {
    if (quiz.questions[currentQuestion]) {
      setExpandedAnswers(new Array(quiz.questions[currentQuestion].answers.length).fill(false));
    }
  }, [currentQuestion, quiz]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedAnswer(null);
      setSelectedMulti([]);
      setSubmitted(false);
      setCurrentQuestion(0);
    }
  }, [isOpen]);

  // Load the image dynamically when the question changes
  useEffect(() => {
    const question = quiz.questions[currentQuestion];
    if (question.image) {
      loadImage(question.image).then((image) => {
        setCurrentImage(image);
      });
    } else {
      setCurrentImage(null);
    }
  }, [currentQuestion, quiz]);

  if (!isOpen) return null;

  const question = quiz.questions[currentQuestion];
  const correctCount = question.answers.filter((a) => a.correct).length;
  const isMulti = correctCount > 1;
  // Nothing is revealed until the user presses "Check"
  const isRevealed = submitted;

  const handleAnswerClick = (index: number) => {
    if (isMulti) {
      // Multi-select: toggle selection without revealing until check
      if (submitted) return;
      setSelectedMulti((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
      return;
    }

    // Single-select: pick an answer, reveal only after check
    if (submitted) return;
    setSelectedAnswer(index);
  };

  const handleClose = () => {
    onClose();
    setSelectedAnswer(null);
    setSelectedMulti([]);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (submitted) return;
    if (isMulti) {
      if (selectedMulti.length === 0) return;
      setSubmitted(true);
      setExpandedAnswers((prev) => {
        const newState = [...prev];
        selectedMulti.forEach((i) => {
          newState[i] = true;
        });
        return newState;
      });
      return;
    }
    if (selectedAnswer === null) return;
    setSubmitted(true);
    setExpandedAnswers((prev) => {
      const newState = [...prev];
      newState[selectedAnswer] = true;
      return newState;
    });
  };

  const getAnswerClassName = (index: number) => {
    if (isMulti) {
      if (!submitted) {
        return selectedMulti.includes(index)
          ? 'border border-blue-500 bg-blue-50 p-4 rounded-lg mb-2 hover:bg-blue-100 cursor-pointer'
          : 'border border-gray-300 p-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer';
      }
      // After check: correct in green, wrong in red
      if (question.answers[index].correct) {
        return 'border border-green-500 bg-green-50 p-4 rounded-lg mb-2 cursor-default';
      }
      return 'border border-red-500 bg-red-50 p-4 rounded-lg mb-2 cursor-default';
    }
    if (!submitted) {
      return selectedAnswer === index
        ? 'border border-blue-500 bg-blue-50 p-4 rounded-lg mb-2 hover:bg-blue-100 cursor-pointer'
        : 'border border-gray-300 p-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer';
    }

    // Show correct answers in green
    if (question.answers[index].correct) {
      return 'border border-green-500 bg-green-50 p-4 rounded-lg mb-2 cursor-default';
    }

    // Show ALL wrong answers in red when any answer is selected
    if (!question.answers[index].correct) {
      return 'border border-red-500 bg-red-50 p-4 rounded-lg mb-2 cursor-default';
    }

    // Fallback (shouldn't reach here)
    return 'border border-gray-300 p-4 rounded-lg mb-2 cursor-default';
  };

  const goToNextQuestion = () => {
    setSelectedAnswer(null);
    setSelectedMulti([]);
    setSubmitted(false);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    setSelectedAnswer(null);
    setSelectedMulti([]);
    setSubmitted(false);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderWithNewlines = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
      <MathJaxContext key={currentQuestion}>
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {currentQuestion + 1}/{quiz.questions.length}{' '}
              {quiz.questions.length === 1 ? 'ερώτηση' : 'ερωτήσεις'}
            </h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <MathJax>{renderWithNewlines(question.question)}</MathJax>
            {isMulti && (
              <p className="mt-2 text-sm font-medium text-blue-700">
                Ερώτηση πολλαπλής επιλογής — επίλεξε τις απαντήσεις σου και πάτα «Έλεγχος».
              </p>
            )}
            {currentImage && (
              <div className="mt-4 flex justify-center">
                <img
                  src={currentImage}
                  alt="Question Illustration"
                  className="h-auto max-w-full rounded-lg"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
          </div>

          <div className="space-y-1">
            {question.answers.map((answer, index) => (
              <div key={index}>
                <div onClick={() => handleAnswerClick(index)} className={getAnswerClassName(index)}>
                  <MathJax>{renderWithNewlines(answer.text)}</MathJax>
                </div>
                {isRevealed && (
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setExpandedAnswers((prev) => {
                          const newState = [...prev];
                          newState[index] = !newState[index];
                          return newState;
                        });
                      }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      {expandedAnswers[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      {expandedAnswers[index] ? 'Κρύψε την' : 'Δείξε την'} εξήγηση
                    </button>

                    {expandedAnswers[index] && (
                      <div className="mt-2 rounded-lg bg-gray-50 p-4">
                        <MathJax>{renderWithNewlines(answer.description)}</MathJax>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={isMulti ? selectedMulti.length === 0 : selectedAnswer === null}
              className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {isMulti ? `Έλεγχος (${selectedMulti.length} επιλεγμένες)` : 'Έλεγχος'}
            </button>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              Προηγούμενη
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestion === quiz.questions.length - 1}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Επόμενη
            </button>
          </div>
        </div>
      </MathJaxContext>
    </div>
  );
}
