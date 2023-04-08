import { Diary, NewDiary } from './../types/types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

export const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
  return data;
};

export const createDiary = async (newDiary: NewDiary) => {
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/diaries`, newDiary);
  return data;
};
