import React from 'react';
import styles from './App.pcss';
import './assets/css/reset.min.css';
import { GameOffer } from '../GameOffer/GameOffer';
import { PlayingCards } from '../PlayingCards/PlayingCards';
import { Levels } from '../Levels/Levels';

export const App: React.FC = () => (
  <div className={styles.appContainer}>
    <div className={styles.hr} />
    <div className={styles.app}>
      <GameOffer isGameOffered name="" Levels={<Levels startGame={() => {}} levels={[]} />} />
      <PlayingCards isPlaying={false} />
    </div>
    <div className={styles.hr} />
  </div>
);
export default App;
