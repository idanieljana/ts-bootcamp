/**
 * Write method to handle a function after a timeout
 */
export function timeout(handler: () => {}, delay: number) {
    return setTimeout(handler, delay);
}

/**
 * Write method to handle a function with interval.
 * It should return back a cancel function. In case it is called,
 * interval should be stopped.
 */
export function interval(handler: () => {}, interval: number) {
    const intervalId = setInterval(handler, interval);
    return () => {
        clearInterval(intervalId);
    }
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
    Play = "Play",
    // Pause = "Pause",
}
export enum ExecutionStatus {
    Running = "Running",
    Scheduled = "Scheduled",
}
type DelaySec = number;
export type Schedule = readonly [ExecutionAction, ExecutionHandler, ExecutionLogger, DelaySec?]


export function exec([action, handle, logger, delaySec]: Schedule) {
    if (delaySec === undefined) {
        logger([action, ExecutionStatus.Running])
        handle()
    } else {
        logger([action, ExecutionStatus.Scheduled])
        setTimeout(handle, delaySec / 1000)
    }
}