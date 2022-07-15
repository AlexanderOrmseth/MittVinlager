

interface UserModel {
  userName: string;
}

export interface User extends UserModel {
  roles?: string[];
}
