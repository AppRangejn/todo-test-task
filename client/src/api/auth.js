import api from './client';

export const registerUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};
