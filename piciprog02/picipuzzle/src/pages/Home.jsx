import logo from './logo-pici130x177t.png';
import '../styles/index.css';
import React, { useReducer } from 'react';
import iconFacebook from '../assets/icon-facebook.svg';
import iconTwitter from '../assets/icon-twitter.svg';
import iconInstagram from '../assets/icon-instagram.svg';
import iconEmail from '../assets/icon-email.png';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/***************  Carga de imagenes predeterminadas ************/

import img1 from '../assets/imagen01.jpg';
import img2 from '../assets/imagen02.jpg';
import img3 from '../assets/imagen03.jpg';
import img4 from '../assets/imagen04.jpg';
import img5 from '../assets/imagen05.jpg';
import img6 from '../assets/imagen06.jpg';
import img7 from '../assets/imagen07.jpg';
import img8 from '../assets/imagen08.jpg';
import img9 from '../assets/imagen09.jpg';

const imagenes = [
  { url: img1, name: 'Imagen 1', value: 'incluidasImagen1' },
  { url: img2, name: 'Imagen 2', value: 'incluidasImagen2' },
  { url: img3, name: 'Imagen 3', value: 'incluidasImagen3' },
  { url: img4, name: 'Imagen 4', value: 'incluidasImagen4' },
  { url: img5, name: 'Imagen 5', value: 'incluidasImagen5' },
  { url: img6, name: 'Imagen 6', value: 'incluidasImagen6' },
  { url: img7, name: 'Imagen 7', value: 'incluidasImagen7' },
  { url: img8, name: 'Imagen 8', value: 'incluidasImagen8' },
  { url: img9, name: 'Imagen 9', value: 'incluidasImagen9' },
];

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

//import styled from 'styled-components';
//import { Helmet } from 'react-helmet';

//init();
function init() {
  return {
    imageURL: imagenes[0].url,
    imagenes,
    apaisada: false,
    nivelSeleccionado: niveles[0],
    niveles,
    sourceImagen: 'imgIncluidas',
  };
}
console.log({ img1 });
function configJuegoReducer(state, action) {
  debugger;
  switch (action.type) {
    // ********** eleccion de la fuente de la imagen ***********
    case 'imgIncluidas':
      return { ...state, sourceImagen: 'imgIncluidas' };
    case 'imgAPI':
      return { ...state, sourceImagen: 'imgAPI' };
    case 'imgGaleria':
      return { ...state, sourceImagen: 'imgGaleria' };

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
      document.querySelector('.foto').id = 'apaisada';
      return { ...state, apaisada: true };
    case 'apaisadaNo':
      document.querySelector('.foto').id = 'apaisada-no';
      return { ...state, apaisada: false };

    // ************** eleccion del nivel de juego ***************
    case 'n1':
      for (let i = 0; i < niveles.length; i++) {
        niveles[i].seleccionado = false;
      }
      niveles[0].seleccionado = true;
      return { ...state, nivelSeleccionado: niveles[0] };
    case 'n2':
      for (let i = 0; i < niveles.length; i++) {
        niveles[i].seleccionado = false;
      }
      niveles[1].seleccionado = true;
      return { ...state, nivelSeleccionado: niveles[1] };
    case 'n3':
      for (let i = 0; i < niveles.length; i++) {
        niveles[i].seleccionado = false;
      }
      niveles[2].seleccionado = true;
      return { ...state, nivelSeleccionado: niveles[2] };

    // ************** si el dispatch no tiene case *****************
    default:
      throw new Error();
  }
}

function Home({ initialState }) {
  debugger;
  const [state, dispatch] = useReducer(configJuegoReducer, initialState, init);
  const changeSelectedImg = (e) => {
    dispatch({ type: e.target.value });
  };
  const changeSelectedNivel = (e) => {
    dispatch({ type: e.target.value });
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
    Link.to = './Juego.jsx';
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
            onChange={() => dispatch({ type: 'imgAPI' })}
          />
          <label for="imgAPI"> De una API: </label>

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

            {/*************** selección de la imagen en la API *******************/}

            <div
              className={`elegir-source imgAPI ${
                state.sourceImagen === 'imgAPI' ? 'elegido' : ''
              }`}
            >
              <label for="api">Url de la API</label>
              <input type="url" id="api" />
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
          <div className="foto" id="apaisadaNo">
            <img
              className="img-foto"
              src={state.imageURL}
              alt="imagen elegida"
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

        <button onClick={irAlJuego}>Jugar</button>
      </main>
      <footer>
        <div className="grid-container_footer">
          <picture className="logo-footer">
            <img src={logo} alt="Logo Pici" />
          </picture>
          <div className="icons-redes">
            <a
              href="https://es-es.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconFacebook} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconInstagram} alt="Instagram" />
            </a>
          </div>
          <p className="p_icons-contacto">Contacto:</p>
          <div className="div-a-icons">
            <a
              href="mailto:picigui@hotmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconEmail} alt="Icon-mailto:picigui@hotmail.com" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <img src={iconTwitter} alt="Twitter" />
            </a>
          </div>
          <div className="pie-footer">
            <p className="attribution">
              Desde Gran Canaria hecho con <span className="corazon">♥</span>{' '}
              para el mundo.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
//debugger;
export default Home;
