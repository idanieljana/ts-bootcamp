import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { GameStoreContext } from '../../stores/GameStore';

import styles from './PlayingCards.pcss';

export const PlayingCards: React.FC = observer(() => {
  const gameStore = useContext(GameStoreContext);
  const { isPlaying } = gameStore;
  if (!isPlaying) {
    return null;
  }
  return (
    <div className={styles.playingCards} data-role="playing-cards">
      Playing cards
    </div>
  );
});
