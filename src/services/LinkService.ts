import { Link } from "../models/Link";
import axiosInstance from "./axiosInstance";

const API_URL = "https://localhost:7187/api/link";

export const getLinks = async (): Promise<Link[]> => {
  try {
    const response = await axiosInstance.get(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};

export const deleteLink = async (linkId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/delete/${linkId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    throw error;
  }
};
