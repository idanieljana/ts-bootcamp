import * as React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  afterEach(cleanup);

  it('should match snapshot', () => {
    const { asFragment, getByText } = render(<App />);
    expect(getByText('@Memorix')).toBeDefined();
    expect(getByText('©2020')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
