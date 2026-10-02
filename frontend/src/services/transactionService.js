import api from "./api";

const API_URL = "/transactions";

export const getTransactions = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const createTransaction = async (
  transaction
) => {
  const response = await api.post(
    API_URL,
    transaction
  );

  return response.data;
};

export const updateTransaction = async (
  id,
  transaction
) => {
  const response = await api.put(
    `${API_URL}/${id}`,
    transaction
  );

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};