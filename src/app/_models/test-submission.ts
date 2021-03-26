import { Major } from "./major";

export interface TestSubmission {
  id: number;
  testId: number;
  submissionDate: Date;
  spentTime: number;
  numberOfRightAnswers: number;
  mark: number;
  numberOfQuestion: number;
}