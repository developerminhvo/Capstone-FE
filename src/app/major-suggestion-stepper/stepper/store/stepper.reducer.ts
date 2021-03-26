import { ClassifiedTests } from 'src/app/_models/classified-tests';
import { Mark } from 'src/app/_models/mark';
import { SuggestedSubjectsGroup } from 'src/app/_models/suggested-subjects-group';
import { Test } from 'src/app/_models/test';
import { TestSubmission } from 'src/app/_models/test-submission';
import { University } from 'src/app/_models/university';
import { TestSubmissionParam } from 'src/app/_params/question-param';
import { Subject } from '../../../_models/subject';
import * as StepperActions from './stepper.actions';

export interface State {
  subjects: Subject[];
  marks: Mark[];
  isLoading: boolean;
  suggestedSubjectsGroup: SuggestedSubjectsGroup[];
  universities: University[];
  tests: ClassifiedTests[];
  test: Test;
  totalMark: number;
  selectedGroupId: number;
  selectedMajorId: number;
  selectedUniversityId: number;
  selectedTestId: number;
  testSubmissionParam: TestSubmissionParam;
  testSubmissionReponse: TestSubmission;
}

const initialState: State = {
  subjects: [],
  isLoading: false,
  marks: [],
  suggestedSubjectsGroup: [],
  universities: [],
  tests: [],
  test: null,
  totalMark: null,
  selectedGroupId: null,
  selectedMajorId: null,
  selectedUniversityId: null,
  selectedTestId: null,
  testSubmissionParam: null,
  testSubmissionReponse: null
};

export function stepReducer(
  state = initialState,
  action: StepperActions.StepperActions
) {
  switch (action.type) {
    case StepperActions.LOAD_SUBJECTS:
      return {
        ...state,
        isLoading: true,
      };
    case StepperActions.SET_SUBJECTS:
      return {
        ...state,
        subjects: [...action.payload],
        isLoading: false,
      };
    case StepperActions.SET_MARKS:
      return {
        ...state,
        suggestedSubjectsGroup: null,
        universities: [],
        tests: [],
        test: null,
        marks: [...action.payload],
      };
    case StepperActions.SET_SUGGESTED_SUBJECTS_GROUP:
      return {
        ...state,
        suggestedSubjectsGroup: action.payload,
        isLoading: false,
      };
    case StepperActions.LOAD_UNIVERSIIES:
      return {
        ...state,
        isLoading: true,
        totalMark: action.payload.totalMark,
        selectedGroupId: action.payload.subjectGroupId,
        selectedMajorId: action.payload.majorId,
      };
    case StepperActions.SET_UNIVERSIIES:
      return {
        ...state,
        universities: action.payload,
        isLoading: false,
        tests: [],
        test: null,
      };
    case StepperActions.LOAD_TESTS:
      return {
        ...state,
        selectedUniversityId: action.payload,
        isLoading: true,
        test: null,
      };
    case StepperActions.SET_TESTS:
      return {
        ...state,
        tests: action.payload,
        isLoading: false,
      };
    case StepperActions.LOAD_TEST:
      return {
        ...state,
        selectedTestId: action.payload,
        isLoading: true,
      };
    case StepperActions.SET_TEST:
      return {
        ...state,
        test: action.payload,
        isLoading: false,
      };
    case StepperActions.SCORING_TEST:
      return {
        ...state,
        testSubmissionParam: action.payload,
        isLoading: true,
      };
    case StepperActions.SET_TEST_MARK:
      return {
        ...state,
        testSubmissionReponse: action.payload,
        isLoading: false,
      };
    case StepperActions.RESET_STATE:
      return {
        ...state, ...initialState
      };
    default:
      return state;
  }
}
