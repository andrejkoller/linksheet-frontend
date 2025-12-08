import { createContext } from "react";
import { Link } from "../models/link";

export type LinksContextType = {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
};

export const LinksContext = createContext<LinksContextType | undefined>(
  undefined
);
