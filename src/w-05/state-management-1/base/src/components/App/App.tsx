import React from 'react';
import styles from './App.pcss';
import './assets/css/reset.min.css';
import { GameOffer } from '../GameOffer/GameOffer';
import { PlayingCards } from '../PlayingCards/PlayingCards';
import { Levels } from '../Levels/Levels';
import { Level } from '../../types/game';

export const App: React.FC = () => (
  <div className={styles.appContainer}>
    <div className={styles.hr} />
    <div className={styles.app}>
      <GameOffer isGameOffered name="My Name" Levels={<Levels startGame={() => {}} levels={[Level.Easy, Level.Medium, Level.Hard]} />} />
      <PlayingCards isPlaying={false} />
    </div>
    <div className={styles.hr} />
  </div>
);
export default App;
