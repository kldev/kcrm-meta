import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('nav');

export const toggle = actionCreator('toggle');
export const setVisible = actionCreator<boolean>('setVisible');

export const setPageTitle = actionCreator<string>('setPageTitle');
