import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import usersSlice from './usersSlice.ts';
import productsSlice from './productsSlice.ts';

const logger = createLogger({
  collapsed: true,
});

const store = configureStore({
  reducer: { usersSlice, productsSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
