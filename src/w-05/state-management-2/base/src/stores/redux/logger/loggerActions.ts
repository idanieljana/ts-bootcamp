import { createAction } from '@reduxjs/toolkit';
import { LoggerActions } from './loggerTypes';
import { getId } from './loggerUtils';

interface SetCreatedPayload {
  payload: {
    createdAt: string;
    id: string;
  }
}
function handleSetCreated(): SetCreatedPayload {
  return {
    payload: {
      id: getId(),
      createdAt: new Date().toISOString(),
    },
  };
}

export const setCreated = createAction(LoggerActions.SetCreated, handleSetCreated);
