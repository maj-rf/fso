import { anecdoteReducer } from './reducers/anecdoteReducer';
import { filterReducer } from './reducers/filterReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});
