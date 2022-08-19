import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { loadSessionState } from '../utils/storage/session-storage.utils';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistedState = loadSessionState();

export const store = createStore(rootReducer, persistedState, composedEnhancers);