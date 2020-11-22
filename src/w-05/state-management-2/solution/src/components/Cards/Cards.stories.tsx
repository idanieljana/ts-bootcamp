import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';

import { Cards, CardsProps, Status } from './Cards';
import { Level } from '../../types/game';

export default {
  title: 'MemoryCards/Cards',
  component: Cards,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const CardsTemplate: Story<CardsProps> = (args) => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh', fontSize: '4em',
  };
  return (
    <div style={wrapperStyle}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Cards {...args} />
    </div>
  );
};

enum FlippedCards {
  Yes,
  No,
}

function createDefaultProps(flipped = FlippedCards.No) {
  return {
    level: Level.Easy,
    cards: ['✈', '♘', '✈', '♫', '♫', '☆', '♘', '☆'].map((symbol, idx) => ({
      type: symbol,
      isFlipped: flipped === FlippedCards.Yes,
      key: idx,
    })),
    flipsCount: 220,
    secondsElapsed: 181,
    status: Status.Playing,
  };
}

export const CardsPlaying = CardsTemplate.bind({});
CardsPlaying.args = {
  ...createDefaultProps(),
  flipsCount: undefined,
  secondsElapsed: 0,
};

export const CardsFlippedPlaying = CardsTemplate.bind({});
CardsFlippedPlaying.args = {
  ...createDefaultProps(FlippedCards.Yes),
};

export const CardsWinning = CardsTemplate.bind({});
CardsWinning.args = {
  ...createDefaultProps(FlippedCards.Yes),
  status: Status.Winning,
};

export const CardsStopped = CardsTemplate.bind({});
CardsStopped.args = {
  ...createDefaultProps(FlippedCards.Yes),
  status: Status.Stopped,
};
