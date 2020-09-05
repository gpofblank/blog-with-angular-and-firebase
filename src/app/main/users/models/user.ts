export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  role: Role;
}

export enum Role {
  admin = 'admin',
  user = 'user',
}
