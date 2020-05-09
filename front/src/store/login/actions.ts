import actionCreatorFactory from 'typescript-fsa';
import { loginStatusType } from './types';

const actionCreator = actionCreatorFactory('login');

export const setError = actionCreator<string>('setError');
export const setStatus = actionCreator<loginStatusType>('setStatus');
