import { createReducer } from '@reduxjs/toolkit';
import { addLog, clearLogs } from './loggerActions';
import { Log } from './loggerTypes';

export interface LoggerState {
  logs: Log[];
}

export const initialState: LoggerState = {
  logs: [],
};

export const loggerReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    addLog, (state, action) => ({ ...state, logs: [...state.logs, action.payload] }),
  );
  builder.addCase(
    clearLogs, (state) => ({ ...state, logs: [] }),
  );
});
