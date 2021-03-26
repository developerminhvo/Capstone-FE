import { Action } from "@ngrx/store";

export const LOGIN_GOOGLE = '[Auth] Login Goole';

export class LoginGoogle implements Action {
  readonly type = LOGIN_GOOGLE;
}

export type AuthActions = LoginGoogle;