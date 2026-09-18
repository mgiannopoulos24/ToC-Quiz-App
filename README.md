# ToC Quiz App

Διαδραστική web εφαρμογή με όλα τα quizzes του μαθήματος **Θεωρία Υπολογισμού (Κ25)** του Τμήματος Πληροφορικής & Τηλεπικοινωνιών (ΕΚΠΑ).

**Live:** https://toc-quizzes.netlify.app/

## Περιεχόμενο

- **Quiz** — ερωτήσεις πολλαπλής επιλογής ανά ενότητα
- **Mega Quiz** — επανάληψη μεγάλης ύλης
- **Σωστό / Λάθος** — ερωτήσεις κρίσεως με αιτιολόγηση
- **Λειτουργία Εξέτασης** — τυχαίες ερωτήσεις με χρονομέτρηση· το σκορ αποθηκεύεται τοπικά σε cookie ανά χρήστη

Οι μαθηματικοί τύποι αποδίδονται με MathJax, ώστε οι εκφράσεις (π.χ. κανονικές γλώσσες, αυτόματα) να εμφανίζονται σωστά.

## Τεχνολογίες

React 19 · Vite · TypeScript · Tailwind CSS v4 · MathJax (`better-react-mathjax`) · js-cookie · lucide-react

## Τοπική εκτέλεση

Απαιτείται [Bun](https://bun.sh/).

```bash
git clone https://github.com/mgiannopoulos24/ToC-Quiz-App.git
cd ToC-Quiz-App
bun install
bun run dev
```

Η εφαρμογή ανοίγει στο `http://localhost:5173`.

Για production build:

```bash
bun run build
```

## Συνεισφορά

Βρήκες λάθος σε ερώτηση ή θέλεις να προσθέσεις υλικό; Άνοιξε ένα [issue](https://github.com/mgiannopoulos24/ToC-Quiz-App/issues) ή στείλε PR — κάθε βοήθεια ευπρόσδεκτη.

## Ευχαριστίες

- [Θάνος Λιάκουρας](https://github.com/thanos2940) για τις ερωτήσεις σωστού-λάθους.
