import { createContext } from 'react';

export class GameStore {}

export const gameStore = new GameStore();
export const GameStoreContext = createContext(gameStore);
