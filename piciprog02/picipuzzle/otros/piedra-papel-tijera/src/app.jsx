import React, { useState } from 'react';
const choices = ['🪨', '📃', '✂️'];

const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');

  const handleClickToPlay = (event) => {
    const {
      target: { value: playerChoice },
    } = event;

    const compChoice = choices[Math.floor(Math.random() * choices.length)];

    setPlayerChoice(playerChoice);
    setComputerChoice(compChoice);
  };

  // Quien es el ganador
  const theWinnerIs = () => {
    if (playerChoice) {
      if (playerChoice === computerChoice) {
        return '😃 🖥';
      } else if (playerChoice === '🪨' && computerChoice === '📃') {
        return '🖥';
      } else if (playerChoice === '📃' && computerChoice === '✂️') {
        return '🖥';
      } else if (playerChoice === '✂️' && computerChoice === '🪨') {
        return '🖥';
      } else {
        return '😃';
      }
    }
  };

  return (
    <div>
      <h1>React 🪨, 📃, ✂️</h1>
      <p>
        The Winner Is: <span>{theWinnerIs()}</span>
      </p>
      <p>
        Eleccion del jugador: <span>{playerChoice}</span>
      </p>
      <p>
        Eleccion del ordenador: <span>{computerChoice}</span>
      </p>
      {choices.map((choice) => (
        <button key={choice} value={choice} onClick={handleClickToPlay}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default App;
// <a href="#">React 🪨,😃, 🖥, 📃, ✂️</a>;
