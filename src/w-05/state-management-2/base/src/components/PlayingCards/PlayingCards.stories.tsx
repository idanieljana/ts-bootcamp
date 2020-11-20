import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react/types-6-0';

import { PlayingCards, PlayingCardsProps } from './PlayingCards';

export default {
  title: 'MemoryCards/PlayingCards',
  component: PlayingCards,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<PlayingCardsProps> = ({ isPlaying }) => {
  const wrapperStyle = {
    background: '#000333', width: '100%', height: '100vh',
  };
  return (
    <div style={wrapperStyle}>
      <PlayingCards isPlaying={isPlaying} />
    </div>
  );
};

export const PlayingCardsDefault = Template.bind({});
PlayingCardsDefault.args = {
  isPlaying: true,
};
