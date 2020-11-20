import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import {Meta, Story} from '@storybook/react/types-6-0';

import {PlayingCards, PlayingCardsProps} from './PlayingCards';
import {Level} from "../../types/game";

export default {
  title: 'MemoryCards/PlayingCards',
  component: PlayingCards,
  argTypes: {
    selectedLevel: {
      control: {
        type: 'select',
        options: [Level.Medium, Level.Hard],
      },
    },
  },
} as Meta;

interface TemplateArgs extends PlayingCardsProps {
  selectedLevel: PlayingCardsProps['level'];
}

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<TemplateArgs> = ({ isPlaying, selectedLevel, level }) => {
  const wrapperStyle = {
    background: '#000333', width: '100%', height: '100vh',
  };
  const passedLevel = selectedLevel || level;
  console.log(passedLevel);
  return (
    <div style={wrapperStyle}>
      <PlayingCards isPlaying={isPlaying} level={passedLevel} />
    </div>
  );
};

export const PlayingCardsDefault = Template.bind({});
PlayingCardsDefault.args = {
  isPlaying: true,
  level: Level.Easy,
};
