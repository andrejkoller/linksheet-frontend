import { LinkSpace } from "../models/link-space";
import axiosInstance from "./axios-instance";

const API_URL = "https://localhost:7187/api/linkspace";

export const getLinkSpaces = async (): Promise<LinkSpace[]> => {
  try {
    const response = await axiosInstance.get(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching link spaces:", error);
    throw error;
  }
};

export const getCurrentUserLinkSpace = async (): Promise<LinkSpace> => {
  try {
    const response = await axiosInstance.get(`${API_URL}/currentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching current user link space:", error);
    throw error;
  }
};

export const createLinkSpace = async (
  linkSpace: LinkSpace
): Promise<LinkSpace> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/post`, linkSpace, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating link space:", error);
    throw error;
  }
};

export const updateLinkSpace = async (
  linkSpaceId: number,
  linkSpace: LinkSpace
): Promise<LinkSpace> => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/put/${linkSpaceId}`,
      linkSpace,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating link space:", error);
    throw error;
  }
};
