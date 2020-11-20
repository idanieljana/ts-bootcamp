import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react/types-6-0';

import { GameOffer, GameOfferProps } from './GameOffer';
import { Levels } from '../Levels/Levels';
import { Level } from '../../types/game';

export default {
  title: 'MemoryCards/GameOffer',
  component: GameOffer,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<GameOfferProps> = (args) => {
  const wrapperStyle = {
    background: '#000333', width: '100%', height: '100vh',
  };
  return (
    <div style={wrapperStyle}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading,max-len */}
      <GameOffer {...args} Levels={<Levels startGame={() => {}} levels={[Level.Easy, Level.Medium, Level.Hard]} />} />
    </div>
  );
};

export const GameOfferDefault = Template.bind({});
GameOfferDefault.args = {
  name: 'Name',
  isGameOffered: true,
};
