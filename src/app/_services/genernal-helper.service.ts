import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WaitingComponent } from '../_sharings/components/waiting/waiting.component';

@Injectable({
  providedIn: 'root'
})
export class GenernalHelperService {

  private dialogWaitingPopupRef: MatDialogRef<WaitingComponent>;

  constructor(private _dialog: MatDialog) { }

  openWaitingPopup(): void {
    this.dialogWaitingPopupRef = this._dialog.open(WaitingComponent, {
      disableClose: true
    });
  }
  closeWaitingPopup(): void {
    //this.dialogWaitingPopupRef.getState().
    this.dialogWaitingPopupRef.close();
  }
  hasErrorInputValidation(controlName: string, errorName: string, inputFormControl: FormGroup): boolean {
    return inputFormControl.controls[controlName].hasError(errorName);    
  }     

}
