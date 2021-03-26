import { Action } from "@ngrx/store";
import { ClassifiedTests } from "src/app/_models/classified-tests";
import { Mark } from "src/app/_models/mark";
import { SuggestedSubjectsGroup } from "src/app/_models/suggested-subjects-group";
import { Test } from "src/app/_models/test";
import { TestSubmission } from "src/app/_models/test-submission";
import { University } from "src/app/_models/university";
import { MarkParam } from "src/app/_params/mark-param";
import { TestSubmissionParam } from "src/app/_params/question-param";
import { Subject } from "../../../_models/subject";

export const LOAD_SUBJECTS = '[Stepper] Load Subjects';
export const SET_SUBJECTS = '[Stepper] Set Subjects';
export const SET_MARKS = '[Stepper] Set Marks';
export const SET_SUGGESTED_SUBJECTS_GROUP = '[Stepper] Set Suggested Subjects Group';
export const SET_UNIVERSIIES = '[Stepper] Set Universities';
export const LOAD_UNIVERSIIES = '[Stepper] Load Universities';
export const SET_TESTS = '[Stepper] Set Tests';
export const LOAD_TESTS = '[Stepper] Load Tests';
export const LOAD_TEST = '[Stepper] Load Test';
export const SET_TEST = '[Stepper] Set Test';
export const SCORING_TEST = '[Stepper] Scoring Test';
export const SET_TEST_MARK = '[Stepper] Set Test Mark';
export const RESET_STATE = '[Stepper] Reset State';

export class LoadSubjects implements Action {
  readonly type = LOAD_SUBJECTS;
}

export class SetSubjects implements Action {
  readonly type = SET_SUBJECTS;
  constructor(public payload: Subject[]) {}
}

export class SetMarks implements Action {
  readonly type = SET_MARKS;
  constructor(public payload: Mark[]) {}
}

export class SetSuggestedSubjectsGroup implements Action {
  readonly type = SET_SUGGESTED_SUBJECTS_GROUP;
  constructor(public payload: SuggestedSubjectsGroup[]) {}
}

export class LoadUniversities implements Action {
  readonly type = LOAD_UNIVERSIIES;
  constructor(public payload: {subjectGroupId: number, majorId: number, totalMark: number}) {}
}

export class SetUniversities implements Action {
  readonly type = SET_UNIVERSIIES;
  constructor(public payload: University[]) {}
}

export class SetTests implements Action {
  readonly type = SET_TESTS;
  constructor(public payload: ClassifiedTests[]) {}
}

export class LoadTests implements Action {
  readonly type = LOAD_TESTS;
  constructor(public payload: number) {}
}


export class LoadTest implements Action {
  readonly type = LOAD_TEST;
  constructor(public payload: number) {}
}

export class SetTest implements Action {
  readonly type = SET_TEST;
  constructor(public payload: Test) {}
}

export class ScoringTest implements Action {
  readonly type = SCORING_TEST;
  constructor(public payload: TestSubmissionParam) {}
}

export class SetTestMark implements Action {
  readonly type = SET_TEST_MARK;
  constructor(public payload: TestSubmission) {}
}

export class ResetState implements Action {
  readonly type = RESET_STATE;
}

export type StepperActions = ResetState | ScoringTest | SetTestMark | LoadTest | SetTest | LoadSubjects | SetSubjects | SetMarks | SetSuggestedSubjectsGroup | LoadUniversities | SetUniversities | LoadTests | SetTests;