import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { GameStoreContext } from '../../stores/GameStore';
import { Brain } from '../Brain/Brain';
import { Levels } from '../Levels/Levels';
import styles from './GameOffer.pcss';

export const GameOffer: React.FC = observer(() => {
  const gameStore = useContext(GameStoreContext);
  const { name, isGameStarted } = gameStore;
  if (!isGameStarted) {
    return null;
  }
  return (
    <div className={styles.gameOffer} data-role="game-offer">
      <h1 className={styles.name}>
        @{name}
      </h1>
      <h2 className={styles.year}>
        ©{(new Date()).getFullYear()}
      </h2>
      <Brain />
      <Levels />
    </div>
  );
});
