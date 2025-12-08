import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/current-user-context";
import { User } from "../models/user";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
