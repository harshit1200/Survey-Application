// src/components/Survey.js
import { useState } from 'react';
import questions from '../data/questions';

function Survey({ sessionId, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  // Handle answer input
  const handleAnswerChange = (answer) => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    setResponses({ ...responses, [currentQuestionId]: answer });
    localStorage.setItem(sessionId, JSON.stringify({ ...responses, [currentQuestionId]: answer }));
  };

  // Navigation functions
  const goToNext = () => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  const goToPrev = () => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));

  // Confirm submission at the last question
  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit your answers?")) {
      localStorage.setItem(sessionId, JSON.stringify({ ...responses, status: 'COMPLETED' }));
      onComplete();
    }
  };

  // Current question
  const question = questions[currentQuestionIndex];

  return (
    <div className="survey">
      <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <p>{question.text}</p>

      {question.type === 'rating' ? (
        <input
          type="number"
          min="1"
          max={question.scale}
          value={responses[question.id] || ''}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      ) : (
        <textarea
          value={responses[question.id] || ''}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      )}

      <div className="navigation-buttons">
        <button onClick={goToPrev} disabled={currentQuestionIndex === 0}>Previous</button> &nbsp &nbsp
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={goToNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default Survey;
