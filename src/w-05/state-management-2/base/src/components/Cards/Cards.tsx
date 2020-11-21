import React from 'react';
import FlipMove from 'react-flip-move';
import { Howl } from 'howler';
import cn from 'classnames';
import { levels } from './utils';
import { Card } from './Card';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Level } from '../../types/game';
import styles from './Cards.pcss';

const lodashShuffle = require('lodash.shuffle');
const cardFlipMusic = require('./assets/card-flip.wav');

const playFlipSound = (): void => {
  const sound = new Howl({
    src: [
      cardFlipMusic,
    ],
  });
  sound.play();
};

const levelClassnamesMap = {
  [Level.Easy]: styles.easy,
  [Level.Medium]: styles.hard,
  [Level.Hard]: styles.crazy,
} as const;

interface BoardOptions {
  level: Level, matchNumber: number, symbols: string[];
}

function getBoardOptions(difficulty: Level): BoardOptions {
  const [easy, medium, hard] = levels;
  switch (difficulty) {
    case Level.Medium:
      return {
        level: difficulty,
        matchNumber: 2,
        symbols: medium.cards,
      };
    case Level.Hard:
      return {
        level: difficulty,
        matchNumber: 3,
        symbols: hard.cards,
      };
    case Level.Easy:
    default: {
      return {
        level: difficulty,
        matchNumber: 2,
        symbols: easy.cards,
      };
    }
  }
}

interface CardValue {
  type: string,
  isFlipped: boolean,
  key: number,
}

interface CardsProps {
  level: Level;
}

type ClickedCard = Record<number, string>;

interface CardsState {
  secondsElapsed: number;
  level: Level, // 'easy'
  matchNumber: number;
  cards: CardValue[];
  matches: ClickedCard[],
  queue: ClickedCard[],
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

  tick = (): void => {
    this.setState((state: CardsState) => ({
      secondsElapsed: state.secondsElapsed + 1,
    }));
  };

  flipLater = (ids: string[]): void => {
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

  shuffle = (): void => {
    this.setState((state: CardsState) => ({
      cards: lodashShuffle(state.cards),
    }));
  };

  restartGame = (): void => {
    // eslint-disable-next-line react/destructuring-assignment
    this.formatBoard(this.props.level);
  };

  clickEvent = (id: number, type: string): void => {
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

  addClickedCardToQueue = (obj: ClickedCard): void => {
    this.setState((state: CardsState) => ({
      queue: [...state.queue, obj],
    }));
  };

  flipClickedCard = (id: number): void => {
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

  formatBoard = (difficulty: Level): void => {
    const { symbols, level, matchNumber } = getBoardOptions(difficulty);
    this.setState({
      level,
      matchNumber,
      cards: this.prepareCardsForNewGame(symbols),
      secondsElapsed: 0,
      matches: [],
      queue: [],
    });
    clearInterval(this.timeIntervalId);
    clearInterval(this.shuffleIntervalId);
    this.timeIntervalId = window.setInterval(() => this.tick(), 1000);
    this.shuffleIntervalId = window.setInterval(() => this.shuffle(), 15000);
  };

  prepareCardsForNewGame = (symbols: string[]): CardValue[] => symbols.map(
    (symbol: string, idx: number) => ({
      type: symbol,
      isFlipped: false,
      key: idx,
    }),
  );

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { cards, level } = this.state;
    return (
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.cardsContainer}>
          <FlipMove
            typeName="ul"
            className={cn(levelClassnamesMap[level], styles.list)}
          >
            {cards.map((card: CardValue) => (
              <Card
                key={card.key}
                type={card.type}
                isFlipped={card.isFlipped}
                onClick={() => this.clickEvent(card.key, card.type)}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    );
  }
}
