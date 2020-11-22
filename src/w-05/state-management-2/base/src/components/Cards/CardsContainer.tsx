import React from 'react';
import { Howl } from 'howler';
import { Level } from '../../types/game';
import StartGameMusic from '../../assets/startGame.ogg';
import CardFlipMusic from './assets/card-flip.wav';
import WinResultMusic from './assets/win-result.wav';
import { Cards, CardValue, Status } from './Cards';

const lodashShuffle = require('lodash.shuffle');

function createStartGameHandler() {
  let playingSound: Howl | undefined;
  function playMusic() {
    if (playingSound) {
      playingSound.stop();
    }
    const sound = new Howl({
      src: [
        StartGameMusic,
      ],
      volume: 0.2,
    });
    sound.play();
    playingSound = sound;
  }
  return playMusic;
}
const playStartGameMusic = createStartGameHandler();

const playFlipSound = (): void => {
  const sound = new Howl({
    src: [
      CardFlipMusic,
    ],
  });
  sound.play();
};

const playWinSound = (): void => {
  const sound = new Howl({
    src: [
      WinResultMusic,
    ],
  });
  sound.play();
};

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

type ClickedCard = Record<number, string>;

interface CardsContainerState {
  secondsElapsed: number;
  level: Level;
  matchNumber: number;
  cards: CardValue[];
  matches: ClickedCard[];
  queue: ClickedCard[];
  status: Status
}

export interface CardsContainerProps {
  level: Level;
  flipsCount?: number;
  onCardClick?: (id: number, type: string) => void
  onRestart?: () => void
}

export class CardsContainer extends React.Component<CardsContainerProps, CardsContainerState> {
  private timeIntervalId: number | undefined;

  private shuffleIntervalId: number | undefined;

  private stopedGameTimeoutId: number | undefined;

  private flipTimeoutId: number | undefined;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    secondsElapsed: 0,
    level: Level.Easy,
    matchNumber: -1,
    cards: [],
    matches: [],
    queue: [],
    status: Status.Starting,
  };

  componentDidMount(): void {
    // eslint-disable-next-line react/destructuring-assignment
    this.formatBoard(this.props.level);
  }

  componentDidUpdate(prevProps: Readonly<CardsContainerProps>): void {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.level !== prevProps.level) {
      // eslint-disable-next-line react/destructuring-assignment
      this.formatBoard(this.props.level);
    }
  }

  componentWillUnmount(): void {
    window.clearTimeout(this.flipTimeoutId);
    window.clearTimeout(this.stopedGameTimeoutId);
    window.clearInterval(this.shuffleIntervalId);
    window.clearInterval(this.timeIntervalId);
  }

  private tick = (): void => {
    this.setState((state: CardsContainerState) => ({
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
    this.setState((state: CardsContainerState) => ({
      cards: lodashShuffle(state.cards),
    }));
  };

  private restartGame = (): void => {
    const { onRestart } = this.props;
    onRestart?.();
    // eslint-disable-next-line react/destructuring-assignment
    this.formatBoard(this.props.level);
  };

  private win = (): void => {
    clearInterval(this.timeIntervalId);
    window.setTimeout(() => {
      playWinSound();
      this.setState({
        status: Status.Winning,
      });
    }, 1000);
    this.stopedGameTimeoutId = window.setTimeout(() => {
      this.setState({
        status: Status.Stopped,
      });
    }, 3000);
  };

  private clickEvent = (id: number, type: string): void => {
    const { onCardClick } = this.props;
    onCardClick?.(id, type);
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
            this.win();
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
    this.setState((state: CardsContainerState) => ({
      queue: [...state.queue, obj],
    }));
  };

  private flipClickedCard = (id: number): void => {
    this.setState((state: CardsContainerState) => {
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
      status: Status.Playing,
    });
    clearInterval(this.timeIntervalId);
    clearInterval(this.shuffleIntervalId);
    this.timeIntervalId = window.setInterval(() => this.tick(), 1000);
    this.shuffleIntervalId = window.setInterval(() => this.shuffle(), 15000);
    playStartGameMusic();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const {
      cards, level, secondsElapsed, status,
    } = this.state;
    const { flipsCount } = this.props;
    return (
      <Cards
        level={level}
        cards={cards}
        status={status}
        flipsCount={flipsCount}
        secondsElapsed={secondsElapsed}
        onCardClick={this.clickEvent}
        onRestart={this.restartGame}
      />
    );
  }
}
