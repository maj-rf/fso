import { Diary } from './../types/types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

export const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
  return data;
};
