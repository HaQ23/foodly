import { Component, OnInit } from '@angular/core';
import {
  RestaurantCategoryDto,
  RestaurantDto,
} from 'src/app/shared/model/api-models';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  restaurantsArr: RestaurantDto[];
  restaurantCategoriesArr: RestaurantCategoryDto[];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService
      .getRestaurants()
      .subscribe((respone: RestaurantDto[]) => {
        this.restaurantsArr = respone;
      });
    this.restaurantService
      .getRestaurantCategories()
      .subscribe((respone: RestaurantCategoryDto[]) => {
        this.restaurantCategoriesArr = respone;
      });
  }
}
