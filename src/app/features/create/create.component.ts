import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { ICreateProduct } from '../../shared/interfaces/Product';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  productService = inject(ProductsService);
  snackBarService = inject(MatSnackBar);
  router = inject(Router);

  onSubmit = (product: ICreateProduct) => {
    this.productService.create(product).subscribe({
      next: this.productCreateSuccess,
      error: this.productCreateError,
    });
  };

  private productCreateSuccess = () => {
    this.snackBarService.open('Produto criado com sucesso!', 'Fechar');
    this.router.navigateByUrl('/');
  };

  private productCreateError = () => {
    this.snackBarService.open('Erro ao tentar criar produto!', 'Fechar');
  };
}
