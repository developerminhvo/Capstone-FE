import { Mark } from "../_models/mark";

export class MarkParam {
  marks: Mark[];
  isSuggest: boolean;
  constructor(marks: Mark[], isSuggest: boolean) {
    this.marks = marks;
    this.isSuggest = isSuggest;
  }
}