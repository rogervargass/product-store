import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getProductResolver } from './shared/resolvers/get-product.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./features/create/create.component').then(
        (m) => m.CreateComponent
      ),
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: getProductResolver
    },
    loadComponent: () =>
      import('./features/edit/edit.component').then(
        (m) => m.EditComponent
      ),
  },
];
