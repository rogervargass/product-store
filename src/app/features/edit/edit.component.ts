import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { IProduct } from '../../shared/interfaces/Product';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService);
  snackBarService = inject(MatSnackBar);
  router = inject(Router);
  product: IProduct = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit = (product: IProduct) => {
    const id = this.product.id;

    this.productService.update(id, product).subscribe({
      next: this.productUpdateSuccess,
      error: this.productUpdateError,
    });
  };

  private productUpdateSuccess = () => {
    this.snackBarService.open('Produto editado com sucesso!', 'Fechar');
    this.router.navigateByUrl('/');
  };

  private productUpdateError = () => {
    this.snackBarService.open('Erro ao tentar editar produto!', 'Fechar');
  };
}
