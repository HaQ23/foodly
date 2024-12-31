import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductCategoryDto } from 'src/app/shared/model/api-models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private API_URL = '/api/setup/product/category'
  constructor(private http: HttpClient) { }

  createProductCategory(productCategory: ProductCategoryDto): Observable<ProductCategoryDto> {
    return this.http.post<ProductCategoryDto>(this.API_URL, productCategory);
  }

  getAllProductCategoryByRestaurantId(restaurantId: number): Observable<ProductCategoryDto[]> {
    return this.http.get<ProductCategoryDto[]>(`${this.API_URL}/restaurant/${restaurantId}`);
  }

  updateProductCategory(productCategory: ProductCategoryDto, productCategoryId: number): Observable<ProductCategoryDto> {
    return this.http.put<ProductCategoryDto>(`${this.API_URL}/${productCategoryId}`, productCategory);
  }

  deleteProductCategory(productId: number) {
    return this.http.delete(`${this.API_URL}/${productId}`)
  }
}
