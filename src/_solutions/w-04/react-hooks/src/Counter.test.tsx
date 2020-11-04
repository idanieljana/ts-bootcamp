import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe("Counter", () => {
  test('should render counter with zero value', () => {
    render(<Counter />);
    const linkElement = screen.getByText(/Clicks: 0/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should render counter with initial value', () => {
    render(<Counter />);
    const linkElement = screen.getByText(/Initial \(2\)/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should render counter with initial value passed', () => {
    render(<Counter initCount={1} />);
    const linkElement = screen.getByText(/Initial \(1\)/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render counter after click', () => {
    const { getByText, unmount } = render(<Counter />);
    const initialCounter = getByText(/Clicks: 0/);
    expect(initialCounter).toBeInTheDocument();
    fireEvent.click(initialCounter);
    const counter = getByText(/Clicks: 1/);
    expect(counter).toBeInTheDocument();
    unmount()
  });
  it('should render counter after click with step 3', () => {
    const { getByText, unmount } = render(<Counter step={3} />);
    const initialCounter = getByText(/Clicks: 0/);
    expect(initialCounter).toBeInTheDocument();
    fireEvent.click(initialCounter);
    const counter = getByText(/Clicks: 3/);
    expect(counter).toBeInTheDocument();
    unmount()
  });
});
