import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';
export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const createAnecdote = async (obj) => {
  const res = await axios.post(baseUrl, obj);
  return res.data;
};

export const updateAnecdote = async (update) => {
  const res = await axios.put(`${baseUrl}/${update.id}`, update);
  return res.data;
};
