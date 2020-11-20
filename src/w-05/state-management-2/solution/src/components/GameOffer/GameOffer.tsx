import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { GameStoreContext } from '../../stores/GameStore';
import { Brain } from '../Brain/Brain';
import { LevelsView } from '../Levels/Levels';
import styles from './GameOffer.pcss';

export interface GameOfferProps {
  name: string;
  isGameOffered: boolean;
  Levels?: React.ReactElement;
}

export const GameOffer: React.FC<GameOfferProps> = (props) => {
  const { name, isGameOffered, Levels } = props;
  if (!isGameOffered) {
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
      {Levels}
    </div>
  );
};

export const GameOfferView = observer(() => {
  const gameStore = useContext(GameStoreContext);
  const { name, isGameOffered } = gameStore;
  return <GameOffer Levels={<LevelsView />} isGameOffered={isGameOffered} name={name} />;
});
