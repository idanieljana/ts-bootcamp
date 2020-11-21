import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';

import { PlayButton, PlayButtonProps } from './PlayButton';

export default {
  title: 'MemoryCards/PlayButton',
  component: PlayButton,
  argTypes: { startGame: { action: 'clicked' } },
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<PlayButtonProps & { fontEm: number }> = (args) => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh', fontSize: `${args.fontEm}em`,
  };
  return (
    <div style={wrapperStyle}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <PlayButton {...args} />
    </div>
  );
};

export const PlayButtonDefault = Template.bind({});
PlayButtonDefault.args = {
  fontEm: 8,
  text: 'Play button',
};
