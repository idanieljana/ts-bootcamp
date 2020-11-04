import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe("Counter", () => {
  test('should render counter with zero value', () => {
    render(<Counter />);
    const linkElement = screen.getByText(/Clicks: 0/i);
    expect(linkElement).toBeInTheDocument();
  });
});
