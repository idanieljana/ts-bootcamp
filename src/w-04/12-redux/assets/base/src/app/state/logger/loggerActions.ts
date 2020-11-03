import { createAction, nanoid } from "@reduxjs/toolkit";

export enum LoggerActions {
    Add = "logger/add",
}

function handleAddLog(log: string) {
    return {
        payload: {
            log: log,
            id: nanoid(),
            createdAt: new Date().toISOString(),
        },
    }
}

export const addLog = createAction(LoggerActions.Add, handleAddLog);