import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { IProduct } from '../../shared/interfaces/Product';
import { ProductsService } from '../../shared/services/products.service';
import { NoItemsComponent } from './components/no-items/no-items.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    NoItemsComponent,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products = signal<IProduct[]>([]);
  totalItems = 0;

  productService = inject(ProductsService);
  router = inject(Router);
  dialog = inject(MatDialog);
  snackBarService = inject(MatSnackBar);

  ngOnInit() {
    // setTimeout(() => {
    //   this.listAllProducts();
    // }, 2000);
    this.listAllProducts();
  }

  private listAllProducts() {
    return this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.totalItems = products.length;
      },
      error: () =>
        this.snackBarService.open('Erro ao tentar buscar produtos!', 'Fechar'),
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/edit-product', id]);
  }

  onDelete(id: string) {
    this.openDialog()
      .afterClosed()
      .pipe(filter((isConfirmed: boolean) => isConfirmed))
      .subscribe(() => {
        this.productService.delete(id).subscribe({
          next: () => this.productDeleteSuccess(id),
          error: this.productDeleteError,
        });
      });
  }

  private productDeleteSuccess(id: string) {
    this.products.update((products) =>
      products.filter((product) => product.id !== id)
    );
    this.totalItems = this.products().length;
    this.snackBarService.open('Produto deletado com sucesso!', 'Fechar');
  }

  private productDeleteError() {
    this.snackBarService.open('Erro ao tentar deletar produto!', 'Fechar');
  }

  private openDialog() {
    return this.dialog.open(DialogComponent);
  }
}
