import './welcome.css';

function Welcome({ onStart }) {
    return (
      <div className="welcome">
        <h1>Welcome to Our Survey!</h1>
        <button onClick={onStart}>Start Survey</button>
      </div>
    );
  }
  
  export default Welcome;
  