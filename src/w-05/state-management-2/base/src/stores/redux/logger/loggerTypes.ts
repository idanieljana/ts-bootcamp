export enum LoggerActions {
  SetCreated = 'logger/setCreated',
}

export enum LogType {
  Common = 'Common',
}

export interface Log {
  log: string;
  id: string;
  type: LogType;
  createdAt: string;
}
