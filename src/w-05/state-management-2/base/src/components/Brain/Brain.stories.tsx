import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react/types-6-0';

import { Brain } from './Brain';
import { BrainFlying } from './BrainFlying';

export default {
  title: 'MemoryCards/Brain',
  component: Brain,
} as Meta;

const BrainTemplate: Story = () => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh',
  };
  return (
    <div style={wrapperStyle}>
      <Brain />
    </div>
  );
};

const BrainFlyingTemplate: Story = () => {
  const wrapperStyle = {
    background: 'grey', width: '100%', height: '100vh',
  };
  return (
    <div style={wrapperStyle}>
      <BrainFlying />
    </div>
  );
};

export const BrainDefault = BrainTemplate.bind({});
export const BrainFlyingDefault = BrainFlyingTemplate.bind({});
