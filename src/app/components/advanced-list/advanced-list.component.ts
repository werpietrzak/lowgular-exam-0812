import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {BehaviorSubject, Observable, Subject, combineLatest, map, of, switchMap} from "rxjs";
import {ProductModel} from "../../model/product.model";

@Component({
  selector: 'app-advanced-list',
  styleUrls: ['./advanced-list.component.scss'],
  templateUrl: './advanced-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedListComponent {
  constructor(private _productsService: ProductsService) {}

  private _categorySubject: Subject<string> = new Subject<string>();
  category: Observable<string> = this._categorySubject.asObservable();

  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('asc');
  order: Observable<string> = this._orderSubject.asObservable();

  orders: Observable<string[]> = of(['asc', 'desc']);
  categories: Observable<string[]> = this._productsService.getCategories().pipe(
    map(categories => categories.filter(cat => cat.includes('men')))
  );

  private _refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  refresh: Observable<void> = this._refreshSubject.asObservable();

  products: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAllProducts(),
    this.category,
    this.order,
  ]).pipe(map(([products, category, order]: [ProductModel[], string, string]) => (
    products.sort((a, b) => {
        if (a.price > b.price) return order === 'asc' ? 1 : -1;
        if (a.price < b.price) return order === 'asc' ? -1 : 1;
        return 0;
      }
    ).filter(product => product.category === category)
  )));
  refreshedProducts: Observable<ProductModel[]> = this.refresh.pipe(switchMap(
    () => this.products
  ));

  chooseCategory(category: string) {
    this._categorySubject.next(category);
  }

  setOrder(order: string) {
    this._orderSubject.next(order);
  }

  deleteItem(id: number) {
    this._productsService.deleteProduct(id).subscribe(() => this._refreshSubject.next());
    this.setOrder('');
    this.chooseCategory('');
  }
}
