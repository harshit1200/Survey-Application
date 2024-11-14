import { useEffect } from 'react';

function ThankYou({ onTimeout }) {
  useEffect(() => {
    const timer = setTimeout(onTimeout, 5000);
    return () => clearTimeout(timer); // Clean up timer
  }, [onTimeout]);

  return (
    <div className="thank-you">
      <h1>Thank you for your feedback!</h1>
      <p>Returning to the welcome screen...</p>
    </div>
  );
}

export default ThankYou;
