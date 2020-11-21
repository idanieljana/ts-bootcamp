import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';

import { Cards, CardsProps } from './Cards';
import { Level } from '../../types/game';

export default {
  title: 'MemoryCards/Cards',
  component: Cards,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<CardsProps> = ({ level }) => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh', fontSize: '4em',
  };
  return (
    <div style={wrapperStyle}>
      <Cards level={level} />
    </div>
  );
};

export const CardsDefault = Template.bind({});
CardsDefault.args = {
  level: Level.Easy,
};
