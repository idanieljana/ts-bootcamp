import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Timer } from './Timer';

describe("Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('should render timer', () => {
    render(<Timer />);
    const element = screen.getByText(/Timer: 1/i);
    expect(element).toBeInTheDocument();
  });
  test('should render timer after one second', async () => {
    render(<Timer />);
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    const element = screen.getByText(/Timer: 3/i);
    expect(element).toBeInTheDocument();
  });

  test('should render timer after one second with start property', async () => {
    render(<Timer start={10} />);
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    const element = screen.getByText(/Timer: 12/i);
    expect(element).toBeInTheDocument();
  });
  test('should render timer after a period and with step', () => {
    render(<Timer start={10} step={3} />);
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    const linkElement = screen.getByText(/Timer: 19/i);
    expect(linkElement).toBeInTheDocument();
  });
});
