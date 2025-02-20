export const quizzes = [
  {
    id: "quiz-1",
    title: "Μάθημα 1",
    description: "",
    questions: [
      {
        question: "Έστω τα \\(\\mathit{A}\\), \\(\\mathit{B}\\) σύνολα. Ποια (ή ποιες) από τις παρακάτω προτάσεις είναι λανθασμένη (λανθασμένες); Θυμίζουμε ότι \\(\\mathit{A} - \\mathit{B} = \\mathit{A} \\cap \\bar{\\mathit{B}}\\).",
        answers: [
          {
            text: "\\((\\mathit{A} - \\mathit{Β})\\ \\cup \\mathit{B} = \\mathit{A} \\cup \\mathit{B} \\)",
            correct: false,
            description: "Εφόσον \\((\\mathit{A} - \\mathit{B})\\ = \\mathit{A} \\cap \\bar{\\mathit{B}}\\), η ένωση \\((\\mathit{A} \\cap \\bar{\\mathit{B}}) \\cup \\mathit{B}\\) ισοδυναμεί με \\(\\mathit{A} \\cup \\mathit{B}\\), καθώς τα στοιχεία του \\(\\mathit{B}\\) συμπληρώνουν αυτά του \\(\\mathit{A}\\). Άρα η πρόταση είναι σωστή."
          },
          {
            text: "\\((\\mathit{A} - \\mathit{Β})\\ \\cap \\mathit{Β} =  \\emptyset \\)",
            correct: false,
            description: "Επειδή \\(\\mathit{A} - \\mathit{B}\\ = \\mathit{A} \\cap \\bar{\\mathit{B}}\\), η τομή \\((\\mathit{A} \\cap \\bar{\\mathit{B}}) \\cap \\mathit{B}\\) είναι κενή, αφού τα στοιχεία του \\(\\bar{\\mathit{B}}\\) δεν ανήκουν στο \\(\\mathit{B}\\). Άρα, η πρόταση είναι σωστή."
          },
          {
            text: "\\((\\mathit{A} = \\mathit{Β}) \\iff \(\\mathit{A} - \\mathit{B} = \\mathit{B} - \\mathit{A})\\)",
            correct: false,
            description: "Αν \\(\\mathit{A} = \\mathit{B}\\), τότε \\(\\mathit{A} - \\mathit{B} = \\emptyset\\) και \\(\\mathit{B} - \\mathit{A} = \\emptyset\\), οπότε \\(\\mathit{A} - \\mathit{B} = \\mathit{B} - \\mathit{A}\\). Αντίστροφα, αν \\(\\mathit{A} - \\mathit{B} = \\mathit{B} - \\mathit{A}\\), τότε \\(\\mathit{A}\\) και \\(\\mathit{B}\\) πρέπει να είναι ίσα, αφού οι διαστάσεις τους είναι κενές. Άρα, η πρόταση είναι σωστή."
          },
          {
            "text": "\\((\\mathit{A} - \\mathit{B} = \\mathit{A}) \\iff (\\mathit{A} \\cap \\mathit{B} = \\emptyset)\\)",
            correct: false,
            description: "Αν \\(\\mathit{A} - \\mathit{B} = \\mathit{A}\\), τότε \\(\\mathit{A} \\cap \\mathit{B} = \\emptyset\\), αφού κανένα στοιχείο του \\(\\mathit{A}\\) δεν ανήκει στο \\(\\mathit{B}\\). Αντίστροφα, αν \\(\\mathit{A} \\cap \\mathit{B} = \\emptyset\\), τότε \\(\\mathit{A} - \\mathit{B} = \\mathit{A}\\), αφού δεν αφαιρούμε κανένα στοιχείο από το \\(\\mathit{A}\\). Άρα, η πρόταση είναι σωστή."
          },
          {
            text: "Όλες οι προηγούμενες προτάσεις είναι λάθος.",
            correct: true,
            description: "Εφόσον όλες οι προηγούμενες προτάσεις είναι σωστές, αυτή η πρόταση είναι λανθασμένη."
          }
        ]
      }
    ]
  },
  {
    id:"quiz-2",
    title: "Μάθημα 2",
    description:"",
    questions: [
      {
        question: "Έστω το αλφάβητο \\(\\mathit{Σ}\\) και γλώσσα \\(\\mathit{L}\\subset\\mathit{Σ^*} \\). Ποιό από τα παρακάτω είναι σωστό;",
        answers: [
          {
            text: "\\( (\\ \\mathit{L^*})^*\\ \\subset \\mathit{L^*} \\)",
            correct: false,
            description: "TBD"
          },
          {
            text: "\\( \\mathit{L^*} \\subset (\\ \\mathit{L^*})^*\\ \\)",
            correct: false,
            description: "TBD"
          },
          {
            text: "\\( \\mathit{L^*} = (\\ \\mathit{L^*})^*\\ \\)",
            correct: true,
            description: "TBD"
          },
          {
            text: "\\( \\mathit{L^*} \\neq (\\ \\mathit{L^*})^*\\ \\)",
            correct: false,
            description: "TBD"
          },
          {
            text: "Κανένα από τα προηγούμενα.",
            correct: false,
            description: "TBD"
          }
        ]
      },
      {
        question: "Πόσες συμβολοσειρές \\(\\mathit{w} \\in \\{\\mathit{a},\\mathit{b} \\} \\) υπάρχουν τέτοιες ώστε να ισχύει \\(\\mathit{aw} = \\mathit{bw}\\) ;",
        answers: [
          {
            text: "Καμία",
            correct: true,
            description: "TBD"
          },
          {
            text: "Μία",
            correct: false,
            description: "TBD"
          },
          {
            text: "Δύο",
            correct: false,
            description: "TBD"
          },
          {
            text: "Άπειρες",
            correct: false,
            description: "TBD"
          }
        ]
      },
      {
        question: "Έστω το σύνολο \\( \\mathit{A} \\) είναι ισάριθμο με το \\( \\mathbb{N} \\). Ποιό από τα παρακάτω ισχύει;",
        answers: [
          {
            text: "Υπάρχει πάντα κλειστός τύπος που μας δίνει την αμφιμονοσήμαντη αντιστοιχία ανάμεσα στο \\( \\mathit{A} \\) και το \\( \\mathbb{N} \\).",
            correct: false,
            description: "TBD"
          },
          {
            text: "Αν \\( \\mathit{A} \\subseteq \\mathbb{N} \\) τότε υπάρχει πάντα κλειστός τύπος που μας δίνει την αμφιμονοσήμαντη αντιστοιχία ανάμεσα στο \\( \\mathit{A} \\) και το \\( \\mathbb{N} \\).",
            correct: false,
            description: "TBD"
          },
          {
            text: "Δεν υπάρχει πάντα κλειστός τύπος που μας δίνει την αμφιμονοσήματνη αντιστοιχία ανάμεσα στο \\( \\mathit{A} \\) και το \\( \\mathbb{N} \\).",
            correct: true,
            description: "TBD"
          },
          {
            text: "Είναι ανοιχτό πρόβλημα το αν υπάρχει πάντα κλειστός τύπος που μας δίνει την αμφιμονοσήμαντη αντιστοιχία ανάμεσα στο \\( \\mathit{A} \\) και το \\( \\mathbb{N} \\).",
            correct: false,
            description: "TBD"
          }
        ]
      }
    ]
  }
];