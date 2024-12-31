import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { RestaurantCategoryDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantCategorySetupService {
  apiUrl = '/api/setup/restaurant/category';
  private restaurantCategoryArr: RestaurantCategoryDto[] = [];
  categoriesChanged: Subject<RestaurantCategoryDto[]> = new Subject<
    RestaurantCategoryDto[]
  >();
  constructor(private http: HttpClient) {}
  addCategory(
    restaurantCategoryData: RestaurantCategoryDto
  ): Observable<RestaurantCategoryDto> {
    return this.http
      .post<RestaurantCategoryDto>(this.apiUrl, restaurantCategoryData)
      .pipe(
        tap((category) => {
          this.restaurantCategoryArr.push(category);
          this.categoriesChanged.next(this.restaurantCategories);
        })
      );
  }
  getAllCategories(): Observable<RestaurantCategoryDto[]> {
    return this.http.get<RestaurantCategoryDto[]>(this.apiUrl).pipe(
      tap((categoriesArr) => {
        this.restaurantCategories = categoriesArr;
        this.categoriesChanged.next(categoriesArr);
      })
    );
  }
  deleteCategory(code: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${code}`).pipe(
      tap((category) => {
        this.restaurantCategoryArr = this.restaurantCategories.filter(
          (category) => category.code !== code
        );
        this.categoriesChanged.next(this.restaurantCategories);
      })
    );
  }
  putCategory(
    category: RestaurantCategoryDto,
    code: string
  ): Observable<RestaurantCategoryDto> {
    return this.http
      .put<RestaurantCategoryDto>(`${this.apiUrl}/${code}`, category)
      .pipe(
        tap((_category) => {
          const searchCategory = this.restaurantCategoryArr.find(
            (storeCategory) => storeCategory.code === _category.code
          );
          if (searchCategory) {
            searchCategory.icon = _category.icon;
            searchCategory.name = _category.name;
          }
        })
      );
  }
  public get restaurantCategories() {
    return this.restaurantCategoryArr.slice();
  }
  public set restaurantCategories(
    storeRestaurantCategoryArr: RestaurantCategoryDto[]
  ) {
    this.restaurantCategoryArr = [...storeRestaurantCategoryArr];
    this.categoriesChanged.next(this.restaurantCategories);
  }
}
