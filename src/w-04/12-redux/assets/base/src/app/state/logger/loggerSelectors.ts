import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getLogs = (state: RootState) => state.logger.logs;
export const getReportedLog = createSelector(getLogs, (logs)=> logs[logs.length - 1])