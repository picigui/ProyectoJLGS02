import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageURL: imagenes[0].url,
  imagenes,
  apaisada: false,
  nivelSeleccionado: niveles[0],
  niveles,
  sourceImagen: 'imgIncluidas',
};

export const configJuegoSlice = createSlice({
  name: 'configJuego',
  initialState,
  reducers: {
    // ********** eleccion de la fuente de la imagen ***********
    imgIncluidas: (state) => {
      state.sourceImagen = 'imgIncluidas';
    },
    imgAPI: (state) => {
      state.sourceImagen = 'imgAPI';
    },
    imgGaleria: (state) => {
      state.sourceImagen = 'imgGaleria';
    },

    // ********** eleccion de la fuente de la imagen ***********
    incluidasImagen1: (state) => {
      state.sourceImagen = 'incluidasImagen1';
    },
    incluidasImagen2: (state) => {
      state.sourceImagen = 'incluidasImagen2';
    },
    incluidasImagen3: (state) => {
      state.sourceImagen = 'incluidasImagen3';
    },
    incluidasImagen4: (state) => {
      state.sourceImagen = 'incluidasImagen4';
    },
    incluidasImagen5: (state) => {
      state.sourceImagen = 'incluidasImagen5';
    },
    incluidasImagen6: (state) => {
      state.sourceImagen = 'incluidasImagen6';
    },
    incluidasImagen7: (state) => {
      state.sourceImagen = 'incluidasImagen7';
    },
    incluidasImagen8: (state) => {
      state.sourceImagen = 'incluidasImagen8';
    },
    incluidasImagen9: (state) => {
      state.sourceImagen = 'incluidasImagen9';
    },

    // ************ imagenes de la galeria del usuario **********
    imagenGaleria: (state) => {
      state.sourceImagen = 'imagenGaleria';
    },

    // ************** imagenes vertical/apaisado ****************
    apaisada: (state) => {
      document.querySelector('.foto').id = 'apaisada';
      state.sourceImagen = 'apaisada';
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
