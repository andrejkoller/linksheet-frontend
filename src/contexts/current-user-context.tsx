import { createContext } from "react";
import { User } from "../models/user";

export type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
};

export const CurrentUserContext = createContext<UserContextType | undefined>(
  undefined
);
