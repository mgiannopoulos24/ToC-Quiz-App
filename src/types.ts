export interface Answer {
  text: string;
  correct: boolean;
  description: string;
}

export interface Question {
  question: string;
  image?: string; // Optional
  answers: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface TrueFalseQuestion {
  group: string;
  id: number;
  question: string;
  correctAnswer: string;
  explanation: string;
  hint?: string; // Optional
}

export interface TrueFalseQuiz {
  id: string;
  title: string;
  description: string;
  questions: TrueFalseQuestion[];
}
