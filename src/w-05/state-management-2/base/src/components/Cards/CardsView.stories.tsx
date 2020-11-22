import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';

import { CardsView, CardsViewProps } from './CardsView';
import { Level } from '../../types/game';

export default {
  title: 'MemoryCards/CardsView',
  component: CardsView,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const CardsViewTemplate: Story<CardsViewProps> = ({ level, flipsCount }) => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh', fontSize: '4em',
  };
  return (
    <div style={wrapperStyle}>
      <CardsView level={level} flipsCount={flipsCount} />
    </div>
  );
};

export const CardsViewDefault = CardsViewTemplate.bind({});
CardsViewDefault.args = {
  level: Level.Easy,
};
