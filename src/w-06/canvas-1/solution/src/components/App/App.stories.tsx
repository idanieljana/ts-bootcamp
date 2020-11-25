import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react/types-6-0';

import { App } from './App';

export default {
  title: 'MemoryCards/App',
  component: App,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <App />
);

export const AppDefault = Template.bind({});
AppDefault.args = {};
