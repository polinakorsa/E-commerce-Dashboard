import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer.tsx';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;
