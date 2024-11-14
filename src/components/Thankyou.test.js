// src/components/ThankYou.test.js
import { render, screen } from '@testing-library/react';
import ThankYou from './Thankyou';

test('renders thank-you message', () => {
  render(<ThankYou onTimeout={() => {}} />);
  expect(screen.getByText(/Thank you for your feedback!/i)).toBeInTheDocument();
});
