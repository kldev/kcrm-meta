import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

import { appReducer } from './app';
import { navReducer } from './nav';
import { loginReducer } from './login';

const rootReducer = combineReducers({
  app: appReducer,
  nav: navReducer,
  login: loginReducer,
});

export type RootAppState = ReturnType<typeof rootReducer>; // create type base on object

export const configureStore = () => {
  const middleWares = [thunkMiddleware];
  let middleWareEnhancer = applyMiddleware(...middleWares);

  if (`${process.env.NODE_ENV}` === 'development') {
    middleWareEnhancer = composeWithDevTools(middleWareEnhancer);
  }

  const store = createStore(rootReducer, middleWareEnhancer);

  return store;
};
