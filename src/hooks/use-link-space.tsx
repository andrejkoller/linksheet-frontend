import { useContext } from "react";
import { LinkSpaceContext } from "../contexts/link-space-context";

export const useLinkSpace = () => {
  const context = useContext(LinkSpaceContext);
  if (!context) {
    throw new Error("useLinkSpace must be used within a LinkSpaceProvider");
  }
  return context;
};
