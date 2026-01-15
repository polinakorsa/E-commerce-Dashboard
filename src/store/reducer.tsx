import { combineReducers } from 'redux';
import usersReducer from './usersReducer.ts';
import productsReducer from './productsReducer.ts';

const reducers = combineReducers({
  usersReducer,
  productsReducer,
});

export default reducers;
