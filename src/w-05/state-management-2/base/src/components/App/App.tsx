import React from 'react';
import styles from './App.pcss';
import './assets/css/reset.min.css';
import { GameOfferView } from '../GameOffer/GameOffer';
import { PlayingCardsView } from '../PlayingCards/PlayingCards';

export const App: React.FC = () => (
  <div className={styles.appContainer}>
    <div className={styles.hr} />
    <div className={styles.app}>
      <GameOfferView />
      <PlayingCardsView />
    </div>
    <div className={styles.hr} />
  </div>
);
export default App;
