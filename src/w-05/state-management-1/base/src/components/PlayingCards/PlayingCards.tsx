import React from 'react';

import styles from './PlayingCards.pcss';

export interface PlayingCardsProps {
  isPlaying: boolean;
}

export const PlayingCards: React.FC<PlayingCardsProps> = ({ isPlaying }) => {
  if (!isPlaying) {
    return null;
  }
  return (
    <div className={styles.playingCards} data-role="playing-cards">
      Playing cards
    </div>
  );
};
