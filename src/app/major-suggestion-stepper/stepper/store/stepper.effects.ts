import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as StepperActions from './stepper.actions';
import {
  switchMap,
  catchError,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Subject } from '../../../_models/subject';
import { Injectable } from '@angular/core';
import { SuggestedSubjectsGroup } from 'src/app/_models/suggested-subjects-group';
import * as fromApp from '../../../_store/app.reducer';
import { Store } from '@ngrx/store';
import { University } from 'src/app/_models/university';
import { Test } from 'src/app/_models/test';
import { MarkParam } from 'src/app/_params/mark-param';
import { TestSubmission } from 'src/app/_models/test-submission';
import { ClassifiedTests } from 'src/app/_models/classified-tests';

@Injectable()
export class StepperEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect()
  loadSubjects = this.actions$.pipe(
    ofType(StepperActions.LOAD_SUBJECTS),
    switchMap(() => {
      return this.http.get<Subject[]>('https://localhost:44344/api/v1/subject');
    }),
    map((subjects) => {
      return new StepperActions.SetSubjects(subjects);
    })
  );

  @Effect()
  loadResult = this.actions$.pipe(
    ofType(StepperActions.SET_MARKS),
    withLatestFrom(this.store.select('stepper')),
    switchMap(([actionData, stepperState]) => {
      return this.http.post<SuggestedSubjectsGroup[]>(
        'https://localhost:44344/api/v1/subject-group/top-subject-group',
        new MarkParam(stepperState.marks, true)
      );
    }),
    map((suggestedGroup) => {
      return new StepperActions.SetSuggestedSubjectsGroup(suggestedGroup);
    })
  );

  @Effect()
  loadUniversities = this.actions$.pipe(
    ofType(StepperActions.LOAD_UNIVERSIIES),
    withLatestFrom(this.store.select('stepper')),
    switchMap(([actionData, stepperState] : [StepperActions.LoadUniversities, {selectedGroupId: number, selectedMajorId: number, totalMark: number}]) => {
      let queryParams = new HttpParams();
      queryParams = queryParams.append('SubjectGroupId', stepperState.selectedGroupId.toString());
      queryParams = queryParams.append('MajorId', stepperState.selectedMajorId.toString());
      queryParams = queryParams.append('TotalMark', stepperState.totalMark.toString());
      return this.http.get<University[]>(
        'https://localhost:44344/api/v1/university/suggestion',
        {
          params: queryParams
        }
      );
    }),
    map((universities) => {
      return new StepperActions.SetUniversities(universities);
    })
  );

  @Effect()
  loadTests = this.actions$.pipe(
    ofType(StepperActions.LOAD_TESTS),
    withLatestFrom(this.store.select('stepper')),
    switchMap(([actionData, stepperState]) => {
      let queryParams = new HttpParams();
      queryParams = queryParams.append('SubjectGroupId', stepperState.selectedGroupId.toString());
      queryParams = queryParams.append('UniversityId', stepperState.selectedUniversityId.toString());
      return this.http.get<ClassifiedTests[]>(
        'https://localhost:44344/api/v1/test/recommendation',
        {
          params: queryParams
        }
      );
    }),
    map((tests) => {
      return new StepperActions.SetTests(tests);
    })
  );

  @Effect()
  loadTest = this.actions$.pipe(
    ofType(StepperActions.LOAD_TEST),
    withLatestFrom(this.store.select('stepper')),
    switchMap(([actionData, stepperState]) => {
      return this.http.get<Test>(
        'https://localhost:44344/api/v1/test/' + stepperState.selectedTestId.toString()
      );
    }),
    map((test) => {
      return new StepperActions.SetTest(test);
    })
  );

  @Effect()
  scoringTest = this.actions$.pipe(
    ofType(StepperActions.SCORING_TEST),
    withLatestFrom(this.store.select('stepper')),
    switchMap(([actionData, stepperState]) => {
      return this.http.post<TestSubmission>(
        'https://localhost:44344/api/v1/test-submission', stepperState.testSubmissionParam
      );
    }),
    map((testSubmissionReponse) => {
      return new StepperActions.SetTestMark(testSubmissionReponse);
    })
  );
}
