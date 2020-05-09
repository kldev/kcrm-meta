/// https://github.com/xdave/typescript-fsa-redux-thunk

import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { ILoginState } from './reducer';
import * as actions from './actions';
import * as appActions from '../app/actions';
import { LoginRequest, LoginResponse } from 'api/model';
import { StringUtil } from 'commonUtil';
import { AuthApi } from 'api';

const actionCreator = actionCreatorFactory('loginAsync');
const createAsync = asyncFactory<ILoginState>(actionCreator);
class CustomError extends Error {}

export const loginUserAsync = createAsync<LoginRequest, LoginResponse | null, CustomError>(
  'loginUser',
  async (params, dispatch) => {
    console.info('LoginUser async - action called');

    // login component behavior

    if (params == null || StringUtil.isEmpty(params.username) || StringUtil.isEmpty(params.password)) {
      dispatch(actions.setError("Username or password can't be empty"));
      return null;
    }

    dispatch(actions.setError(''));
    dispatch(actions.setStatus('in-progress'));

    try {
      const result = await AuthApi.login(params);

      if (result.status === 200 && result.data) {
        dispatch(actions.setStatus('success'));
        dispatch(
          appActions.loginSuccess({ token: result.data.token, username: params.username, role: result.data.role })
        );
      } else {
        dispatch(actions.setError('username or password invalid'));
        dispatch(actions.setStatus('failed'));
      }

      return result.data;
    } catch (err) {
      dispatch(actions.setError('unexpected network error'));
      dispatch(actions.setStatus('failed'));
      return null;
    }
  }
);

export type loginUserAsyncReturnType = ReturnType<typeof loginUserAsync>;
export type loginUserAsyncType = (req: LoginRequest) => Promise<LoginResponse | null>;
