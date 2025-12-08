import React, { useState } from "react";
import { LinkSpaceContext } from "../contexts/link-space-context";
import { LinkSpace } from "../models/link-space";

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
