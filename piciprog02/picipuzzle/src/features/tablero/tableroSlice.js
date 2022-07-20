import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  countriesToRender: [],
  error: null,
  search: '',
  region: 'All',
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCountriesFromData: (state, action) => {
      state.countries = action.payload;
      state.countriesToRender = action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setCountriesToRender: (state, action) => {
      state.countriesToRender = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.paylaod;
    },
  },
});

export const {
  setCountriesFromData,
  setError,
  setRegion,
  setCountriesToRender,
  setSearch,
} = countriesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCountries = (state) => state.countries;

export default countriesSlice.reducer;
