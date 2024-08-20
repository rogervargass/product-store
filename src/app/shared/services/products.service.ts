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

  create(body: ICreateProduct) {
    return this.httpClient.post('api/products', body);
  }
}
