import React, { useState } from "react";
import { LinksContext } from "../contexts/links-context";
import { Link } from "../models/link";

export const LinksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = useState<Link[]>([]);

  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      {children}
    </LinksContext.Provider>
  );
};
