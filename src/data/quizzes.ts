export const quizzes = [
  {
    id: "theory-of-computation",
    title: "Μάθημα 1",
    description: "",
    questions: [
      {
        question: "Έστω τα \\(\\mathit{A}\\), \\(\\mathit{B}\\) σύνολα. Ποια (ή ποιες) από τις παρακάτω προτάσεις είναι λανθασμένη (λανθασμένες); Θυμίζουμε ότι \\(\\mathit{A} - \\mathit{B} = \\mathit{A} \\cap \\mathit{\\overline{B}}\\)",
        answers: [
          {
            text: "\\(\\Alpha - \\Beta = \\Beta - \\Alpha\\)",
            correct: true,
            description: "This is generally incorrect. Set difference is not commutative."
          },
          {
            text: "\\(\\Alpha - \\Beta \\subseteq \\Alpha\\)",
            correct: false,
            description: "This is correct. The set difference will always be a subset."
          },
          {
            text: "\\(\\Alpha \\cap (\\Alpha - \\Beta) = \\emptyset\\)",
            correct: false,
            description: "This is correct. The intersection of A and (A - B) is empty"
          }
        ]
      }
    ]
  }
];