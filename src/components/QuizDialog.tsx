import React, { useState, useEffect } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Quiz } from '../types';

interface QuizDialogProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizDialog({ quiz, isOpen, onClose }: QuizDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  // Reset states when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedAnswer(null);
      setShowDescription(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const question = quiz.questions[currentQuestion];

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleClose = () => {
    onClose();
    setSelectedAnswer(null);
    setShowDescription(false);
  };

  const getAnswerClassName = (index: number) => {
    if (selectedAnswer === null) {
      return "border border-gray-300 p-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer";
    }
    if (question.answers[index].correct) {
      return "border border-green-500 bg-green-50 p-4 rounded-lg mb-2";
    }
    if (index === selectedAnswer && !question.answers[index].correct) {
      return "border border-red-500 bg-red-50 p-4 rounded-lg mb-2";
    }
    return "border border-gray-300 p-4 rounded-lg mb-2 opacity-50";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <MathJaxContext>
        <div className="bg-white rounded-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Question {currentQuestion + 1}/{quiz.questions.length}</h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <MathJax>{question.question}</MathJax>
          </div>

          <div className="space-y-2">
            {question.answers.map((answer, index) => (
              <div
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={getAnswerClassName(index)}
              >
                <MathJax>{answer.text}</MathJax>
              </div>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className="mt-4">
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                {showDescription ? "Hide" : "Show"} Explanation
              </button>
              
              {showDescription && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <MathJax>
                    {question.answers[selectedAnswer].description}
                  </MathJax>
                </div>
              )}
            </div>
          )}
        </div>
      </MathJaxContext>
    </div>
  );
}