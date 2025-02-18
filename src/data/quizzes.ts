export const quizzes = [
  {
    id: "theory-of-computation",
    title: "Μάθημα 1",
    description: "",
    questions: [
      {
        question: "Έστω τα \\(\\mathit{A}\\), \\(\\mathit{B}\\) σύνολα. Ποια (ή ποιες) από τις παρακάτω προτάσεις είναι λανθασμένη (λανθασμένες); Θυμίζουμε ότι \\(\\mathit{A} - \\mathit{B} = \\mathit{A} \\cap \\mathit{\\overline{B}}\\).",
        answers: [
          {
            text: "\\((\\mathit{A} - \\mathit{Β})\\ \\cup \\mathit{B} = \\mathit{A} \\cup \\mathit{B} \\)",
            correct: false,
            description: "TBD"
          },
          {
            text: "\\((\\mathit{A} - \\mathit{Β})\\ \\cap \\mathit{Β} =  \\emptyset \\)",
            correct: false,
            description: "TBD"
          },
          {
            text: "\\((\\mathit{A} - \\mathit{Β}) \\iff \(\\mathit{A} - \\mathit{B} = \\mathit{B} - \\mathit{A})\\)",
            correct: false,
            description: "TBD"
          },
          {
            "text": "\\((\\mathit{A} - \\mathit{B} = \\mathit{A}) \\iff (\\mathit{A} \\cap \\mathit{B} = \\emptyset)\\)",
            correct: false,
            description: "TBD"
          },
          {
            text: "Όλες οι προηγούμενες προτάσεις είναι λάθος.",
            correct: true,
            description: "Εφόσον όλες οι προηγούμενες προτάσεις είναι σωστές, αυτή η πρόταση είναι λανθασμένη."
          }
        ]
      }
    ]
  }
];