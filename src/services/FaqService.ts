import axios from "axios";
import { Faq } from "../models/Faq";

const API_URL = "https://localhost:7187/api/faq";

export const getFAQs = async (): Promise<Faq[]> => {
  try {
    const response = await axios.get(API_URL, {
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
