import React from 'react';
import FlipMove from 'react-flip-move';
import { Howl } from 'howler';
import { levels } from './Levels';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import styles from './Game.pcss';

const lodashShuffle = require('lodash.shuffle');
const cardFlipMusic = require('./assets/card-flip.wav');

interface BoardOptions {
  level: Level, matchNumber: number, symbols: string[];
}

function getBoardOptions(difficulty: Level): BoardOptions {
  switch (difficulty) {
    case 'hard':
      return {
        level: 'hard',
        matchNumber: 2,
        symbols: levels[1].cards,
      };
    case 'crazy':
      return {
        level: 'crazy',
        matchNumber: 3,
        symbols: levels[2].cards,
      };
    case 'easy':
    default: {
      return {
        level: 'easy',
        matchNumber: 2,
        symbols: levels[0].cards,
      };
    }
  }
}

type Level = 'easy' | 'hard' | 'crazy';

interface CardValue {
  type: string,
  position: 'flipped' | null,
  key: number,
}

interface CardsProps {}
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
    level: 'easy' as Level,
    matchNumber: -1,
    cards: [],
    matches: [],
    queue: [],
  };

  componentDidMount(): void {
    this.formatBoard('easy');
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
    this.formatBoard('easy');
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
    this.shuffleInterval = window.setInterval(() => this.shuffle(), 15000);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { cards, level } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <ProgressBar className={styles['shuffle-15']} />
        <FlipMove
          typeName="ul"
          className={`${styles[level]} ${styles.list}`}
        >
          {
            cards.map((card: CardValue) => (
              <Card
                key={card.key}
                type={card.type}
                onClick={() => this.clickEvent(card.key, card.type)}
                className={card.position ? styles[card.position] : ''}
              >
                <div>
                  <figure className={styles.front} />
                  <figure className={styles.back}> {card.type} </figure>
                </div>
              </Card>
            ))
        }
        </FlipMove>
      </div>
    );
  }
}
