import api from "./api";

const API_URL = "/recurring-expenses";

export const getRecurringExpenses = async () => {
  const response = await api.get(API_URL);

  return response.data;
};

export const createRecurringExpense = async (
  expense
) => {
  const response = await api.post(
    API_URL,
    expense
  );

  return response.data;
};

export const updateRecurringExpense = async (
  id,
  expense
) => {
  const response = await api.put(
    `${API_URL}/${id}`,
    expense
  );

  return response.data;
};

export const deleteRecurringExpense = async (
  id
) => {
  const response = await api.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};