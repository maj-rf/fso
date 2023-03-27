import { createSlice } from '@reduxjs/toolkit';
import { createNew, getAll } from '../services/anecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteThis(state, action) {
      const id = action.payload;
      const voted = state.find((a) => a.id === id);
      return state.map((a) =>
        a.id === id
          ? {
              ...voted,
              votes: voted.votes + 1,
            }
          : a
      );
    },
    createThis(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content);
    dispatch(createThis(newAnecdote));
  };
};

export const { voteThis, createThis, setAnecdotes } = anecdoteSlice.actions;
export const anecdoteReducer = anecdoteSlice.reducer;
