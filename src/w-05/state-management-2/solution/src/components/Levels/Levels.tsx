import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Levels.pcss';
import { GameStoreContext } from '../../stores/GameStore';
import { Level } from '../../types/game';
import { PlayButton } from '../PlayButton/PlayButton';

export interface LevelsProps {
  levels: ReadonlyArray<Level>;
  startGame: (level: Level) => void;
}

export const Levels: React.FC<LevelsProps> = ({ levels, startGame }) => {
  return (
    <div className={styles.levels} data-role="levels">
      {levels.map((level) => (
        <PlayButton key={level} onClick={() => startGame(level)} text={level} />
      ))}
    </div>
  );
};

export const LevelsView = observer(() => {
  const { levels, startGame } = useContext(GameStoreContext);
  return <Levels levels={levels} startGame={startGame} />;
});
