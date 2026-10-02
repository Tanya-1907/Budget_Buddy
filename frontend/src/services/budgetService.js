import api from "./api";

const API_URL = "/budgets";

// Get all budgets
export const getBudgets = async () => {
  const response = await api.get(API_URL);

  return response.data;
};

// Create budget
export const createBudget = async (budget) => {
  const response = await api.post(
    API_URL,
    budget
  );

  return response.data;
};

// Update budget
export const updateBudget = async (id, budget) => {
  const response = await api.put(
    `${API_URL}/${id}`,
    budget
  );

  return response.data;
};

// Delete budget
export const deleteBudget = async (id) => {
  const response = await api.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};

// Get budget progress
export const getBudgetProgress = async () => {
  const response = await api.get(
    `${API_URL}/progress`
  );

  return response.data;
};