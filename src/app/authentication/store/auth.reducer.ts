import * as AuthActions from './auth.actions';

export interface State {

}

const initialState: State = {

};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_GOOGLE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
