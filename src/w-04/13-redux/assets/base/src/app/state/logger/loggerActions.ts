import { createAction  } from "@reduxjs/toolkit";
import {getId} from "./loggerUtils";

export enum LoggerActions {
    Add = "logger/add",
}

function handleAddLog(log: string) {
    return {
        payload: {
            log: log,
            id: getId(),
            createdAt: new Date().toISOString(),
        },
    }
}

export const addLog = createAction(LoggerActions.Add, handleAddLog);