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
  position: 'flipped' | null,
  key: number,
}

interface CardsProps {
  level: Level;
}
interface CardsState {
  secondsElapsed: number;
  level: Level, // 'easy'
  matchNumber: number;
  cards: CardValue[];
  matches: any[],
  queue: any[],
}

export class Cards extends React.Component<CardsProps, CardsState> {
  private timeInterval: number | undefined;

  private shuffleInterval: number | undefined;

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
            changedCard.position = null;
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
    clearInterval(this.timeInterval);
    clearInterval(this.shuffleInterval);
    this.setState({
      cards: [],
      matches: [],
      queue: [],
    });
    this.formatBoard(Level.Easy);
  };

  clickEvent = (id: number, type: string): void => {
    const sound = new Howl({
      src: [
        cardFlipMusic,
      ],
    });
    sound.play();
    const obj: Record<number, string> = {};
    obj[id] = type;
    const {
      queue,
      matchNumber,
      matches,
      cards,
      queue: {
        length: queueLength,
      },
    } = this.state;
    this.setState((state: CardsState) => ({
      cards: state.cards.map((card) => {
        if ((card.key === id)) {
          return {
            ...card,
            position: 'flipped',
          };
        }
        return card;
      }),
    }));

    if (queueLength === 0) {
      this.setState((state: CardsState) => ({
        queue: [...state.queue, obj],
      }));
    }

    if (queueLength > 0) {
      // Compare current symbol with last symbol in queue
      if (Object.values(queue[queueLength - 1])[0] === type) {
        if (queueLength < matchNumber - 1) {
          this.setState((state: CardsState) => ({
            queue: [...state.queue, obj],
          }));
        } else if (queueLength === matchNumber - 1) { // Check if winning selection
          if (matches.length === cards.length - matchNumber) {
            clearInterval(this.timeInterval);
            setTimeout(() => {
              this.restartGame();
            }, 2000);
          } else {
            this.setState((state) => ({
              matches: [...state.matches, ...state.queue, obj],
              queue: [],
            }));
          }
        }
      } else {
        const cardsToFlip = [...queue, obj].map((card) => Object.keys(card)[0]);
        this.setState({ queue: [] });
        window.setTimeout(() => {
          this.flipLater(cardsToFlip);
        }, 1000);
      }
    }
  };

  formatBoard = (difficulty: Level): void => {
    const { symbols, level, matchNumber } = getBoardOptions(difficulty);
    const cards = symbols.map((symbol: string, idx: number) => ({
      type: symbol,
      position: null,
      key: idx,
    }));
    this.setState({
      level,
      matchNumber,
      cards,
      secondsElapsed: 0,
    });
    this.timeInterval = window.setInterval(() => this.tick(), 1000);
    this.shuffleInterval = window.setInterval(() => this.shuffle(), 15000 * 10000);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { cards, level } = this.state;
    return (
      <div className={styles.container}>
        <ProgressBar />
        <div className={styles.cardsContainer}>
          <FlipMove
            typeName="ul"
            className={`${levelClassnamesMap[level]} ${styles.list}`}
          >
            {
              cards.map((card: CardValue) => (
                <Card
                  key={card.key}
                  type={card.type}
                  onClick={() => this.clickEvent(card.key, card.type)}
                  className={`${styles.card} ${card.position ? styles[card.position] : ''}`}
                >
                  <div>
                    <span className={cn(styles.figure, styles.front)} />
                    <span className={cn(styles.figure, styles.back)}> {card.type} </span>
                  </div>
                </Card>
              ))
            }
          </FlipMove>
        </div>
      </div>
    );
  }
}
