import '../styles/index.css';
import React, { useReducer } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/***************  Carga de imagenes predeterminadas ************/

import piezaFuera from '../assets/0.jpg';
import img1 from '../assets/imagen01.jpg';
import img2 from '../assets/imagen02.jpg';
import img3 from '../assets/imagen03.jpg';
import img4 from '../assets/imagen04.jpg';
import img5 from '../assets/imagen05.jpg';
import img6 from '../assets/imagen06.jpg';
import img7 from '../assets/imagen07.jpg';
import img8 from '../assets/imagen08.jpg';
import img9 from '../assets/imagen09.jpg';

import { useSelector } from 'react-redux';
import { imagenes } from './imagenes';

const niveles = [
  {
    name: 'Nivel 1 (12 piezas)',
    value: 'n1',
    totalPiezas: 12,
    numWPiezas: 3,
    numHPiezas: 4,
    seleccionado: true,
  },
  {
    name: 'Nivel 2 (24 piezas)',
    value: 'n2',
    totalPiezas: 24,
    numWPiezas: 4,
    numHPiezas: 6,
    seleccionado: false,
  },
  {
    name: 'Nivel 3 (48 piezas)',
    value: 'n3',
    totalPiezas: 48,
    numWPiezas: 6,
    numHPiezas: 8,
    seleccionado: false,
  },
];
const EstiloButton = styled.button`
  display: inline-block;
  position: relative;
  align-content: center;
  background-color: yellow;
  text-align: center;
  border-radius: 5px;
  padding: 0.3em;
  margin: 0 auto;
  width: 6rem;
  border: 2px solid;
  .link {
    font-size: 1.5rem;
    text-align: center;
    text-decoration: none;
    color: black;
  }
`;
let columnas = 3;
let filas = 4;
let alto = 400;
let ancho = 300;
let nivelSeleccionado = 'n1';
let apaisada = false;

//init();
function init() {
  return {
    imageURL: imagenes[0].url,
    imagenes,
    apaisada: false,
    nivelSeleccionado: 'n1',
    niveles,
    sourceImagen: 'imgIncluidas',
    imagenesGatitos: [],
  };
}
console.log({ img1 });
function configJuegoReducer(state, action) {
  switch (action.type) {
    // ********** eleccion de la fuente de la imagen ***********
    case 'imgIncluidas':
      return {
        ...state,
        sourceImagen: 'imgIncluidas',
        imageURL: imagenes[0].url,
      };
    case 'imgAPI':
      return {
        ...state,
        sourceImagen: 'imgAPI',
        imagenesGatitos: action.payload,
        imageURL: imagenes[0].url,
      };
    case 'imgGaleria':
      return {
        ...state,
        sourceImagen: 'imgGaleria',
        imageURL: imagenes[0].url,
      };

    // ********** eleccion de la fuente de la imagen ***********
    case 'incluidasImagen1':
      return { ...state, imageURL: imagenes[0].url };
    case 'incluidasImagen2':
      return { ...state, imageURL: imagenes[1].url };
    case 'incluidasImagen3':
      return { ...state, imageURL: imagenes[2].url };
    case 'incluidasImagen4':
      return { ...state, imageURL: imagenes[3].url };
    case 'incluidasImagen5':
      return { ...state, imageURL: imagenes[4].url };
    case 'incluidasImagen6':
      return { ...state, imageURL: imagenes[5].url };
    case 'incluidasImagen7':
      return { ...state, imageURL: imagenes[6].url };
    case 'incluidasImagen8':
      return { ...state, imageURL: imagenes[7].url };
    case 'incluidasImagen9':
      return { ...state, imageURL: imagenes[8].url };

    // ************ imagenes de la galeria del usuario **********
    case 'imagenGaleria':
      return { ...state, imageURL: action.payload };

    // ************** imagenes vertical/apaisado *****************
    case 'apaisada':
      document.querySelector('.foto-elegida').id = 'apaisada';
      ancho = 400;
      alto = 300;

      return { ...state, apaisada: true };
    case 'apaisadaNo':
      document.querySelector('.foto-elegida').id = 'apaisada-no';
      ancho = 300;
      alto = 400;

      return { ...state, apaisada: false };

    // ************** eleccion del nivel de juego ***************
    case 'n1':
      if (state.apaisada) {
        columnas = 4;
        filas = 3;
      } else {
        columnas = 3;
        filas = 4;
      }
      for (let i = 1; i < niveles.length; i++) {
        niveles[i].seleccionado = false;
      }
      niveles[0].seleccionado = true;
      return { ...state, nivelSeleccionado: 'n1' };
    case 'n2':
      if (state.apaisada) {
        columnas = 6;
        filas = 4;
      } else {
        columnas = 4;
        filas = 6;
      }
      for (let i = 0; i < niveles.length; i++) {
        niveles[i].seleccionado = false;
      }
      niveles[1].seleccionado = true;
      return { ...state, nivelSeleccionado: 'n2' };
    case 'n3':
      if (state.apaisada) {
        columnas = 8;
        filas = 6;
      } else {
        columnas = 6;
        filas = 8;
      }
      for (let i = 0; i < niveles.length; i++) {
        niveles[i].seleccionado = false;
      }
      niveles[2].seleccionado = true;
      return { ...state, nivelSeleccionado: 'n3' };

    // ************** si el dispatch no tiene case *****************
    default:
      throw new Error();
  }
}

// later

function Home({ initialState }) {
  const [state, dispatch] = useReducer(configJuegoReducer, initialState, init);
  // vamos a crear una variable objeto para almacenar todos los datos
  // que nos interesan pasar a otra pagina
  const store = useSelector((store) => store);

  function callAPIGatitos() {
    fetch(
      'https://api.thecatapi.com/v1/images/search?limit=3&page=1&mime_types=jpg,png',
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: 'imgAPI', payload: res });
      });
  }

  const changeSelectedImg = (e) => {
    dispatch({ type: e.target.value });
  };
  const changeSelectedNivel = (e) => {
    dispatch({ type: e.target.value });
    store.nivelSeleccionado = e.target.value;
    console.log(e.target.value);
    console.log(e.target.select);
  };

  function mostrarImagenElegida(event) {
    let file = event.target.files[0];
    //  console.log(event.target.files[0]);
    let reader = new FileReader('');
    reader.onload = function (event) {
      dispatch({ type: 'imagenGaleria', payload: event.target.result });
      //  console.log(event.target.result);
    };
    reader.readAsDataURL(file);
  }
  function irAlJuego() {
    store.nivelSeleccionado = state.nivelSeleccionado;
    store.apaisada = state.apaisada;
    store.ancho = ancho;
    store.alto = alto;
    store.columnas = columnas;
    store.filas = filas;
    store.imagen300x400 = state.imageURL;
    store.piezaFuera = '../assets/0.jpg';
    store.piezaVacia = '../assets/0.jpg';
    console.log(store);
    return;
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
        <title>Pici - Puzzle {'Home'} 😀</title>
      </Helmet>
      <Header />
      <main>
        <h2>Configura tu imagen del Pici-Puzzle</h2>
        <br></br>
        <div className="elegir-fuente-imagen">
          {/*************** Elección del origen de la imagen  ********************/}

          <input
            type="radio"
            name="tipo-de-fuente-img"
            id="imgIncluidas"
            select="true"
            defaultChecked
            onChange={() => dispatch({ type: 'imgIncluidas' })}
          />
          <label for="imgIncluidas"> Imagenes incluidas </label>

          <input
            type="radio"
            name="tipo-de-fuente-img"
            id="imgAPI"
            onChange={() => callAPIGatitos()}
          />
          <label for="imgAPI"> API de gatitos: </label>

          <input
            type="radio"
            name="tipo-de-fuente-img"
            id="imgGaleria"
            onChange={() => dispatch({ type: 'imgGaleria' })}
          />
          <label for="imgGaleria"> De tus Galeria </label>

          <div className="cuadro-carga-imagen">
            {/********** selección de la imagen incluidas en la APP *************/}
            <div
              className={`elegir-source imgIncluidas ${
                state.sourceImagen === 'imgIncluidas' ? 'elegido' : ''
              }`}
            >
              <label for="img-incluida">
                Elige la imagen con la que quieres jugar:{' '}
              </label>
              <select
                name="img-incluida"
                id="img-incluida"
                onChange={(e) => changeSelectedImg(e)}
              >
                {state.imagenes.map((img) => (
                  <option
                    selected={state.imageURL === img.url}
                    name="img-incluida"
                    value={img.value}
                    key={img.url}
                  >
                    {img.name}
                  </option>
                ))}
              </select>
            </div>

            {/*************** selección de la imagen en la Galeria *******************/}

            <div
              className={`elegir-source imgGaleria ${
                state.sourceImagen === 'imgGaleria' ? 'elegido' : ''
              }`}
            >
              <input
                id="inputFile1"
                onChange={mostrarImagenElegida}
                type="file"
                accept=".jpg,.png,.bmp"
              />
            </div>
          </div>
          {/*************** Elección del nivel de juego ***************************/}
          <div className="elige-nivel">
            <form>
              <label for="nivel">Elige el nivel al que quieres jugar: </label>
              <select
                name="nivel"
                id="nivel"
                onChange={(e) => changeSelectedNivel(e)}
              >
                {state.niveles.map((nivel) => (
                  <option
                    selected={nivel.seleccionado}
                    name="nivel"
                    value={nivel.value}
                    key={nivel.totalPiezas}
                  >
                    {nivel.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <EstiloButton>
            <Link className="link" onClick={irAlJuego} to="/juego">
              Jugar
            </Link>
          </EstiloButton>

          {/*************** selección formato de la imagen *******************/}

          <div className="div-vertical-apaisada">
            <div className="div-vertical">
              <label for="vertical-apaisada"> Vertical </label>
              <input
                type="radio"
                name="vertical-apaisada"
                defaultChecked
                onChange={() =>
                  dispatch({ type: 'apaisadaNo', payload: false })
                }
              />
            </div>
            <div className="div-apaisada">
              <label for="vertical-apaisada"> Apaisada </label>
              <input
                type="radio"
                name="vertical-apaisada"
                onChange={() => dispatch({ type: 'apaisada', payload: true })}
              />
            </div>
          </div>
        </div>
        {/*************** presentacion de la imagen elegida ***************************/}
        <div className="marco-foto">
          <div className="foto-elegida" id="apaisadaNo">
            <img
              className="img-foto"
              src={state.imageURL}
              alt="imagen elegida"
            />
          </div>
        </div>
        {/*************** selección de la imagen en la API *******************/}
        <div
          className={`elegir-source imgAPI ${
            state.sourceImagen === 'imgAPI' ? 'elegido' : ''
          }`}
        >
          <div className="api-buttons-y-notas">
            <div className="notas">
              <p>
                Con el botón<span> Recargar </span>e irás repasando las imágenes
                de la API de 3 en 3, cuando encuentres una que te gusta elígela
                y luego en la presentación de la imagen has click para desplegar
                el menu y guarda la imagen en una carpeta, luego la eliges desde
                tu galería y a !!! jugar ¡¡¡.
              </p>
            </div>
            <button className="btn-recargar-API" onClick={callAPIGatitos}>
              Recargar
            </button>
            <button className="btn-recargar-API" onClick={callAPIGatitos}>
              Recargar
            </button>
          </div>
          <div className="grid-imgAPI">
            {state.imagenesGatitos.map((img) => (
              <img
                onClick={() =>
                  dispatch({
                    type: 'imagenGaleria',
                    payload: img.url,
                  })
                }
                src={img.url}
                alt=""
                key={img.id}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
//debugger;
export default Home;
