// src/components/Welcome.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Welcome from './Welcome';

test('renders welcome message and start button', () => {
  const onStart = jest.fn();
  render(<Welcome onStart={onStart} />);

  expect(screen.getByText(/Welcome to Our Survey!/i)).toBeInTheDocument();
  const button = screen.getByRole('button', { name: /Start Survey/i });
  fireEvent.click(button);
  expect(onStart).toHaveBeenCalledTimes(1);
});
