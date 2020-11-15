import React from 'react';
import styles from './App.pcss';
import './assets/css/reset.min.css';
import { GameOffer } from '../GameOffer/GameOffer';
import { PlayingCards } from '../PlayingCards/PlayingCards';

export const App: React.FC = () => (
  <div className={styles.appContainer}>
    <div className={styles.hr} />
    <div className={styles.app}>
      <GameOffer />
      <PlayingCards />
    </div>
    <div className={styles.hr} />
  </div>
);
export default App;
