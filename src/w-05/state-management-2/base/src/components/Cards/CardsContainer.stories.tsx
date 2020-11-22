import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';

import { CardsContainer, CardsContainerProps } from './CardsContainer';
import { Level } from '../../types/game';

export default {
  title: 'MemoryCards/CardsContainer',
  component: CardsContainer,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const CardsContainerTemplate: Story<CardsContainerProps> = ({ level, flipsCount }) => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh', fontSize: '4em',
  };
  return (
    <div style={wrapperStyle}>
      <CardsContainer level={level} flipsCount={flipsCount} />
    </div>
  );
};

export const CardsContainerDefault = CardsContainerTemplate.bind({});
CardsContainerDefault.args = {
  level: Level.Easy,
};
