export interface IProduct {
  id: string;
  name: string;
  price: number;
}

export type ICreateProduct = Omit<IProduct, 'id'>;