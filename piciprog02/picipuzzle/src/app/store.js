import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Esto es necesario crearlo y declararlo así, si se piensa
    // trabajar con el store como almacen de variables, sin usar
    // los ficheros Slices.
  },
});
