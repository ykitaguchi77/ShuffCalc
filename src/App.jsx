import React, { useState, useCallback } from 'react';
import './App.css';

const buttons = [
  'C', '+/-', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];

function App() {
  const [display, setDisplay] = useState('0');
  const [positions, setPositions] = useState(buttons.map((_, i) => i));

  const shufflePositions = useCallback(() => {
    setPositions(prevPositions => {
      const newPositions = [...prevPositions];
      for (let i = newPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
      }
      return newPositions;
    });
  }, []);

  const handleClick = useCallback((value) => {
    setDisplay(prevDisplay => {
      if (value === 'C') return '0';
      if (value === '=' && prevDisplay !== '0') {
        try {
          return eval(prevDisplay.replace('×', '*').replace('÷', '/')).toString();
        } catch {
          return 'Error';
        }
      }
      if (value === '+/-') {
        return prevDisplay.charAt(0) === '-' ? prevDisplay.slice(1) : '-' + prevDisplay;
      }
      if (value === '%') {
        return (parseFloat(prevDisplay) / 100).toString();
      }
      return prevDisplay === '0' ? value : prevDisplay + value;
    });
    shufflePositions();
  }, [shufflePositions]);

  return (
    <div className="app-container">
      <h1 className="app-title">ShufflCalc: The Dancing Digits Calculator</h1>
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          {buttons.map((btn, index) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              style={{ order: positions[index] }}
              className={`btn ${['÷', '×', '-', '+', '='].includes(btn) ? 'operator' : ''} ${btn === '0' ? 'zero' : ''}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;