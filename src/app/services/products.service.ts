import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../model/product.model";
import {Observable} from "rxjs";

@Injectable()
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>('https://fakestoreapi.com/products');
  }

  getCategories(): Observable<string[]> {
    return this._httpClient.get<string[]>('https://fakestoreapi.com/products/categories');
  }

  deleteProduct(id: number): Observable<ProductModel> {
    return this._httpClient.delete<ProductModel>(`https://fakestoreapi.com/products/${id}`);
  }
}
