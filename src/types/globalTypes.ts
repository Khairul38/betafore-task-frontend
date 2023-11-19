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

export interface IProduct {
  _id: number;
  title: string;
  image: string;
  price: number;
  totalQuantity: number;
  orderQuantity?: number;
}
