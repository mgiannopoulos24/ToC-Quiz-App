export interface Answer {
  text: string;
  correct: boolean;
  description: string;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}