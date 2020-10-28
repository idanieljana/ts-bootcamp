import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  afterEach(cleanup);

  it('should render Counter', () => {
    const { getByText, unmount } = render(<Counter />);
    const counter = getByText(/Clicks: 0/);
    expect(counter).toBeInTheDocument();
    unmount()
  });
  it('should render Counter with init value', () => {
    const initCounter = 3;
    const { getByText, unmount } = render(<Counter initCounter={initCounter}/>);
    const counter = getByText(/Clicks: 3/);
    expect(counter).toBeInTheDocument();
    unmount()
  });
  it('renders Counter after click', () => {
    const { getByText, unmount } = render(<Counter />);
    const initialCounter = getByText(/Clicks: 0/);
    expect(initialCounter).toBeInTheDocument();
    fireEvent.click(initialCounter);
    const counter = getByText(/Clicks: 1/);
    expect(counter).toBeInTheDocument();
    unmount()
  });
});
