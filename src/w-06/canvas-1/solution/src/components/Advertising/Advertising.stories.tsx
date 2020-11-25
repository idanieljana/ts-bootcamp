import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react/types-6-0';

import { Advertising } from './Advertising';

export default {
  title: 'MemoryCards/Brain',
  component: Advertising,
} as Meta;

const Template: Story = () => {
  const wrapperStyle = {
    background: 'black', width: '100%', height: '100vh',
  };
  return (
    <div style={wrapperStyle}>
      <Advertising />
    </div>
  );
};

export const AdvertisingDefault = Template.bind({});
AdvertisingDefault.args = {};
