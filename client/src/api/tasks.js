import api from './client';

export const getTasks = async (status) => {
  const params = status ? { status } : {};
  const { data } = await api.get('/tasks', { params });
  return data;
};

export const createTask = async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data;
};

export const updateTask = async ({ id, ...updateData }) => {
  const { data } = await api.patch(`/tasks/${id}`, updateData);
  return data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
};
