import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateProduct, IProduct } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<IProduct[]>('api/products');
  }

  getById(id: string) {
    return this.httpClient.get<IProduct>(`api/products/${id}`);
  }

  create(body: ICreateProduct) {
    return this.httpClient.post('api/products', body);
  }

  update(id: string, body: IProduct) {
    return this.httpClient.put(`api/products/${id}`, body);
  }
}
