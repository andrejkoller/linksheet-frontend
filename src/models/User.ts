export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  token: string;
}

export interface UserResponse {
  user: User;
  token: string;
}
