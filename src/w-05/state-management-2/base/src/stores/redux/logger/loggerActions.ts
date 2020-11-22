import { createAction } from '@reduxjs/toolkit';
import { getId } from './loggerUtils';
import { LoggerActions, LogType } from './loggerTypes';

function handleAddLog(log: string, type: LogType) {
  return {
    payload: {
      log,
      type,
      id: getId(),
      createdAt: new Date().toISOString(),
    },
  };
}

export const addLog = createAction(LoggerActions.Add, handleAddLog);
export const clearLogs = createAction(LoggerActions.Clear);
