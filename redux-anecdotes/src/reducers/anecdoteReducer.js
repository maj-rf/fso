import { createSlice } from '@reduxjs/toolkit';

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

export const { voteThis, createThis, setAnecdotes } = anecdoteSlice.actions;
export const anecdoteReducer = anecdoteSlice.reducer;
