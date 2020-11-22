import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';
import styles from './PlayingCards.pcss';
import { GameStoreContext } from '../../stores/GameStore';
import { CardsContainer } from '../Cards/CardsContainer';
import { Level } from '../../types/game';

export interface PlayingCardsProps {
  isPlaying: boolean;
  level: Level | null;
}

export const PlayingCards: React.FC<PlayingCardsProps> = ({ level, isPlaying }) => {
  if (!isPlaying || level === null) {
    return null;
  }
  return (
    <div className={styles.playingCards} data-role="playing-cards">
      <CardsContainer level={level} />
    </div>
  );
};

export const PlayingCardsView = observer(() => {
  const gameStore = useContext(GameStoreContext);
  const { isPlaying, selectedLevel } = gameStore;
  return <PlayingCards level={selectedLevel} isPlaying={isPlaying} />;
});
