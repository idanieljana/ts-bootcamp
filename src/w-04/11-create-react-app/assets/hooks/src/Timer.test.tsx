import React from 'react';
import { render, screen } from '@testing-library/react';
import { Timer } from './Timer';

describe("Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('should render timer', () => {
    render(<Timer />);
    const linkElement = screen.getByText(/Timer: 1/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('should render timer after a period', () => {
    render(<Timer />);
    jest.advanceTimersByTime(2000);
    const linkElement = screen.getByText(/Timer: 3/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('should render timer after a period and with start props', () => {
    render(<Timer start={10} />);
    jest.advanceTimersByTime(2000);
    const linkElement = screen.getByText(/Timer: 12/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('should render timer after a period and with step', () => {
    render(<Timer start={10} step={3} />);
    jest.advanceTimersByTime(3000);
    const linkElement = screen.getByText(/Timer: 19/i);
    expect(linkElement).toBeInTheDocument();
  });
});
