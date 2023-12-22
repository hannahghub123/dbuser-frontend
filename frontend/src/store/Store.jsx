import { configureStore } from "@reduxjs/toolkit";
import documentReducer from '../features/documentSlice';

const store = configureStore({
    reducer: {
      documentReducer:documentReducer,
    },
  });

export default store;