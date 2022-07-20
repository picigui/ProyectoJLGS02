import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
//import countriesReducer from '../features/countries/countrySlice';

export const store = configureStore({
  reducer: {
    //    counter: counterReducer,
    //    countries: countriesReducer,
  },
});
