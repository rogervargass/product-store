import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { ProductsService } from "../services/products.service";

export const getProductResolver = (route: ActivatedRouteSnapshot) => {
  const productService = inject(ProductsService);
  const id = route.paramMap.get('id') as string;
  return productService.getById(id);
}