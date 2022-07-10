export interface UserResponse extends UserModel {
  token: string;
}

interface UserModel {
  email: string;
  userName: string;
}

export interface User extends UserModel {
  roles?: string[];
}

