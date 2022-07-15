import React, { useEffect, useState } from 'react';
// import './styles/index.css';
// import verificarGanador from './Iswin';

let player = 'p1';
let totalPlayer1 = 0;
let totalPlayer2 = 0;
let empate = false;

export default function App() {
  const [tablero, setTablero] = useState(Array(9).fill(''));

  const [p1Jugadas, setP1Jugadas] = useState([]);
  const [p2Jugadas, setP2Jugadas] = useState([]);
  const [jugando, setJugando] = useState(true);
  const [ganador, setGanador] = useState('');

  const jugadorPinchaEn = (posicion) => {
    if (tablero[posicion] === '' && jugando) {
      if (player === 'p1') {
        tablero[posicion] = '⭕️';
        p1Jugadas.push(posicion);
        setP1Jugadas([...p1Jugadas]);
        player = 'p2';
      } else {
        tablero[posicion] = '❌';
        p2Jugadas.push(posicion);
        setP2Jugadas([...p2Jugadas]);
        player = 'p1';
      }
      // console.log({ tablero });
      setTablero([...tablero]);
    }
  };

  useEffect(
    function () {
      const esGanador = verificarGanador(p1Jugadas);
      //  debugger;
      if (esGanador) {
        setJugando(false);
        setGanador('Jugador 1');
        totalPlayer1 = totalPlayer1 + 1;
      } else if (p1Jugadas.length === 5) {
        empate = true;
        setJugando(false);
        setGanador('');
      }
    },
    [p1Jugadas],
  );
  useEffect(
    function () {
      const esGanador = verificarGanador(p2Jugadas);
      //  debugger;
      if (esGanador) {
        setJugando(false);
        setGanador('Jugador 2');
        totalPlayer2 = totalPlayer2 + 1;
      } else if (p2Jugadas.length === 5) {
        empate = true;
        setJugando(false);
        setGanador('');
      }
    },
    [p2Jugadas],
  );
  const iniciarOtraPartida = () => {
    if (ganador === 'Jugador 1') {
      player = 'p1';
    } else {
      player = 'p2';
    }
    setTablero(Array(9).fill(''));
    setP1Jugadas([]);
    setP2Jugadas([]);
    setJugando(true);
    setGanador('');
    //tableroDeJuego.classList.addClass('grid-container');
    empate = false;
  };

  const resetearJuego = () => {
    setTablero(Array(9).fill(''));
    setP1Jugadas([]);
    setP2Jugadas([]);
    setJugando(true);
    setGanador('');
    empate = false;
    //tableroDeJuego.classList.addClass('grid-container');
    totalPlayer1 = 0;
    totalPlayer2 = 0;
  };

  return (
    <div className="game">
      <h1>Juega a tu Pici Puzle</h1>
      <h3>Puntuación </h3>
      <h3 className="total1">jugador 1: {totalPlayer1}</h3>
      <h3 className="total2">jugador 2: {totalPlayer2}</h3>
      <div
        className={'grid-container' + (empate || ganador ? ' masOpacity' : '')}
      >
        {tablero.map((d, index) => (
          <button
            onClick={() => jugadorPinchaEn(index)}
            className="grid-btn"
            key={index}
          >
            {tablero[index]}
          </button>
        ))}
      </div>
      <h2 className={jugando ? 'turnoPara' : 'turnoPara ocultar'}>
        Turno para el: {player === 'p1' ? 'Jugador 1 ⭕️' : 'Jugador 2 ❌'}
      </h2>
      {empate && (
        <div>
          <h2 className="h2AnuncioEmpatados">!!! Ha habido un empate ¡¡¡</h2>
          <button onClick={iniciarOtraPartida} className="otraPartida">
            Otra partida
          </button>
          <button onClick={resetearJuego} className="reseteo">
            Resetear
          </button>
        </div>
      )}

      {ganador && (
        <div>
          <h2 className="h2AnuncioGanador">!!! Ganador = {ganador} ¡¡¡</h2>
          <button onClick={iniciarOtraPartida} className="otraPartida">
            Otra partida
          </button>
          <button onClick={resetearJuego} className="reseteo">
            Resetear
          </button>
        </div>
      )}
    </div>
  );
}
