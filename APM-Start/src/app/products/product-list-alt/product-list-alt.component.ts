import { Component, } from '@angular/core';

import { BehaviorSubject, Subject, catchError, of } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  selectedProduct$ = this.productService.selectedProduct$;

  private errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.productsWithAdd$
    .pipe(catchError(err => {
      this.errorMessageSubject.next(err);
      return of([]);
    }));

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
