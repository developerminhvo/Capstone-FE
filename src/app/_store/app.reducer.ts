import { ActionReducerMap } from '@ngrx/store';

import * as fromStepper from '../major-suggestion-stepper/stepper/store/stepper.reducer';
import * as fromAuth from '../authentication/store/auth.reducer';

export interface AppState {
  stepper: fromStepper.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  stepper: fromStepper.stepReducer,
  auth: fromAuth.authReducer
};
