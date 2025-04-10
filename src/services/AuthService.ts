import { User, UserResponse } from "../models/User";

const API_URL = "https://localhost:7187/api/auth";

export const register = async (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): Promise<User> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password, confirmPassword }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to register");
  }
  return data;
};

export const login = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to login");
  }
  return data;
};
