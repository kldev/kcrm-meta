import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';

export interface INavState {
  visible: boolean;
  title: string;
}

const initialState: INavState = {
  visible: true,
  title: ''
};

export const navReducer = reducerWithInitialState(initialState)
  .caseWithAction(actions.setPageTitle, (state, { payload }) => ({
    ...state,
    title: payload
  }))
  .caseWithAction(actions.toggle, state => ({
    ...state,
    visible: !state.visible
  }))
  .caseWithAction(actions.setVisible, (state, { payload }) => ({
    ...state,
    visible: payload
  }))
  .build();
