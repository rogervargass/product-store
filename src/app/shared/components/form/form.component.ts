import { Component, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IProduct } from '../../interfaces/Product';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  product = input<IProduct | null>(null);
  save = output<IProduct>();
  form!: FormGroup;

  ngOnInit() {
    this.formBuilder();
  }

  formBuilder = () => {
    this.form = new FormGroup({
      name: new FormControl<string>(this.product()?.name ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      price: new FormControl<string>(this.product()?.price ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  };

  onSubmit = () => {
    const product = this.form.value as IProduct;
    this.save.emit(product);
  };
}
