import api from "./api";

const API_URL = "/goals";

export const getGoals = async () => {
  const response = await api.get(API_URL);

  return response.data;
};

export const createGoal = async (goal) => {
  const response = await api.post(
    API_URL,
    goal
  );

  return response.data;
};

export const updateGoal = async (id, goal) => {
  const response = await api.put(
    `${API_URL}/${id}`,
    goal
  );

  return response.data;
};

export const deleteGoal = async (id) => {
  const response = await api.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};