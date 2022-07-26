import React, { useReducer } from 'react';
import styled from 'styled-components';
import 'react-image-crop/dist/ReactCrop.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/juego.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import imagenVacia from '../assets/0.jpg';

// ************ Styles components *********************
// ****************************************************
let terminado = false;
const EstiloButton = styled.button`
  display: flex;
  border-radius: 3px;
  width: 6rem;
  background-color: yellow;

  border: 2px solid black;
  .link {
    font-size: 1.5rem;
    margin: 0;
    text-align: center;
    text-decoration: none;
    background-color: yellow;

    color: black;
  }
`;

// ****************************************************

// Valores iniciales para los reduce de esta pagina
// y valores que debo recibir de la pagina home
// a traves del objeto store.

function init(initial) {
  return {
    timer: 0,
    count: 0,
    iniciado: false,
    terminado: false,
    apaisada: false,
    piezas: [],
    piezasOrdenCorrecto: [],
    nivelSeleccionado: 'n1',
    ancho: 300,
    alto: 400,
    columnas: 3,
    filas: 4,
    imagen300x400: '../assets/imagen06.jpg',
    piezaFuera: imagenVacia,
    piezaVacia: imagenVacia,
    ultimaPieza: imagenVacia,
    ...initial,
  };
}

// ************ Reducer para las actualizaciones de estado ***********
// *******************************************************************

function juegoReducer(state, action) {
  switch (action.type) {
    case 'crearPiezas':
      return {
        ...state,
        piezas: action.payload.arrayPiezas,
        piezasOrdenCorrecto: JSON.parse(
          JSON.stringify(action.payload.arrayPiezas),
        ),
        piezaFuera: action.payload.piezaFuera.src,
        piezaVacia: action.payload.piezaVacia,
      };
    case 'iniciado':
      return { ...state, iniciado: true };
    case 'piezas':
      return { ...state, piezas: action.payload };
    case 'piezaFuera':
      return { ...state, piezaFuera: action.payload.src };
    case 'cambioPiezaVacia':
      return { ...state, piezaVacia: state.piezas[action.payload] };
    case 'empezarJuego':
      return {
        piezaFuera: action.payload[action.payload.length - 1].src,
      };
    case 'ganaste':
      // return {
      //   ...state,
      //   ultimaPieza:
      //     action.payload.piezasOrdenCorrecto[action.payload.piezasOrdenCorrecto.length - 1],
      //   piezaFuera: action.payload.piezas[action.payload.piezas.length - 1],
      //   piezas[action.payload.piezas.length - 1]: ultimaPieza,
      // };
      return {
        ...state,
        ultimaPieza: action.payload.ultimaPieza,
        piezaFuera: action.payload.piezaFuera,
        piezas: action.payload.piezas,
      };
    case 'gano':
      // let terminado;
      // terminado = state.terminado;
      // if (terminado) {
      //   terminado = false;
      // }
      return {
        ...state,
        terminado: true,
      };
    case 'increment':
      const count = state.count + 1;
      return { ...state, count };
    case 'incrementaTimer':
      const timer = state.timer + 1;
      return { ...state, timer };
    case 'resetTimer':
      return { ...state, timer: 0 };

    //************** si el dispatch no tiene case *****************
    default:
      throw new Error();
  }
}

// ************ Funcion principal que inicial la pagina ***********
// *******************************************************************

function Juego(initialStateJuego) {
  // vamos a crear una variable objeto para almacenar todos los datos
  // que nos interesan recoger de otra pagina de store que es importado

  const store = useSelector((store) => store);
  const [state, dispatch] = useReducer(juegoReducer, store, init);
  let piezaVacia;
  let tiempo = -1;
  let imgOrderResultadoCorrecto = [];
  //let imgOrder = [4, 2, 8, 5, 1, 10, 6, 7, 0, 3, 9, 11];
  let imgOrderRamdon = [];

  useEffect(() => {
    if (state.iniciado === false) {
      dispatch({ type: 'iniciado' });
      state.iniciado = true;
      // setTimeout(() => {
      //   crearPiezasCanvas();
      // }, 200);
      crearPiezasCanvas();
    }
  });

  //debugger;
  function crearPiezasCanvas() {
    let arrayPiezas = [];
    let piezaCanvas = document.createElement('canvas');
    const imagen300x400 = document.querySelector('.img-foto');
    let piezaFuera = {};
    let i = 0;
    for (let r = 0; r < state.filas; r++) {
      for (let c = 0; c < state.columnas; c++) {
        // ************ Creando las piezas canvas *********************
        // ************************************************************
        piezaCanvas.width = state.ancho / state.columnas;
        piezaCanvas.height = state.alto / state.filas;
        let posW = r - piezaCanvas.width * c;
        let posH = c - piezaCanvas.height * r;

        let ctx = piezaCanvas.getContext('2d');
        ctx.drawImage(imagen300x400, posW, posH, state.ancho, state.alto);

        // ************ Creando las piezas imagenes *********************
        // ************************************************************
        const dataURL = piezaCanvas.toDataURL();
        arrayPiezas.push({
          id: `${r.toString()}-${c.toString()}`,
          src: dataURL,
          idTablero: `${r.toString()}-${c.toString()}`,
        });

        // ******** se inicia la variable con la colocacion correcta ******
        // ****************************************************************
        imgOrderResultadoCorrecto[i] = i + 1;
        imgOrderRamdon[i] = i + 1;

        // ******** Recogemos la ultima pieza y la pieza de afuera ******
        // ****************************************************************
        if (r === state.filas - 1 && c === state.columnas - 1) {
          //  let ultimaPieza={};
          //  ultimaPieza = { ...arrayPiezas[i] };
          let piezaVacia = document.querySelector('.img-pieza-fuera');
          ctx.drawImage(piezaVacia, posW, posH, state.ancho, state.alto);
          const dataURL = piezaCanvas.toDataURL();
          // piezaFuera = document.querySelector('.img-pieza-fuera');
          piezaFuera.src = dataURL;
          piezaFuera.id = 'vacia';
          // piezaFuera.nImg = i + 1;
          // piezaFuera.nOrdImg = i;
          piezaVacia = { ...piezaFuera };
        }
        i++;
      }
    }

    //*********************  Acualizamos el estado ***********************
    // ****************************************************************
    dispatch({
      type: 'crearPiezas',
      payload: { arrayPiezas, piezaFuera, piezaVacia },
    });
  }

  // ****** Creando los eventos del movimiento de piezas *******
  // mover una imagen mientras esta clikeada.
  function dragOver(e) {
    e.preventDefault();
  }
  // dejar una imagen en otro lugar
  function dragEnter(e) {
    e.preventDefault();
  }
  // arrastrar la imagen a otra imagen
  function dragLeave(e) {
    e.preventDefault();
  }
  // arrastrar la imagen a otra imagen, suelta la imagen
  function dragDrop(e) {
    e.preventDefault();
  }

  // despues de arrastrar y soltar, intercambie los dos piezas
  function dragEnd(pieza) {
    //debugger;
    // Tomo nota de las coodenadas de la pieza pinchada.
    let actualPieza = pieza;
    debugger;
    let actualCoords = actualPieza.idTablero.split('-'); // nos dará "0-0" --> ["0", "0"]
    let r = parseInt(actualCoords[0]);
    let c = parseInt(actualCoords[1]);

    // Tomo nota de las coodenadas de la pieza vacia.

    let vaciaCoords = state.piezaVacia.idTablero.split('-'); // nos dará "0-0" --> ["0", "0"]
    let r2 = parseInt(vaciaCoords[0]);
    let c2 = parseInt(vaciaCoords[1]);

    // Compruebo si la pieza que vamos a mover es adjacente a la pieza blanca
    // para permitir el movimiento.
    let moveLeft = r === r2 && c2 === c - 1;
    let moveRight = r === r2 && c2 === c + 1;

    let moveUp = c === c2 && r2 === r - 1;
    let moveDown = c === c2 && r2 === r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    if (isAdjacent) {
      const copia = state.piezaVacia;
      const indexPiezaVacia = state.piezas.findIndex(
        (p) => p.id === state.piezaVacia.id,
      );
      const indexPiezaActual = state.piezas.findIndex(
        (p) => p.id === actualPieza.id,
      );
      const nuevasPiezas = [...state.piezas];
      nuevasPiezas[indexPiezaActual] = copia;
      nuevasPiezas[indexPiezaVacia] = state.piezas[indexPiezaActual];
      const idsEnOrden = state.piezasOrdenCorrecto.map((p) => p.id);
      nuevasPiezas.forEach((p, index) => (p.idTablero = idsEnOrden[index]));
      dispatch({ type: 'piezas', payload: nuevasPiezas });
      dispatch({ type: 'cambioPiezaVacia', payload: indexPiezaActual });
      siCompleto();
    }
  }
  function siCompleto() {
    let estaOrdenado = false;
    estaOrdenado =
      JSON.stringify(state.piezas.slice(0, state.piezas.length - 1)) ===
      JSON.stringify(
        state.piezasOrdenCorrecto.slice(
          0,
          state.piezasOrdenCorrecto.length - 1,
        ),
      );
    // console.log(JSON.stringify(state.piezas.slice(0, state.piezas.length - 1)));
    // console.log(
    //   JSON.stringify(
    //     state.piezasOrdenCorrecto.slice(
    //       0,
    //       state.piezasOrdenCorrecto.length - 1,
    //     ),
    //   ),
    // );
    if (estaOrdenado) {
      const piezas = JSON.parse(JSON.stringify(state.piezas));
      const ultimaPieza =
        state.piezasOrdenCorrecto[state.piezasOrdenCorrecto.length - 1];
      const piezaFuera = piezas.pop();
      piezas.push(ultimaPieza);

      dispatch({
        type: 'Ganaste',
        payload: { piezas, ultimaPieza, piezaFuera },
      });
      gano();
    }
    Counter();
    console.log(
      'Array piezas - 1',
      state.piezas.slice(0, state.piezas.length - 1),
    );
    console.log(
      'Array piezasOrdenCorrecto - 1',
      state.piezasOrdenCorrecto.slice(0, state.piezasOrdenCorrecto.length - 1),
    );
    console.log('Array piezas', state.piezas);
    console.log('Array piezasOrdenCorrecto', state.piezasOrdenCorrecto);
  }

  // esta función se ejecuta cuando se clickea en el boton empezar y realiza
  // un reordenado de las piezas para empezar el juego
  function empezarJuego() {
    debugger;
    dispatch({ type: 'resetTimer' });
    // Revisar en un futuro se acelera al volver a renderizar el puzzle.
    if (tiempo !== -1) {
      clearInterval(tiempo);
    }
    tiempo = setInterval(() => {
      dispatch({ type: 'incrementaTimer' });
    }, 1000);
    terminado = false;
    const copia = JSON.parse(JSON.stringify(state.piezasOrdenCorrecto));
    const idsEnOrden = copia.map((p) => p.id);
    const ultimaPieza = copia.pop();
    dispatch({
      type: 'piezaFuera',
      payload: JSON.parse(JSON.stringify(ultimaPieza)),
    });

    shuffle(copia);
    copia.push(ultimaPieza);
    ultimaPieza.src = imagenVacia;
    debugger;
    idsEnOrden.forEach((id, index) => (copia[index].idTablero = id));
    dispatch({ type: 'piezas', payload: copia });
    dispatch({ type: 'cambioPiezaVacia', payload: copia.length - 1 });
  }

  // Esta funcion se encarga de reorganizar cualquier array que le envies
  // como props
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // mientras hayan elementos para reordenar.
    while (currentIndex !== 0) {
      // Elija un elemento restante.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // Y cámbielo por el elemento actual.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function Counter() {
    return dispatch({ type: 'increment' });
  }

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          sizes="24x33"
          href="../assets/logo-pici24x33.png"
        />
        <title>Pici - Puzzle - `(Juego)` 🤓</title>
      </Helmet>
      <Header />
      <main>
        <div className="juego">
          {/*************** presentacion del tablero de juego ********************/}
          {/**********************************************************************/}
          <div className="contenedor-tablero">
            <div
              className={`grid-tablero ${
                state.apaisada === true
                  ? 'grid-tablero-apaisado'
                  : 'grid-tablero-apaisado-no'
              } grid-${state.nivelSeleccionado}`}
            >
              {state.piezas.map((img, index) => {
                return (
                  <img
                    onDragOver={(e) => dragOver(e)}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragLeave={(e) => dragLeave(e)}
                    onDrop={(e) => dragDrop(e)}
                    onDragEnd={(e) => dragEnd(img)}
                    src={img.src}
                    id={img.id}
                    key={img.id}
                    alt={img.id}
                  ></img>
                );
              })}
            </div>

            {/***** Grid que contiene el avance del juego y la ultima pieza *******/}
            {/**********************************************************************/}
            <div
              className={`grid-ultima-pieza ${
                state.apaisada === true ? 'grid-apaisado' : 'grid-apaisado-no'
              }`}
            >
              <div className="h3-mov-time">
                <h3 className="h3-movimientos">
                  Pasos: <span id="movimientos">{state.count}</span>
                </h3>
                <h3 className="h3-tiempo">Tiempo:</h3>
                <span id="tiempo">{state.timer}</span>
              </div>
              <div className="Botones">
                <div className="empezar">
                  <button
                    onClick={empezarJuego}
                    className="btn-empezar"
                    type="button"
                  >
                    Empezar
                  </button>
                  <EstiloButton>
                    <Link className="link" to="/">
                      Home
                    </Link>
                  </EstiloButton>
                </div>
              </div>
              <div className="div-img-pieza-fuera">
                <img
                  className="img-pieza-fuera"
                  src={state.piezaFuera}
                  // id={piezaFuera.id}
                  alt="img-pieza-fuera"
                  onDragOver={(e) => dragOver(e)}
                  onDragEnter={(e) => dragEnter(e)}
                  onDragLeave={(e) => dragLeave(e)}
                  onDrop={(e) => dragDrop(e)}
                  onDragEnd={(e) => dragEnd(e)}
                />
              </div>
            </div>
          </div>
          {/*************** Mensaje para presentar al final del juego *************/}
          {/**********************************************************************/}
          <h2
            className="mensaje-gano"
            id={`${terminado === true ? '' : 'ocultar'}`}
          >
            !!! Puzzle Completado ¡¡¡
          </h2>

          {/*************** presentacion de la imagen elegida *******************/}
          {/**********************************************************************/}

          <div className="marco-foto">
            <div
              className={`foto-elegida ${
                state.apaisada === true ? 'foto-apaisada' : 'foto-apaisada-no'
              }`}
            >
              <img
                className="img-foto"
                src={state.imagen300x400}
                alt="imagen elegida"
              ></img>
            </div>
          </div>
        </div>
        <button className="btn-empezar" type="button" onClick={gano}>
          ganó
        </button>
        <button className="btn-empezar" type="button" onClick={perdio}>
          perdió
        </button>
      </main>
      <Footer />
    </>
  );
  function gano() {
    terminado = true;
    return dispatch({ type: 'gano' });
  }
  function perdio() {
    terminado = false;
    return;
  }
}
export default Juego;
