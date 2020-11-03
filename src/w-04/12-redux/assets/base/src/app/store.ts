import { configureStore, ThunkAction, Action , AnyAction} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { loggerReducer } from './state/logger/loggerReducer';
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    logger: loggerReducer,
  },
});

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
