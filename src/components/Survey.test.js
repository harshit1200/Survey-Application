import { render, screen, fireEvent } from '@testing-library/react';
import Survey from './Survey';
import questions from '../data/questions';

test('renders survey question and handles navigation', () => {
  const onComplete = jest.fn();
  render(<Survey sessionId="test-session" onComplete={onComplete} />);

  // Check if the first question renders
  expect(screen.getByText(questions[0].text)).toBeInTheDocument();

  // Simulate answering and navigating to next question
  const input = screen.getByRole('spinbutton'); // For rating input type
  fireEvent.change(input, { target: { value: '4' } });
  fireEvent.click(screen.getByText(/Next/i));
  
  // Check that the second question appears
  expect(screen.getByText(questions[1].text)).toBeInTheDocument();
});

test('shows confirmation dialog on submit', () => {
  window.confirm = jest.fn(() => true); // Mock the confirm dialog
  const onComplete = jest.fn();
  render(<Survey sessionId="test-session" onComplete={onComplete} />);
  
  // Navigate to last question
  questions.forEach((_, i) => {
    if (i < questions.length - 1) fireEvent.click(screen.getByText(/Next/i));
  });
  
  // Submit the survey
  fireEvent.click(screen.getByText(/Submit/i));
  expect(window.confirm).toHaveBeenCalledTimes(1);
  expect(onComplete).toHaveBeenCalledTimes(1);
});
