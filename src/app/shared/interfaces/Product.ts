export interface IProduct {
  id: string;
  name: string;
  price: string;
}

export type ICreateProduct = Omit<IProduct, 'id'>;