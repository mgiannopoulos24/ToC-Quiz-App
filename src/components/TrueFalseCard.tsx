import { TrueFalseQuestion } from '../types';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useState } from 'react';

interface TrueFalseCardProps {
  question: TrueFalseQuestion;
}

function TrueFalseCard({ question }: TrueFalseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowHint(false);
    setShowExplanation(false);
  }, [question.id]);

  // Trigger MathJax rendering when content changes
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise().catch((err: Error) => console.log(err));
    }
  }, [question, showHint, showExplanation]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {question.group}
        </span>
      </div>

      <h3 className="mb-4 text-lg font-semibold text-gray-800">Ερώτηση {question.id}</h3>

      <div className="mb-6 text-gray-700">{question.question}</div>

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
          onClick={() => setShowHint(!showHint)}
          className="mb-4 rounded-lg bg-yellow-100 px-4 py-2 text-sm text-yellow-800 hover:bg-yellow-200"
        >
          {showHint ? 'Απόκρυψη Υπόδειξης' : 'Εμφάνιση Υπόδειξης'}
        </button>
      )}

      {showHint && !showExplanation && (
        <div className="mb-4 rounded-lg bg-yellow-50 p-4">
          <h4 className="mb-2 font-medium text-yellow-800">Υπόδειξη:</h4>
          <div className="text-yellow-700">{question.hint}</div>
        </div>
      )}

      {showExplanation && (
        <div className="space-y-4">
          <div className={`rounded-lg p-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <h4 className={`mb-2 font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Σωστή απάντηση!' : 'Λάθος απάντηση'}
            </h4>
            <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
              Η σωστή απάντηση είναι: <strong>{question.correctAnswer}</strong>
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-medium text-blue-800">Εξήγηση:</h4>
            <div className="text-blue-700">
              <MathJaxContext>
                <MathJax>{question.explanation}</MathJax>
              </MathJaxContext>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrueFalseCard;
