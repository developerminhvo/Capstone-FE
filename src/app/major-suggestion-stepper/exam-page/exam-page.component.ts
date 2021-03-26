import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Test } from 'src/app/_models/test';
import * as fromApp from "../../_store/app.reducer";
import * as StepperActions from "../stepper/store/stepper.actions";
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { TestSubmission } from 'src/app/_models/test-submission';
import { QuestionParam, TestSubmissionParam } from 'src/app/_params/question-param';
import { DEFAULT_UNSELECTED_ANSWER, DEFAULT_SELECTED_ANSWER } from '../../_common/constants';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.scss'],
})
export class ExamPageComponent implements OnInit, OnDestroy {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;


  examSubmissionFormGroup: FormGroup = null;
  test: Test;
  testSubmissionReponse: TestSubmission;
  isScored: boolean = false;

  subscription: Subscription;

  selectedIndex: any;
  selectedTestId: number;

  constructor(private store: Store<fromApp.AppState>,  private _formBuilder: FormBuilder, 
              public dialog: MatDialog) { }

  ngOnInit() {    
    this.examSubmissionFormGroup = this._formBuilder.group({}); 

    this.subscription = this.store
      .select('stepper')
      .subscribe(
        (stepperState) => {
          if (stepperState.testSubmissionReponse) {
            this.testSubmissionReponse = stepperState.testSubmissionReponse;
          }
          this.selectedTestId = stepperState.selectedTestId;
          if (this.testSubmissionReponse) {
            // this.openDialog();
            this.isScored = true;
          }
          if (stepperState.test) {
            this.test = stepperState.test;
            console.log("Test: ", this.test.questions);
            for (let question of this.test.questions) {
              this.examSubmissionFormGroup.addControl(
                question.id.toString(),
                new FormControl(-1, null)
              );
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );

    
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getOrderOfQuestion(index: number): void {
    this.selectedIndex = index;
  }

  onSubmit() {
    let questions: QuestionParam[] = [];
    for(let question of this.test.questions) {
      questions.push(new QuestionParam(question.id, this.getResult(question.options.length, +this.examSubmissionFormGroup.value[question.id])))
    }
    console.log(Math.ceil(90 - (this.countdown.left / 60000)));
    this.countdown.stop();
    this.store.dispatch(new StepperActions.ScoringTest(new TestSubmissionParam(this.test.id, Math.ceil(90 - (this.countdown.left / 60000)), questions)));
  }

  getResult(numberOfAnswer: number, selectedId: number): string {
    let result = DEFAULT_UNSELECTED_ANSWER.repeat(numberOfAnswer);
    let finalResul = result;
    if (selectedId >= 0) {
      finalResul = result.substring(0, selectedId) + DEFAULT_SELECTED_ANSWER + result.substring(selectedId + 1);
    }
    return finalResul;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: '500px',
      height: '430px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Exam close");
    });
  }

  handleCoundown(event: CountdownEvent) {
   if (event.action === "done") {
    this.onSubmit();
   }
  }

  onSave() {
    this.store.dispatch(new StepperActions.ResetState());
    this.openDialog();
  }

}
