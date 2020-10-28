import React from 'react';
import { Howl } from 'howler';
import styles from './App.pcss';
import Logo from '../Logo/Logo';
import StartGameMusic from './assets/startGame.ogg';

interface AppProps {
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

const App: React.FC<AppProps> = ({ name }) => (
  <div className={styles.app}>
    <hr className={styles.hrTop} />
    <h1 className={styles.name}>
      @{name}
    </h1>
    <h2 className={styles.year}>
      ©{(new Date()).getFullYear()}
    </h2>
    <div className={styles.levels}>
      <span className={styles.level} onClick={() => playStartGameMusic()}>Easy</span>
      <span className={styles.level} onClick={() => playStartGameMusic()}>Medium</span>
      <span className={styles.level} onClick={() => playStartGameMusic()}>Hard</span>
    </div>
    <Logo />
    <hr className={styles.hrBottom} />
  </div>
);

export default App;
