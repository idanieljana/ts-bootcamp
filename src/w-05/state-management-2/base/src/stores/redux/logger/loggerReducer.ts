import { createReducer } from '@reduxjs/toolkit';
import { setCreated } from './loggerActions';

export interface LoggerState {
  created: string;
}

export const initialState: LoggerState = {
  created: '',
};

export const loggerReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    setCreated, (state, action) => {
      const created = `${action.payload.id} - ${action.payload.createdAt}`;
      // eslint-disable-next-line no-console
      console.log(created);
      return { ...state, created };
    },
  );
});
