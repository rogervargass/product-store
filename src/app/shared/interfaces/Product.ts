export interface IProduct {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export type ICreateProduct = Omit<IProduct, 'id'>;