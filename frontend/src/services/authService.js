import axios from "axios";

const API_URL = "https://budget-buddy-duxr.onrender.com/api/auth";

export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/login`,
    {
      email,
      password,
    }
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  return response.data;
};

export const registerUser = async (
  name,
  email,
  password
) => {
  const response = await axios.post(
    `${API_URL}/register`,
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => {
  return localStorage.getItem("token");
};