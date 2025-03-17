import { useState, useEffect } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Quiz } from '../types';
import { loadImage } from '../utils/loadImage'; 

interface QuizDialogProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizDialog({ quiz, isOpen, onClose }: QuizDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
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

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setExpandedAnswers(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleClose = () => {
    onClose();
    setSelectedAnswer(null);
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

  const goToNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    setSelectedAnswer(null);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <MathJaxContext key={currentQuestion}>
        <div className="bg-white rounded-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{currentQuestion + 1}/{quiz.questions.length} {quiz.questions.length === 1 ? 'ερώτηση' : 'ερωτήσεις'}</h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6 max-h-60 overflow-y-auto">
            <MathJax>{renderWithNewlines(question.question)}</MathJax>
            {currentImage && (
              <div className="flex justify-center mt-4">
                <img 
                  src={currentImage} 
                  alt="Question Illustration" 
                  className="rounded-lg max-w-full h-auto" 
                  style={{ maxHeight: '300px' }} 
                />
              </div>
            )}
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {question.answers.map((answer, index) => (
              <div key={index}>
                <div
                  onClick={() => handleAnswerClick(index)}
                  className={getAnswerClassName(index)}
                >
                  <MathJax>{renderWithNewlines(answer.text)}</MathJax>
                </div>
                {selectedAnswer !== null && (
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setExpandedAnswers(prev => {
                          const newState = [...prev];
                          newState[index] = !newState[index];
                          return newState;
                        });
                      }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      {expandedAnswers[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      {expandedAnswers[index] ? "Κρύψε την" : "Δείξε την"} εξήγηση
                    </button>

                    {expandedAnswers[index] && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                        <MathJax>
                          {renderWithNewlines(answer.description)}
                        </MathJax>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Προηγούμενη
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestion === quiz.questions.length - 1}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Επόμενη
            </button>
          </div>
        </div>
      </MathJaxContext>
    </div>
  );
}