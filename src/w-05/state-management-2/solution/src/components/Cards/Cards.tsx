import React from 'react';
import FlipMove from 'react-flip-move';
import cn from 'classnames';
import { Level } from '../../types/game';
import styles from './Cards.pcss';
import { Timer } from '../Timer/Timer';
import { Message } from '../Message/Message';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { PlayButton } from '../PlayButton/PlayButton';
import { BrainFlying } from '../Brain/BrainFlying';

const levelClassnamesMap = {
  [Level.Easy]: styles.easy,
  [Level.Medium]: styles.medium,
  [Level.Hard]: styles.hard,
} as const;

export interface CardValue {
  type: string,
  isFlipped: boolean,
  key: number,
}

export enum Status {
  Starting = 'Starting',
  Playing = 'Playing',
  Winning = 'Winning',
  Stopped = 'Stopped',
}

export interface CardsProps {
  flipsCount?: number;
  secondsElapsed?: number;
  level: Level;
  cards: CardValue[];
  status: Status
  onCardClick: (key: number, type: string) => void
  onRestart: () => void
}

export const Cards: React.FC<CardsProps> = (props) => {
  const {
    level, flipsCount, secondsElapsed, cards, status, onCardClick, onRestart,
  } = props;
  return (
    <div className={styles.container}>
      {status === Status.Playing && (
      <>
        <ProgressBar />
        {secondsElapsed !== undefined && <Timer time={secondsElapsed} />}
        <FlipMove
          typeName="ul"
          className={cn(levelClassnamesMap[level], styles.list)}
        >
          {cards.map((card: CardValue) => (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              key={card.key}
              onClick={() => onCardClick(card.key, card.type)}
              className={cn(styles.card, card.isFlipped ? styles.flipped : '')}
            >
              <div>
                <span className={cn(styles.figure, styles.front)} />
                <span className={cn(styles.figure, styles.back)}> {card.type} </span>
              </div>
            </li>
          ))}
        </FlipMove>
        {!!flipsCount && <Message text={`Flips: ${flipsCount}`} />}
      </>
      )}
      {status === Status.Winning && <Message text="You win!" />}
      {status === Status.Stopped && (
      <>
        <BrainFlying />
        <Message text="Play again?" />
        <div className={styles.newGameButtonContainer}>
          <PlayButton text="New game" onClick={() => onRestart()} />
        </div>
      </>
      )}
    </div>
  );
};
