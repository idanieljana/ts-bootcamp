import React from 'react';
import { Provider } from 'react-redux';
import styles from './App.pcss';
import './assets/css/reset.min.css';
import { GameOfferView } from '../GameOffer/GameOffer';
import { PlayingCardsView } from '../PlayingCards/PlayingCards';
import { store } from '../../stores/redux/store';

export const App: React.FC = () => (
  <Provider store={store}>
    <div className={styles.appContainer}>
      <div className={styles.hr} />
      <div className={styles.app}>
        <GameOfferView />
        <PlayingCardsView />
      </div>
      <div className={styles.hr} />
    </div>
  </Provider>
);
export default App;
