import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject, catchError, combineLatest, filter, map, of } from 'rxjs';

import { ProductCategory } from '../product-categories/product-category';

import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService) { }

  pageTitle = 'Product List';
  errorMessage = '';

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter(p => selectedCategoryId > 0 ? p.categoryId == selectedCategoryId : true)
    ),
    catchError(err => {
      console.error(err);
      return EMPTY;
    })
  )

  categories$ = this.productCategoryService.productCategories$;

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
