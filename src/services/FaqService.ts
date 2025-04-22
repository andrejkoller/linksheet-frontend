import { Faq } from "../models/Faq";
import axiosInstance from "./axiosInstance";

const API_URL = "https://localhost:7187/api/faq";

export const getFAQs = async (): Promise<Faq[]> => {
  try {
    const response = await axiosInstance.get(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};
