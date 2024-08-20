import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  productService = inject(ProductsService);
  snackBarService = inject(MatSnackBar);
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit = () => {
    const payload = {
      name: this.form.controls.name.value,
      price: Number(this.form.controls.price.value),
    }

    this.productService.create(payload).subscribe({
      next: this.productCreateSuccess,
      error: this.productCreateError,
    });
  };

  private productCreateSuccess = () => {
    this.form.reset();

    this.snackBarService.open('Produto criado com sucesso!', 'Fechar', {
      duration: 3000, 
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })

    this.router.navigateByUrl('/');
  };

  private productCreateError = () => {
    this.snackBarService.open('Erro ao tentar criar produto!', 'Fechar', {
      duration: 3000, 
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  };
}
