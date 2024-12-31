import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = '/api/setup/product';
  constructor(private readonly http: HttpClient) {}

  getAllProductsByRestaurantId(restaurantId: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(
      `${this.API_URL}/restaurant/${restaurantId}`
    );
  }

  createProduct(productDto: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.API_URL, productDto);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.API_URL}/${productId}`);
  }

  updateProduct(
    productDto: ProductDto,
    productId: number
  ): Observable<ProductDto> {
    return this.http.put<ProductDto>(
      `${this.API_URL}/${productId}`,
      productDto
    );
  }
}
