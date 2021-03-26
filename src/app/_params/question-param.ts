export class TestSubmissionParam {
  testId: number;
  spentTime: number;
  questions: QuestionParam[];

  constructor(testId: number, spentTime: number, questions: QuestionParam[]) {
    this.testId = testId;
    this.spentTime = spentTime;
    this.questions = questions;
  }
}

export class QuestionParam {
  id: number;
  options: string;

  constructor(id: number, options: string) {
    this.id = id;
    this.options = options;
  }
}