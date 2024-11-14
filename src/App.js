import { useState } from 'react';
import Welcome from './components/Welcome';
import Survey from './components/Survey';
import ThankYou from './components/Thankyou';

function App() {
  const [step, setStep] = useState('welcome'); // Tracks the current step
  const [sessionId, setSessionId] = useState(null); // Unique ID for each survey session

  // Start survey and generate a unique session ID
  const startSurvey = () => {
    setSessionId(Date.now()); // Simple unique ID generation
    setStep('survey');
  };

  // Complete survey and show thank-you page
  const completeSurvey = () => setStep('thankYou');

  return (
    <>
      {step === 'welcome' && <Welcome onStart={startSurvey} />}
      {step === 'survey' && <Survey sessionId={sessionId} onComplete={completeSurvey} />}
      {step === 'thankYou' && <ThankYou onTimeout={() => setStep('welcome')} />}
    </>
  );
}

export default App;
