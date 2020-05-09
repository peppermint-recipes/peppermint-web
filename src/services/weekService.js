import http from '../plugins/axios';

export const updateWeek = async (week) => {
  const response = await http.put('/week', week);

  return response.data;
};

export const getWeek = async () => {
  const response = await http.get('/week');

  return response.data;
};
