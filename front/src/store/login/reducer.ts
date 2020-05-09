import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { loginStatusType } from './types';

export interface ILoginState {
  errorMessage: string;
  status: loginStatusType;
}

const initialState: ILoginState = {
  errorMessage: '',
  status: 'idle'
};

export const loginReducer = reducerWithInitialState(initialState)
  .caseWithAction(actions.setStatus, (state, action) => ({
    ...state,
    status: action.payload
  }))
  .caseWithAction(actions.setError, (state, action) => ({
    ...state,
    errorMessage: action.payload
  }))
  .build();
