/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Write a method to call function after a delay,
 * Method should return "abort callback".
 * In case abort is called, function should not be called.
 * Delay should be passed in seconds.
 */
export function delay(handler: () => {}, delaySec: number): () => void {
  return () => {};
}

/**
 * Write a method to call function with interval.
 * Method should return "abort callback".
 * In case abort is called, function should not be called.
 * Delay should be passed in seconds.
 */
export function period(handler: () => {}, intervalSec: number): () => void {
  return () => {};
}
