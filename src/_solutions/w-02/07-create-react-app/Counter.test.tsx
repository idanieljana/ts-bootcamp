import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

afterEach(cleanup);

describe('Counter', () => {
  it('renders Counter', () => {
    const defaultCounter = 1;
    const { getByText, unmount } = render(<Counter defaultCount={defaultCounter}/>);
    const counter = getByText(/Clicks: 1/);
    expect(counter).toBeInTheDocument();
    unmount()
  });
  it('renders Counter after click', () => {
    const defaultCounter = 1;
    const { getByText, unmount } = render(<Counter defaultCount={defaultCounter}/>);
    const initialCounter = getByText(/Clicks: 1/);
    expect(initialCounter).toBeInTheDocument();
    fireEvent.click(initialCounter);
    const counter = getByText(/Clicks: 2/);
    expect(counter).toBeInTheDocument();
    unmount()
  });
});
