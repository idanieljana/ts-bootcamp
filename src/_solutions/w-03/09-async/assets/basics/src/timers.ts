/**
 * Write a method to call function after a delay,
 * Method should return "abort callback".
 * In case abort is called, function should not be called.
 * Delay should be passed in seconds.
 */
export function delay(handler: () => {}, delaySec: number): () => void {
  const timeoutId = setTimeout(handler, delaySec * 1000);
  return () => {
    clearTimeout(timeoutId);
  };
}

/**
 * Write a method to call function with interval.
 * Method should return "abort callback".
 * In case abort is called, function should not be called.
 * Delay should be passed in seconds.
 */
export function period(handler: () => {}, intervalSec: number): () => void {
  const intervalId = setInterval(handler, intervalSec * 1000);
  return () => {
    clearInterval(intervalId);
  };
}

/**
 * Write a function to schedule passed action,
 * The arguments include action handler, logger, delay in seconds and action name.
 * Delay is optional
 * The possible action names are "Play" | "Pause
 */

export type ExecutionHandler = () => void;
export type ExecutionLogger = (log: [ExecutionAction, ExecutionStatus]) => void;
export enum ExecutionAction {
  Play = 'Play'
  // Pause = "Pause",
}
export enum ExecutionStatus {
  Running = 'Running',
  Scheduled = 'Scheduled'
}
type DelaySec = number;
export type Schedule = readonly [ExecutionAction, ExecutionHandler, ExecutionLogger, DelaySec?];

export function exec([action, handle, logger, delaySec]: Schedule): void {
  if (delaySec === undefined) {
    logger([action, ExecutionStatus.Running]);
    handle();
  } else {
    logger([action, ExecutionStatus.Scheduled]);
    setTimeout(handle, delaySec / 1000);
  }
}
