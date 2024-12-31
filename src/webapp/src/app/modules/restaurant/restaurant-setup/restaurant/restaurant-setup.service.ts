import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RestaurantCategoryDto,
  RestaurantDto,
} from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantSetupService {
  apiUrl = '/api/setup/restaurant';
  constructor(private http: HttpClient) {}
  registerRestaurant(restaurantData: RestaurantDto): Observable<RestaurantDto> {
    return this.http.post<RestaurantDto>(this.apiUrl, restaurantData);
  }
  getRestaurantCategories(): Observable<RestaurantCategoryDto[]> {
    return this.http.get<RestaurantCategoryDto[]>(`${this.apiUrl}/category`);
  }
  updateRestaurant(
    restaurantDto: RestaurantDto,
    restaurantId: number
  ): Observable<RestaurantDto> {
    return this.http.put<RestaurantDto>(
      `${this.apiUrl}/${restaurantId}`,
      restaurantDto
    );
  }
}
