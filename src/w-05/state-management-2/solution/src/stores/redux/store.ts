import {
  configureStore,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { loggerReducer } from './logger/loggerReducer';

export const store = configureStore({
  devTools: {
    name: `MemoryCards: ${Date.now()}`,
  },
  reducer: {
    logger: loggerReducer,
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
