import { GameStore } from './GameStore';
import { GameStage, Level } from '../types/game';

describe('GameStore', () => {
  test('should have game offer stage by default', () => {
    const gameStore = new GameStore();
    expect(gameStore.gameStage).toBe(GameStage.Offered);
  });
  test('should change stage to playing and select easy level when game is started', () => {
    const gameStore = new GameStore();
    gameStore.startGame(Level.Easy);
    expect(gameStore.gameStage).toBe(GameStage.Playing);
    expect(gameStore.selectedLevel).toBe(Level.Easy);
  });
  test('should change stage to playing', () => {
    const gameStore = new GameStore();
    gameStore.gameStage = GameStage.Playing;
    expect(gameStore.isPlaying).toBeTruthy();
    expect(gameStore.isGameOffered).toBeFalsy();
  });
});
