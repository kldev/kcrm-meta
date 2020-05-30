import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootAppState } from './index';

export type MapAsyncActionToProps<R> = (
  dispatch: ThunkDispatch<RootAppState, void, Action>
) => R;
