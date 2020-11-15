import {
  action, computed, makeObservable, observable,
} from 'mobx';
import { createContext } from 'react';
import { Card, GameStage, Level } from '../types/game';

export class GameStore {
  name = 'Memorix';

  levels: ReadonlyArray<Level>= [Level.Easy, Level.Medium, Level.Hard];

  @observable roundSecondsElapsed = 0;

  @observable cards: Card[] = [];

  @observable selectedLevel: Level | null = null;

  @observable gameStage: GameStage = GameStage.Offered;

  constructor() {
    makeObservable(this);
  }

  @computed get isGameStarted(): boolean {
    return this.gameStage === GameStage.Offered;
  }
  @computed get isPlaying(): boolean {
    return this.gameStage === GameStage.Playing;
  }

  @action startGame = (level: Level): void => {
    console.log('startGame');
    this.selectedLevel = level;
    this.gameStage = GameStage.Playing;
  };
}

const store = new GameStore();
export const GameStoreContext = createContext(store);
