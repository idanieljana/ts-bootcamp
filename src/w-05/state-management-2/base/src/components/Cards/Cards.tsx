import React from 'react';
import FlipMove from 'react-flip-move';
import { Howl } from 'howler';
import cn from 'classnames';
import { Level } from '../../types/game';
import styles from './Cards.pcss';
import { Timer } from '../Timer/Timer';

const lodashShuffle = require('lodash.shuffle');
const cardFlipMusic = require('./assets/card-flip.wav');
const winResultMusic = require('./assets/win-result.wav');

const playFlipSound = (): void => {
  const sound = new Howl({
    src: [
      cardFlipMusic,
    ],
  });
  sound.play();
};

const playWinSound = (): void => {
  const sound = new Howl({
    src: [
      winResultMusic,
    ],
  });
  sound.play();
};

const levelClassnamesMap = {
  [Level.Easy]: styles.easy,
  [Level.Medium]: styles.medium,
  [Level.Hard]: styles.hard,
} as const;

interface BoardOptions {
  level: Level, matchNumber: number, symbols: string[];
}

function getBoardOptions(difficulty: Level): BoardOptions {
  switch (difficulty) {
    case Level.Hard:
      return {
        level: difficulty,
        matchNumber: 3,
        symbols: ['⍨', '✈', '☆', '♘', '⍨', '♫', '♠', '✈', '❄', '✈', '♘', '☆', '❄', '☯', '☯', '♫', '♠', '⍨', '☯', '☆', '❄', '♘', '♫', '♠'],
      };
    case Level.Medium:
      return {
        level: difficulty,
        matchNumber: 2,
        symbols: ['❄', '⍨', '♘', '✈', '☯', '♠', '☆', '❄', '♫', '♫', '☯', '☆', '✈', '⍨', '♠', '♘'],
      };
    case Level.Easy:
    default: {
      return {
        level: difficulty,
        matchNumber: 2,
        symbols: ['✈', '♘', '✈', '♫', '♫', '☆', '♘', '☆'],
      };
    }
  }
}

function prepareCardsForNewGame(symbols: string[]): CardValue[] {
  return lodashShuffle(symbols.map(
    (symbol: string, idx: number) => ({
      type: symbol,
      isFlipped: false,
      key: idx,
    }),
  ));
}

interface CardValue {
  type: string,
  isFlipped: boolean,
  key: number,
}

export interface CardsProps {
  level: Level;
}

type ClickedCard = Record<number, string>;

interface CardsState {
  secondsElapsed: number;
  level: Level;
  matchNumber: number;
  cards: CardValue[];
  matches: ClickedCard[];
  queue: ClickedCard[];
}

export class Cards extends React.Component<CardsProps, CardsState> {
  private timeIntervalId: number | undefined;

  private shuffleIntervalId: number | undefined;

  private restartGameTimeoutId: number | undefined;

  private flipTimeoutId: number | undefined;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    secondsElapsed: 0,
    level: Level.Easy,
    matchNumber: -1,
    cards: [],
    matches: [],
    queue: [],
  };

  componentDidMount(): void {
    // eslint-disable-next-line react/destructuring-assignment
    this.formatBoard(this.props.level);
  }

  componentDidUpdate(prevProps: Readonly<CardsProps>): void {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.level !== prevProps.level) {
      // eslint-disable-next-line react/destructuring-assignment
      this.formatBoard(this.props.level);
    }
  }

  componentWillUnmount(): void {
    window.clearTimeout(this.flipTimeoutId);
    window.clearTimeout(this.restartGameTimeoutId);
    window.clearInterval(this.shuffleIntervalId);
    window.clearInterval(this.timeIntervalId);
  }

  private tick = (): void => {
    this.setState((state: CardsState) => ({
      secondsElapsed: state.secondsElapsed + 1,
    }));
  };

  private flipLater = (ids: string[]): void => {
    this.setState((prevState) => {
      const cards = [...prevState.cards].map((card) => {
        const changedCard = { ...card };
        ids.forEach((id) => {
          if (card.key.toString() === id) {
            changedCard.isFlipped = false;
          }
        });
        return changedCard;
      });
      return {
        cards,
      };
    });
  };

  private shuffle = (): void => {
    this.setState((state: CardsState) => ({
      cards: lodashShuffle(state.cards),
    }));
  };

  private restartGame = (): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.formatBoard(this.props.level);
  };

  private clickEvent = (id: number, type: string): void => {
    playFlipSound();
    const clickedCard: ClickedCard = { [id]: type };
    const {
      queue,
      matchNumber,
      matches,
      cards,
      queue: {
        length: queueLength,
      },
    } = this.state;
    this.flipClickedCard(id);

    if (queueLength === 0) {
      this.addClickedCardToQueue(clickedCard);
    }

    if (queueLength > 0) {
      // Compare current symbol with last symbol in queue
      if (Object.values(queue[queueLength - 1])[0] === type) {
        if (queueLength < matchNumber - 1) {
          this.addClickedCardToQueue(clickedCard);
        } else if (queueLength === matchNumber - 1) { // Check if winning selection
          if (matches.length === cards.length - matchNumber) {
            playWinSound();
            clearInterval(this.timeIntervalId);
            this.restartGameTimeoutId = window.setTimeout(() => {
              this.restartGame();
            }, 2000);
          } else {
            this.setState((state) => ({
              matches: [...state.matches, ...state.queue, clickedCard],
              queue: [],
            }));
          }
        }
      } else {
        const cardsToFlip = [...queue, clickedCard].map((card) => Object.keys(card)[0]);
        this.setState({ queue: [] });
        this.flipTimeoutId = window.setTimeout(() => {
          this.flipLater(cardsToFlip);
        }, 1000);
      }
    }
  };

  private addClickedCardToQueue = (obj: ClickedCard): void => {
    this.setState((state: CardsState) => ({
      queue: [...state.queue, obj],
    }));
  };

  private flipClickedCard = (id: number): void => {
    this.setState((state: CardsState) => {
      const cards: CardValue[] = state.cards.map((card) => {
        if ((card.key === id)) {
          return {
            ...card,
            isFlipped: true,
          };
        }
        return card;
      });
      return {
        cards,
      };
    });
  };

  private formatBoard = (difficulty: Level): void => {
    const { symbols, level, matchNumber } = getBoardOptions(difficulty);
    this.setState({
      level,
      matchNumber,
      cards: prepareCardsForNewGame(symbols),
      secondsElapsed: 0,
      matches: [],
      queue: [],
    });
    clearInterval(this.timeIntervalId);
    clearInterval(this.shuffleIntervalId);
    this.timeIntervalId = window.setInterval(() => this.tick(), 1000);
    this.shuffleIntervalId = window.setInterval(() => this.shuffle(), 15000);
  };

  private renderCards(cards: CardValue[], level: Level) {
    return (
      <FlipMove
        typeName="ul"
        className={cn(levelClassnamesMap[level], styles.list)}
      >
        {cards.map((card: CardValue) => (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            key={card.key}
            onClick={() => this.clickEvent(card.key, card.type)}
            className={cn(styles.card, card.isFlipped ? styles.flipped : '')}
          >
            <div>
              <span className={cn(styles.figure, styles.front)} />
              <span className={cn(styles.figure, styles.back)}> {card.type} </span>
            </div>
          </li>
        ))}
      </FlipMove>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { cards, level, secondsElapsed } = this.state;
    return (
      <div className={styles.container}>
        <Timer time={secondsElapsed} />
        {this.renderCards(cards, level)}
      </div>
    );
  }
}
