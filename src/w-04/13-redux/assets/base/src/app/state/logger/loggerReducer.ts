import { createReducer  } from "@reduxjs/toolkit";
import { addLog} from "./loggerActions";

export interface Log {
    log: string;
    id: string;
    createdAt: string;
}

export interface LoggerState {
    logs: Log[];
}

export const initialState: LoggerState = {
    logs: []
}

export const loggerReducer = createReducer(initialState, builder => {
    builder.addCase(
        addLog, (state, action) => {
            return { ...state, logs: [...state.logs, action.payload] };
        }
    )
})