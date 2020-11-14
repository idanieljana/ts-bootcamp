import React from 'react';
import { Howl } from 'howler';
import styles from './App.pcss';
import { Brain } from '../Brain/Brain';
import './assets/css/reset.min.css';
import StartGameMusic from './assets/startGame.ogg';

export interface AppProps {
  name: string;
}

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

export const App: React.FC<AppProps> = ({ name }) => {
  const playHandler = () => playStartGameMusic();
  return (
    <div className={styles.appContainer}>
      <div className={styles.hr} />
      <div className={styles.app}>
        <h1 className={styles.name}>
          @{name}
        </h1>
        <h2 className={styles.year}>
          ©{(new Date()).getFullYear()}
        </h2>
        <div className={styles.levels} data-role="levels">
          <button type="button" className={styles.level} onClick={playHandler}>Easy</button>
          <button type="button"  className={styles.level} onClick={playHandler}>Medium</button>
          <button type="button"  className={styles.level} onClick={playHandler}>Hard</button>
        </div>
        <Brain />
      </div>
      <div className={styles.hr} />
    </div>
  );
};
export default App;
