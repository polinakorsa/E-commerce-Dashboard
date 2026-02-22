import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import usersSlice from './usersSlice.ts';
import productsSlice from './productsSlice.ts';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const logger = createLogger({
  collapsed: true,
});

const store = configureStore({
  reducer: { usersSlice, productsSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
