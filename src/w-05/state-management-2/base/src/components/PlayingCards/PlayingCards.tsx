import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';
import styles from './PlayingCards.pcss';
import { GameStoreContext } from '../../stores/GameStore';
import {Cards} from "../Cards/Cards";

export interface PlayingCardsProps {
  isPlaying: boolean;
}

export const PlayingCards: React.FC<PlayingCardsProps> = ({ isPlaying }) => {
  if (!isPlaying) {
    return null;
  }
  return (
    <div className={styles.playingCards} data-role="playing-cards">
      <Cards></Cards>
    </div>
  );
};

export const PlayingCardsView = observer(() => {
  const gameStore = useContext(GameStoreContext);
  const { isPlaying } = gameStore;
  return <PlayingCards isPlaying={isPlaying} />;
});
