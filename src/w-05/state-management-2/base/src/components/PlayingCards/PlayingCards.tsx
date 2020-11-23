import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './PlayingCards.pcss';
import { GameStoreContext } from '../../stores/GameStore';
import { CardsContainer } from '../Cards/CardsContainer';
import { Level } from '../../types/game';

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
  return (
    <PlayingCards
      onCardClick={() => {}}
      onRestart={() => {}}
      level={selectedLevel}
      isPlaying={isPlaying}
      flipsCount={0}
    />
  );
});
