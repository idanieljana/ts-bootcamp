export enum LoggerActions {
  Add = 'logger/add',
  Clear = 'logger/clear',
}

export enum LogType {
  Card = 'Card',
}

export interface Log {
  log: string;
  id: string;
  type: LogType;
  createdAt: string;
}
