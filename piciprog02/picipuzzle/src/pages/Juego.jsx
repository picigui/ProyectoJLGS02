import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import 'react-image-crop/dist/ReactCrop.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/juego.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import imagenVacia from '../assets/0.jpg';
import { ContadorReloj } from '../utils/ContadorReloj';
import { getRecords, saveNewRecord } from '../utils/AlmacenDeDatos';

// ************ Styles components *********************
// ****************************************************

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
    initReloj: null,
    timer: 0,
    count: 0,
    iniciado: false,
    jugando: false,
    terminado: false,
    apaisada: false,
    piezas: [],
    piezasOrdenCorrecto: [],
    imgOrderResultadoCorrecto: [],
    nivelSeleccionado: 'n1',
    ancho: 300,
    alto: 400,
    columnas: 3,
    filas: 4,
    imagen300x400: '../assets/imagen06.jpg',
    piezaFuera: { src: imagenVacia },
    piezaVacia: imagenVacia,
    ultimaPieza: imagenVacia,
    ...initial,
  };
}

// ************ Reducer para las actualizaciones de estado ***********
// *******************************************************************

function juegoReducer(state, action) {
  //debugger;
  switch (action.type) {
    case 'crearPiezas':
      return {
        ...state,
        piezas: action.payload.arrayPiezas,
        piezasOrdenCorrecto: JSON.parse(
          JSON.stringify(action.payload.arrayPiezas),
        ),
        piezaFuera: action.payload.piezaFuera,
        piezaVacia: action.payload.piezaVacia.src,
        ultimaPieza: action.payload.ultimaPieza.src,
      };
    case 'iniciado':
      return { ...state, iniciado: true, jugando: false };
    case 'jugando':
      return { ...state, jugando: true };
    case 'piezas':
      return { ...state, piezas: action.payload };
    case 'piezaFuera':
      return { ...state, piezaFuera: action.payload };
    case 'record':
      return {
        ...state,
        recordAnteriorNombre: action.payload.player,
        recordAnteriorSegundos: action.payload.seconds,
      };
    case 'cambioPiezaVacia':
      return { ...state, piezaVacia: state.piezas[action.payload] };
    case 'nuevoGanador':
      return { ...state, nuevoGanador: action.payload };
    case 'nuevoTiempo':
      return {
        ...state,
        seconds: action.payload,
        recordSuperado: state.recordAnteriorSegundos > action.payload,
      };
    case 'ganaste':
      return {
        ...state,
        piezaFuera: action.payload.piezaFuera,
        piezas: action.payload.piezas,
        terminado: true,
        jugando: false,
      };
    case 'incrementaCount':
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
  let piezaVacia = {};
  //let tiempo = -1;
  //let imgOrderResultadoCorrecto = [];
  //let imgOrder = [4, 2, 8, 5, 1, 10, 6, 7, 0, 3, 9, 11];
  let imgOrderRamdon = [];
  store.jugando = false;
  useEffect(() => {
    if (state.iniciado === false) {
      dispatch({ type: 'iniciado' });
      // state.iniciado = true;
      // store.iniciado = true;
      // store.terminado = false;
      crearPiezasCanvas();
      dispatch({
        type: 'record',
        payload: getRecords(state.nivelSeleccionado),
      });
    }
  });

  //debugger;
  function crearPiezasCanvas() {
    let arrayPiezas = [];
    let ultimaPieza = {};
    let piezaCanvas = document.createElement('canvas');
    const imagen300x400 = document.querySelector('.img-foto');
    let piezaFuera = {};
    let i = 0;
    for (let r = 0; r < state.filas; r++) {
      for (let c = 0; c < state.columnas; c++) {
        // ************ Creando las piezas canvas *********************
        // ************************************************************
        piezaCanvas.width = state.ancho / state.columnas;
        debugger;
        piezaCanvas.height = state.alto / state.filas;
        let posW = 0 - piezaCanvas.width * c;
        let posH = 0 - piezaCanvas.height * r;

        let ctx = piezaCanvas.getContext('2d');
        ctx.drawImage(imagen300x400, posW, posH, state.ancho, state.alto);

        // ************ Creando las piezas imagenes *********************
        // ************************************************************
        const dataURL = piezaCanvas.toDataURL();
        arrayPiezas.push({
          id: `${r.toString()}-${c.toString()}`,
          src: dataURL,
          idTablero: `${r.toString()}-${c.toString()}`,
          nImg: i + 1,
          nOrdImg: i,
        });

        // ******** se inicia la variable con la colocacion correcta ******
        // ****************************************************************
        state.imgOrderResultadoCorrecto[i] = i + 1;
        imgOrderRamdon[i] = i + 1;

        // ******** Recogemos la ultima pieza y la pieza de afuera ******
        // ****************************************************************
        if (r === state.filas - 1 && c === state.columnas - 1) {
          ultimaPieza = { ...arrayPiezas[i] };
          let piezaVacia = document.querySelector('.img-pieza-fuera');
          ctx.drawImage(piezaVacia, 0, 0, state.ancho, state.alto);
          const dataURL = piezaCanvas.toDataURL();
          // piezaFuera = document.querySelector('.img-pieza-fuera');
          piezaFuera.src = dataURL;
          piezaFuera.id = 'vacia';
          piezaFuera.nImg = i + 1;
          piezaFuera.nOrdImg = i;
          piezaVacia = { ...piezaFuera };
        }
        i++;
      }
    }

    //*********************  Acualizamos el estado ***********************
    // ****************************************************************
    dispatch({
      type: 'crearPiezas',
      payload: {
        arrayPiezas,
        piezaFuera,
        piezaVacia,
        ultimaPieza,
      },
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
    // Tomo nota de las coodenadas de la pieza pinchada.
    let actualPieza = pieza;
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
      state.piezas = [...nuevasPiezas];
      const idsEnOrden = state.piezasOrdenCorrecto.map((p) => p.id);
      nuevasPiezas.forEach((p, index) => (p.idTablero = idsEnOrden[index]));
      dispatch({ type: 'cambioPiezaVacia', payload: indexPiezaActual });
      siCompleto();
    }
  }

  function siCompleto() {
    let estaOrdenado = true;
    for (let i = 0; i < state.piezas.length - 1; i++) {
      if (state.piezas[i].nImg !== i + 1) {
        estaOrdenado = false;
      }
    }
    if (estaOrdenado) {
      debugger;
      const piezas = JSON.parse(JSON.stringify(state.piezas));
      const ultimaPieza =
        state.piezasOrdenCorrecto[state.piezasOrdenCorrecto.length - 1];
      const piezaFuera = piezas.pop();
      piezas.push(ultimaPieza);
      store.terminado = true;
      dispatch({
        type: 'ganaste',
        payload: { piezas, piezaFuera: piezaFuera },
      });
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

  function hacerTrampa() {
    console.log('Las ordeno');
    console.log({ piezas: state.piezas });
    const ordenadas = JSON.parse(JSON.stringify(state.piezas)).sort(compare);
    console.log({ piezas: ordenadas });
    state.piezasOrdenCorrecto.forEach(
      (p, idx) => (ordenadas[idx].idTablero = p.idTablero),
    );
    const ultima = ordenadas.pop();
    const penultima = ordenadas.pop();
    ordenadas.push(ultima);
    ordenadas.push(penultima);
    dispatch({ type: 'piezas', payload: ordenadas });
    dispatch({ type: 'cambioPiezaVacia', payload: ordenadas.length - 2 });
  }

  function compare(a, b) {
    if (a.nImg < b.nImg) {
      return -1;
    }
    if (a.nImg > b.nImg) {
      return 1;
    }
    return 0;
  }

  // esta función se ejecuta cuando se clickea en el boton empezar y realiza
  // un reordenado de las piezas para empezar el juego
  function empezarJuego() {
    const copia = JSON.parse(JSON.stringify(state.piezasOrdenCorrecto));
    const idsEnOrden = copia.map((p) => p.id);
    const ultimaPieza = copia.pop();
    dispatch({
      type: 'piezaFuera',
      payload: { ...ultimaPieza },
    });

    shuffle(copia);
    copia.push(ultimaPieza);
    ultimaPieza.src = imagenVacia;
    //debugger;
    idsEnOrden.forEach((id, index) => (copia[index].idTablero = id));
    store.initReloj = true;
    store.jugando = true;
    dispatch({ type: 'jugando' });

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

  function tiempoFinalizado(date) {
    console.log({ date });
    if (date) {
      dispatch({ type: 'nuevoTiempo', payload: date.getUTCSeconds() });
      //XXX: CAMBIAR ESTO
      // setInterval(() => {
      //   console.log({ state });
      // }, 2000);
    }
  }

  function cambiarNombreRecord(nuevoNombre) {
    dispatch({ type: 'nuevoGanador', payload: nuevoNombre });
  }
  function guardarRecord() {
    saveNewRecord(state.nuevoGanador, state.seconds, state.nivelSeleccionado);
  }

  function Counter() {
    return dispatch({ type: 'incrementaCount' });
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
                {/* <h3 className="h3-tiempo">Tiempo:</h3>
                <span id="tiempo">{state.timer}</span> */}
                <ContadorReloj
                  tiempoFinalizado={tiempoFinalizado}
                  jugando={state.jugando}
                />
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
                  src={state.piezaFuera.src}
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
            id={`${state.terminado === true ? '' : 'ocultar'}`}
          >
            !!! Puzzle Completado ¡¡¡
          </h2>
          <div>
            <p>
              <b>Record anterior de </b>
              {state.recordAnteriorNombre}
            </p>
            <p>
              <b>Tiempo: </b>
              {state.recordAnteriorSegundos} segundos
            </p>
          </div>

          {state.terminado && state.recordSuperado ? (
            <div>
              <input
                onChange={(e) => cambiarNombreRecord(e.target.value)}
                type="text"
                placeholder="Tu nombre"
              />
              <button onClick={guardarRecord}>Guardar puntuación</button>
            </div>
          ) : (
            ''
          )}

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
        <button
          className="btn-empezar"
          id="ocultar"
          type="button"
          onClick={hacerTrampa}
        >
          trampa
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Juego;

//REPARAR-ESTO: CAMBIAR ESTO
//PENDIENTE-HACER:: CAMBIAR ESTO
//REVISAR: CAMBIAR ESTO
//XXX: CAMBIAR ESTO
