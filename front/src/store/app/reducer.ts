import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { StringUtil } from 'commonUtil';
import * as actions from './actions';

export interface IAppState {
  token: string;
  role: string;
  username: string;
  pageTitle: string;
  activeView: string;
}

const initialState: IAppState = {
  token: '',
  role: '',
  username: '',
  pageTitle: '',
  activeView: 'login',
};

if (window.sessionStorage) {
  if (
    window.sessionStorage.getItem('front-app') &&
    StringUtil.isEmpty(window.sessionStorage.getItem('front-app') as string) ===
      false
  ) {
    const payload = JSON.parse(
      window.sessionStorage.getItem('front-app') as string
    ) as {
      role: string;
      username: string;
      token: string;
    };

    initialState.token = payload.token;
    initialState.username = payload.username;
    initialState.role = payload.role;
  }
}

export const appReducer = reducerWithInitialState(initialState)
  .caseWithAction(actions.loginSuccess, (state, action) => {
    const { role, username, token } = action.payload;
    if (window.sessionStorage) {
      window.sessionStorage.setItem(
        'front-app',
        JSON.stringify(action.payload)
      );
    }

    return {
      ...state,
      role,
      username,
      token,
    };
  })
  .caseWithAction(actions.logout, (state, action) => {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }

    return { ...initialState };
  })
  .build();
