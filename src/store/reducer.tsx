import { combineReducers } from 'redux';
import usersReducer from './usersReducer.ts';

const reducers = combineReducers({
  usersReducer,
});

export default reducers;
