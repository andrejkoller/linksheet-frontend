import { User, UserResponse } from "../models/User";
import axiosInstance from "./axiosInstance";

const API_URL = "https://localhost:7187/api/auth";

export const register = async (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): Promise<User> => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/register`,
      {
        email,
        username,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
