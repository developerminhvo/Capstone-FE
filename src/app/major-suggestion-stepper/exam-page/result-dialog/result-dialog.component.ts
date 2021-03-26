import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestSubmission } from 'src/app/_models/test-submission';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ResultDialogComponent>) {}

  isLoggedIn: boolean = false;

  onOkClick(): void {
    this.dialogRef.close();
  }

  onLoginClick(): void {
    this.isLoggedIn = true;
  }

  ngOnInit() {
  }

}
