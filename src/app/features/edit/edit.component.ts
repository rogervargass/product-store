import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces/Product';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService);
  snackBarService = inject(MatSnackBar);
  router = inject(Router);
  product: IProduct = inject(ActivatedRoute).snapshot.data['product'];

  form = new FormGroup({
    name: new FormControl(this.product.name, {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl(this.product.price, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit = () => {
    const id = this.product.id;

    const payload = {
      id: this.product.id,
      name: this.form.controls.name.value,
      price: Number(this.form.controls.price.value),
    }

    this.productService.update(id, payload).subscribe({
      next: this.productCreateSuccess,
      error: this.productCreateError,
    });
  };

  private productCreateSuccess = () => {
    this.snackBarService.open('Produto editado com sucesso!', 'Fechar');
    this.router.navigateByUrl('/');
  };

  private productCreateError = () => {
    this.snackBarService.open('Erro ao tentar editar produto!', 'Fechar');
  };
}
