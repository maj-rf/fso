import axios from 'axios';
const baseUrl = '/api/login';

export const login = async (creds) => {
  const response = await axios.post(baseUrl, creds);
  return response.data;
};
