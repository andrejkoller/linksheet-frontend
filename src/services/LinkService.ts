import axios from "axios";
import { Link } from "../models/Link";

const API_URL = "https://localhost:7187/api/link";

export const getLinks = async (): Promise<Link[]> => {
  try {
    const response = await axios.get(API_URL, {
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
