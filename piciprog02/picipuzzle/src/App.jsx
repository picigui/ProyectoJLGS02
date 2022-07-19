import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Juego from './pages/Juego';
import ErrorPage from './pages/Error';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/juego" element={<Juego />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
