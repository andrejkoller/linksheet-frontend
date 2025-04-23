import { User } from "../models/User";
import axiosInstance from "./axiosInstance";

const API_URL = "https://localhost:7187/api/user";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get(`${API_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get(`${API_URL}/current`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const updateUser = async (userId: number, user: User): Promise<User> => {
  try {
    const response = await axiosInstance.put(`${API_URL}/put/${userId}`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
