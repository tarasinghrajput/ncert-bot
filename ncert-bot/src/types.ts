export interface PDFBook {
  id: number;
  subject: string;
  grade: string;
  year: string;
  pdfUrl: string;
}

export interface MCQ {
  mcq_id: string;
  question: string;
  options: Array<{
    option_id: string;
    option_value: string;
  }>;
  correct_option: string;
  answer_explanation: string;
}

export interface FillInBlank {
  question_id: string;
  question: string;
  correct_option: string;
  answer_explanation: string;
  options: Array<{
    option_id: string;
    option_value: string;
  }>;
}

export interface QnA {
  question_id: string;
  question: string;
  answer: string;
}

export interface BookData {
  summary: string;
  mcqs: MCQ[];
  "fill-in-the-blanks": FillInBlank[];
  qnas: QnA[];
}
