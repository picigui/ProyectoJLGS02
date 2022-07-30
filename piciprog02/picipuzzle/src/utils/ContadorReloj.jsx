import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// ************ Styles components *********************
// ****************************************************

//let terminado = false;
const EstiloReloj = styled.div`
  display: flex;
  position: relative;
  border-radius: 3px;
  width: 6rem;
  height: 3em;
  margin-right: 0.5em;
  background-color: black;
  border: 2px solid black;

  .tiempo {
    margin-top: 0.2em;
    font-size: 1.2em;
    text-align: center;
    color: greenyellow;
    /* text-shadow: 3px 1px #d22d65; */
    font-family: monospace;
  }
`;

// Valores iniciales para los reduce de esta pagina
// y valores que debo recibir de la pagina home
// a traves del objeto store.

function init(initial) {
  return {
    // diferenciaTiempo: null,
    jugando: false,
    initReloj: null,
    iniciado: false,
    terminado: false,
    ...initial,
  };
}

// ************ Reducer para las actualizaciones de estado ***********
// *******************************************************************
function relojReducer(state, action) {
  debugger;
  switch (action.type) {
    case 'iniciaReloj':
      return { ...state, initReloj: action.payload };
    case 'incrementaTiempo':
      return { ...state, diferenciaTiempo: action.payload };

    //************** si el dispatch no tiene case *****************
    default:
      throw new Error();
  }
}

// ************ Funcion principal que inicial la pagina ***********
// *******************************************************************

export function ContadorReloj({ jugando }) {
  const [state, dispatch] = useReducer(relojReducer, { jugando }, init);

  const tick = () => {
    state.diferenciaTiempo = new Date(+new Date() - state.initReloj);
    // dispatch({ type: 'incrementaTiempo' });
  };
  useEffect(() => {
    //debugger;
    if (jugando !== false) {
      // dispatch({ type: 'jugando' });
      iniciarReloj();
    }
  }, [jugando]);
  const iniciarReloj = () => {
    dispatch({ type: 'iniciaReloj', payload: +new Date() });
  };

  useEffect(() => {
    if (state.initReloj) {
      //debugger;
      requestAnimationFrame(tick);
      // dispatch({ type: 'iniciaReloj', payload: requestAnimationFrame(tick) });
    }
  }, [state.initReloj]); // [state.initReloj]);

  useEffect(() => {
    if (state.diferenciaTiempo) {
      //debugger;
      requestAnimationFrame(tick);
      // dispatch({
      //   type: 'incrementaTiempo',
      //   payload: requestAnimationFrame(tick),
      // });
      // dispatch({
      //   type: 'incrementaTiempo',
      //   payload: requestAnimationFrame(tick),
      // });
    }
  }, [state.diferenciaTiempo]);

  return (
    // <div className="Reloj" onClick={iniciarReloj}>
    <EstiloReloj>
      <p className="tiempo">Tiempo: {timeFormat(state.diferenciaTiempo)}</p>
    </EstiloReloj>
  );
}

const timeFormat = (date) => {
  if (!date) return '00:00:00';
  let maxMinutos = 1;
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  //  let cm = Math.round(date.getMilliseconds() / 10);
  // if (store.terminado) return `${mm}:${ss}:${cm}`;
  if (maxMinutos <= 59) {
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;
    maxMinutos = mm;
    return `${hh}:${mm}:${ss}`;
  }
};
