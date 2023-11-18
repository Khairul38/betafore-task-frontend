export interface IUser {
  _id?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: string;
  iat: number;
  exp: number;
}
