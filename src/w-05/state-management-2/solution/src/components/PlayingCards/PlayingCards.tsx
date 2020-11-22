import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';
import { useSelector } from 'react-redux';
import styles from './PlayingCards.pcss';
import { GameStoreContext } from '../../stores/GameStore';
import { CardsContainer } from '../Cards/CardsContainer';
import { Level } from '../../types/game';

import { RootState, useAppDispatch } from '../../stores/redux/store';
import { getLastLog, getLogs, getLogsCount } from '../../stores/redux/logger/loggerSelectors';
import { addLog, clearLogs } from '../../stores/redux/logger/loggerActions';
import { LogType } from '../../stores/redux/logger/loggerTypes';

export interface PlayingCardsProps {
  isPlaying: boolean;
  flipsCount: number;
  level: Level | null;
  onCardClick: (id: number, type: string) => void;
  onRestart: () => void;
}

export const PlayingCards: React.FC<PlayingCardsProps> = (props) => {
  const {
    level, isPlaying, flipsCount, onCardClick, onRestart,
  } = props;
  if (!isPlaying || level === null) {
    return null;
  }
  return (
    <div className={styles.playingCards} data-role="playing-cards">
      <CardsContainer
        level={level}
        flipsCount={flipsCount}
        onCardClick={onCardClick}
        onRestart={onRestart}
      />
    </div>
  );
};

export const PlayingCardsView = observer(() => {
  const gameStore = useContext(GameStoreContext);
  const { isPlaying, selectedLevel } = gameStore;
  const { logsCount, lastLog, logs } = useSelector(
    (state: RootState) => ({
      lastLog: getLastLog(state),
      logsCount: getLogsCount(state),
      logs: getLogs(state),
    }),
  );
  const dispatch = useAppDispatch();
  const addCardLog = (id: number, type: string) => {
    /**
     * Sending stats, e.g. to console
     */
    // eslint-disable-next-line no-console
    console.log(logsCount, lastLog, logs);
    dispatch(addLog(`Card added: [${id}-${type}]`, LogType.Card));
  };
  const clear = () => {
    dispatch(clearLogs());
  };
  return (
    <PlayingCards
      onCardClick={addCardLog}
      onRestart={clear}
      level={selectedLevel}
      isPlaying={isPlaying}
      flipsCount={logsCount}
    />
  );
});
