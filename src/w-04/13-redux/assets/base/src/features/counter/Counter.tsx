import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import {AppDispatch, useAppDispatch} from "../../app/store";
import {addLog} from "../../app/state/logger/loggerActions";
import {getReportedLog} from "../../app/state/logger/loggerSelectors";

export function Counter() {
  const count = useSelector(selectCount);
  const reportedLog = useSelector(getReportedLog);
  const dispatch: AppDispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className={styles.row}>
        {JSON.stringify(reportedLog)}
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => {
            const amount = Number(incrementAmount) || 0;
            dispatch(incrementByAmount(amount));
            dispatch(addLog(`Amount updated to ${count}`))
          }}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
