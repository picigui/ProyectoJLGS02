import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import { Provider } from 'react-redux';
//import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';

//import Home from './pages/Home';
import Juego from './pages/Juego';
import ErrorPage from './pages/Error';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Home />} /> */}
        {/*************** Elección del origen de la imagen  ********************/}
        <Route path="/" element={<Juego />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
