import axios from 'axios';

const baseUrl = '/api/persons';

export const getAllContacts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const saveContact = async (newContact) => {
  const response = await axios.post(baseUrl, newContact);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const updateContact = async (id, update) => {
  const response = await axios.put(`${baseUrl}/${id}`, update);
  return response.data;
};
