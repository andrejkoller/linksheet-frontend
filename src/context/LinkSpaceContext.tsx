import React, { createContext, useContext, useState } from "react";
import { LinkSpace } from "../models/LinkSpace";

type LinkSpaceContextType = {
  linkSpace: LinkSpace;
  setLinkSpace: React.Dispatch<React.SetStateAction<LinkSpace>>;
};

const LinkSpaceContext = createContext<LinkSpaceContextType | undefined>(
  undefined
);

export const LinkSpaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [linkSpace, setLinkSpace] = useState<LinkSpace>({} as LinkSpace);
  return (
    <LinkSpaceContext.Provider value={{ linkSpace, setLinkSpace }}>
      {children}
    </LinkSpaceContext.Provider>
  );
};

export const useLinkSpace = () => {
  const context = useContext(LinkSpaceContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkSpaceProvider");
  }
  return context;
};
