import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';

import { PlayingCards, PlayingCardsProps } from './PlayingCards';
import { Level } from '../../types/game';

export default {
  title: 'MemoryCards/PlayingCards',
  component: PlayingCards,
  argTypes: {
    level: {
      control: {
        type: 'select',
        options: [Level.Easy, Level.Medium, Level.Hard],
      },
    },
  },
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<PlayingCardsProps> = (args) => {
  const wrapperStyle = {
    background: '#000333', width: '100%', height: '100vh',
  };
  return (
      <div style={wrapperStyle}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <PlayingCards {...args} />
      </div>
  );
};

export const PlayingCardsDefault = Template.bind({});
PlayingCardsDefault.args = {
  isPlaying: true,
  level: Level.Easy,
};
