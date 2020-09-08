export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  role: Roles;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export enum Roles {
  admin = 'admin',
  user = 'user',
}
