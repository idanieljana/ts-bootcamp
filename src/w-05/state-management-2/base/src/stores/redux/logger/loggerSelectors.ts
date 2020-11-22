import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLogs = (state: RootState) => state.logger.logs;
export const getLastLog = createSelector(getLogs, (logs) => logs[logs.length - 1]);
export const getLogsCount = createSelector(getLogs, (logs) => logs.length);
