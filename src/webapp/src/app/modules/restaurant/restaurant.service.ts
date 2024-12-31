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
export class RestaurantService {
  apiUrl = '/api/setup/restaurant';
  constructor(private http: HttpClient) {}
  getRestaurants(): Observable<RestaurantDto[]> {
    return this.http.get<RestaurantDto[]>(this.apiUrl);
  }
  getRestaurantById(id: number): Observable<RestaurantDto> {
    return this.http.get<RestaurantDto>(`${this.apiUrl}/${id}`);
  }
  getRestaurantCategories(): Observable<RestaurantCategoryDto[]> {
    return this.http.get<RestaurantCategoryDto[]>(`${this.apiUrl}/category`);
  }
  deleteRestaurant(id: number) {
    return this.http.delete<RestaurantDto>(`${this.apiUrl}/${id}`);
  }
}
