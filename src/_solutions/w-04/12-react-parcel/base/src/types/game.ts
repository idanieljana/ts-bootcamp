export enum Level {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum GameStage {
  Offered = 'Offered',
  Playing = 'Playing',
  Finished = 'Finished',
}

export interface Card {
  title: string;
  value: boolean;
  isFlipped: boolean;
}
