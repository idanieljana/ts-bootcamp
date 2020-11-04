import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
