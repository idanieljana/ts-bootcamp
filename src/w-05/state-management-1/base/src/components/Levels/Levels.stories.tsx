import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';

import { Levels, LevelsProps } from './Levels';
import { Level } from '../../types/game';

export default {
  title: 'MemoryCards/Levels',
  component: Levels,
  argTypes: { startGame: { action: 'clicked' } },
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<LevelsProps & { fontEm: number }> = (args) => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh', fontSize: `${args.fontEm}em`,
  };
  return (
    <div style={wrapperStyle}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Levels {...args} />
    </div>
  );
};

export const LevelsDefault = Template.bind({});
LevelsDefault.args = {
  fontEm: 4,
  levels: [Level.Easy, Level.Medium, Level.Hard],
};
