import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('app');

export const loginSuccess = actionCreator<{ token: string; username: string; role: string }>('loginSuccess');
export const logout = actionCreator('logout');
