import { Major } from "./major";

export interface SuggestedSubjectsGroup {
  id: number;
  name: string;
  totalMark: number;
  suggestedMajors: Major[]
}