import { Link } from "./Link";
import { LinkSpace } from "./LinkSpace";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  description?: string;
  token: string;
  linkSpace: LinkSpace;
  links: Link[];
}

export interface UserResponse {
  user: User;
  token: string;
}
