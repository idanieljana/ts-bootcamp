import React, { useContext } from 'react';
import { Howl } from 'howler';
import { observer } from 'mobx-react-lite';
import styles from './Levels.pcss';
import StartGameMusic from '../../assets/startGame.ogg';
import { GameStoreContext } from '../../stores/GameStore';
import { Level } from '../../types/game';

function createStartGameHandler() {
  let playingSound: Howl | undefined;
  function playMusic() {
    if (playingSound) {
      playingSound.stop();
    }
    const sound = new Howl({
      src: [
        StartGameMusic,
      ],
      volume: 0.2,
    });
    sound.play();
    playingSound = sound;
  }
  return playMusic;
}

const playStartGameMusic = createStartGameHandler();

export interface LevelsProps {
  levels: ReadonlyArray<Level>;
  startGame: (level: Level) => void;
}

export const Levels: React.FC<LevelsProps> = ({ levels, startGame }) => {
  const playHandler = (level: Level) => () => {
    playStartGameMusic();
    startGame(level);
  };
  return (
    <div className={styles.levels} data-role="levels">
      {levels.map((level) => (
        <button key={level} type="button" className={styles.level} onClick={playHandler(level)}>{level}</button>
      ))}
    </div>
  );
};

export const LevelsView = observer(() => {
  const { levels, startGame } = useContext(GameStoreContext);
  return <Levels levels={levels} startGame={startGame} />;
});
