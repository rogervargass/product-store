import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { IProduct } from '../../shared/interfaces/Product';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products: IProduct[] = [];

  productService = inject(ProductsService);
  router = inject(Router);
  dialog = inject(MatDialog);
  snackBarService = inject(MatSnackBar);

  ngOnInit() {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/edit-product', id]);
  }

  onDelete(id: string) {
    this.dialog
      .open(DialogComponent)
      .afterClosed()
      .pipe(filter((isConfirmed: boolean) => isConfirmed))
      .subscribe(() => {
        this.confirmDelete(id);
      });
  }

  private confirmDelete(id: string) {
    this.productService.delete(id).subscribe({
      next: () => this.productDeleteSuccess(id),
      error: this.productDeleteError
    });
  }

  private productDeleteSuccess(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
    this.snackBarService.open('Produto deletado com sucesso!', 'Fechar');
  }

  private productDeleteError() {
    this.snackBarService.open('Erro ao tentar deletar produto!', 'Fechar');
  }
}
