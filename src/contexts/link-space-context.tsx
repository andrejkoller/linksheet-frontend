import { createContext } from "react";
import { LinkSpace } from "../models/link-space";

export type LinkSpaceContextType = {
  linkSpace: LinkSpace;
  setLinkSpace: React.Dispatch<React.SetStateAction<LinkSpace>>;
};

export const LinkSpaceContext = createContext<LinkSpaceContextType | undefined>(
  undefined
);
